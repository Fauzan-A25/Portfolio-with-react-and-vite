// src/utils/fetchFromSheets.js

// ⚠️ GANTI dengan URL deployment Apps Script Anda!
const SHEETS_API_URL = import.meta.env.VITE_SHEETS_API_URL;

// ============================================
// CORE FETCH FUNCTION (UPDATED - DEFENSIVE)
// ============================================

/**
 * Fetch data dari satu sheet menggunakan READ API
 * FIXED: Handle various data types safely
 */
async function fetchSheet(sheetName) {
  try {
    const response = await fetch(
      `${SHEETS_API_URL}?action=read&sheet=${sheetName}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      // Remove internal _rowIndex field and return clean data
      return result.data.map(item => {
        const { _rowIndex, ...rest } = item;
        return rest;
      });
    } else {
      console.error(`Error fetching ${sheetName}:`, result.error);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching ${sheetName}:`, error);
    return [];
  }
}

// ============================================
// DATA TRANSFORMATION FUNCTIONS (UPDATED)
// ============================================

/**
 * Parse JSON strings dalam data
 * FIXED: Safely handle already-parsed values
 */
function parseJsonFields(data, fields) {
  if (!Array.isArray(data)) return [];
  
  return data.map(item => {
    const parsed = { ...item };
    fields.forEach(field => {
      const value = parsed[field];
      
      // Skip if already an array or object
      if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
        return;
      }
      
      // Try to parse string values
      if (typeof value === 'string' && value.trim()) {
        try {
          parsed[field] = JSON.parse(value);
        } catch (e) {
          console.warn(`Failed to parse ${field}:`, value);
        }
      }
    });
    return parsed;
  });
}

// Rebuild skills structure (dari flat jadi nested)
function rebuildSkills(skillsData) {
  if (!Array.isArray(skillsData)) return {
    programming: [],
    dataScience: [],
    tools: [],
    soft: []
  };
  
  const skills = {
    programming: [],
    dataScience: [],
    tools: [],
    soft: []
  };
  
  skillsData.forEach(skill => {
    if (!skill || !skill.category) return;
    
    const category = skill.category;
    if (skills[category]) {
      skills[category].push({
        name: skill.name,
        icon: skill.icon,
        color: skill.color,
        yearsOfExperience: skill.yearsOfExperience,
        description: skill.description,
        projects: parseJsonField(skill.projects)
      });
    }
  });
  
  return skills;
}

/**
 * Helper: Parse single JSON field safely
 */
function parseJsonField(value) {
  if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
    return value;
  }
  if (typeof value === 'string' && value.trim()) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
  return value;
}

// Rebuild AboutContent structure
function rebuildAboutContent(aboutContentData) {
  if (!aboutContentData || aboutContentData.length === 0) return null;
  
  const data = aboutContentData[0];
  if (!data) return null;
  
  return parseJsonField(data.data);
}

// Rebuild SkillsContent structure
function rebuildSkillsContent(skillsContentData) {
  if (!skillsContentData || skillsContentData.length === 0) return null;
  
  const data = skillsContentData[0];
  if (!data) return null;
  
  return {
    title: data.title,
    subtitle: data.subtitle,
    categoryTitles: parseJsonField(data.categoryTitles)
  };
}

// Rebuild ContactContent structure
function rebuildContactContent(contactContentData) {
  if (!contactContentData || contactContentData.length === 0) return null;
  
  const data = contactContentData[0];
  if (!data) return null;
  
  return {
    title: data.title,
    subtitle: data.subtitle,
    leftSection: {
      title: data.leftSectionTitle,
      description: data.leftSectionDescription
    },
    form: parseJsonField(data.formData),
    messages: parseJsonField(data.messages)
  };
}

// Rebuild ProjectsContent structure
function rebuildProjectsContent(projectsContentData) {
  if (!projectsContentData || projectsContentData.length === 0) return null;
  
  return projectsContentData[0];
}

// ============================================
// MAIN FETCH FUNCTION (IMPROVED ERROR HANDLING)
// ============================================

/**
 * Fetch semua data dari Google Sheets
 * IMPROVED: Better error handling and validation
 */
export async function fetchAllData() {
  try {
    // Fetch semua sheets secara parallel (17 sheets)
    const [
      personalInfoData,
      socialLinksData,
      projectsData,
      skillsData,
      experiencesData,
      educationData,
      certificationsData,
      statsData,
      navLinksData,
      categoriesData,
      // NEW SECTIONS
      heroTypingTextsData,
      emailJSConfigData,
      aboutContentData,
      skillsContentData,
      contactContentData,
      projectsContentData,
      footerContentData
    ] = await Promise.all([
      fetchSheet('PersonalInfo'),
      fetchSheet('SocialLinks'),
      fetchSheet('Projects'),
      fetchSheet('Skills'),
      fetchSheet('Experiences'),
      fetchSheet('Education'),
      fetchSheet('Certifications'),
      fetchSheet('Stats'),
      fetchSheet('NavLinks'),
      fetchSheet('ProjectCategories'),
      // NEW SECTIONS
      fetchSheet('HeroTypingTexts'),
      fetchSheet('EmailJSConfig'),
      fetchSheet('AboutContent'),
      fetchSheet('SkillsContent'),
      fetchSheet('ContactContent'),
      fetchSheet('ProjectsContent'),
      fetchSheet('FooterContent')
    ]);
    
    // Parse dan rebuild data dengan validasi
    const portfolioData = {
      // Original sections
      personalInfo: personalInfoData[0] || {},
      socialLinks: socialLinksData[0] || {},
      
      // Projects: parse JSON arrays
      projects: parseJsonFields(projectsData, [
        'tags',
        'technologies',
        'features',
        'highlights'
      ]),
      
      // Skills: rebuild nested structure
      skills: rebuildSkills(skillsData),
      
      // Experiences: parse JSON arrays
      experiences: parseJsonFields(experiencesData, [
        'responsibilities',
        'technologies',
        'achievements'
      ]),
      
      // Education: parse JSON arrays
      education: parseJsonFields(educationData, [
        'relevantCourses',
        'achievements'
      ]),
      
      // Simple data (no parsing needed)
      certifications: Array.isArray(certificationsData) ? certificationsData : [],
      stats: Array.isArray(statsData) ? statsData : [],
      navLinks: Array.isArray(navLinksData) ? navLinksData : [],
      
      // Project categories: extract category names safely
      projectCategories: Array.isArray(categoriesData) 
        ? categoriesData.map(c => c.category).filter(Boolean)
        : [],
      
      // NEW SECTIONS
      heroTypingTexts: Array.isArray(heroTypingTextsData)
        ? heroTypingTextsData.map(item => item.text).filter(Boolean)
        : [],
      emailjsConfig: emailJSConfigData[0] || {},
      aboutContent: rebuildAboutContent(aboutContentData),
      skillsContent: rebuildSkillsContent(skillsContentData),
      contactContent: rebuildContactContent(contactContentData),
      projectsContent: rebuildProjectsContent(projectsContentData),
      footerContent: footerContentData[0] || {}
    };
    
    console.log('✅ Data fetched successfully from Google Sheets!');
    console.log('📊 Data preview:', portfolioData);
    
    return portfolioData;
    
  } catch (error) {
    console.error('❌ Error fetching data from Google Sheets:', error);
    throw error; // Re-throw untuk ditangani di usePortfolioData
  }
}

// Export individual fetch function jika diperlukan
export { fetchSheet };
