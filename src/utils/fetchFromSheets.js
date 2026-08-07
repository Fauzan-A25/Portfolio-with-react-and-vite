// src/utils/fetchFromSheets.js

// ⚠️ GANTI dengan URL deployment Apps Script Anda!
const SHEETS_API_URL = process.env.NEXT_PUBLIC_SHEETS_API_URL;

// ============================================
// CORE FETCH FUNCTION (UPDATED - DEFENSIVE)
// ============================================

// Apps Script can stall indefinitely (cold start, quota, a shared doc being
// edited). Without a deadline the visitor sits on the loading screen forever,
// so give up and let the caller fall back to the bundled data.
const REQUEST_TIMEOUT_MS = 8000;

/**
 * Fetch data dari satu sheet menggunakan READ API
 * FIXED: Handle various data types safely
 */
async function fetchSheet(sheetName, init = {}) {
  try {
    const response = await fetch(
      `${SHEETS_API_URL}?action=read&sheet=${sheetName}`,
      { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS), ...init }
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
export async function fetchAllData(init = {}) {
  // Without the endpoint there is nothing to fetch; bail so the caller falls
  // straight back to the bundled data instead of firing 17 doomed requests.
  if (!SHEETS_API_URL) {
    throw new Error('NEXT_PUBLIC_SHEETS_API_URL is not set');
  }

  // `init` carries the server-side cache directive (`next.revalidate`); it is
  // inert in the browser, so both callers share this function unchanged.
  const get = (sheet) => fetchSheet(sheet, init);

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
      get('PersonalInfo'),
      get('SocialLinks'),
      get('Projects'),
      get('Skills'),
      get('Experiences'),
      get('Education'),
      get('Certifications'),
      get('Stats'),
      get('NavLinks'),
      get('ProjectCategories'),
      // NEW SECTIONS
      get('HeroTypingTexts'),
      get('EmailJSConfig'),
      get('AboutContent'),
      get('SkillsContent'),
      get('ContactContent'),
      get('ProjectsContent'),
      get('FooterContent')
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
