// src/utils/fetchFromSheets.js

// ⚠️ GANTI dengan URL deployment Apps Script Anda!
const SHEETS_API_URL = import.meta.env.VITE_SHEETS_API_URL;

// Fallback data — digunakan saat API Sheets tidak tersedia
import {
  personalInfo as fallbackPersonalInfo,
  socialLinks as fallbackSocialLinks,
  projects as fallbackProjects,
  skills as fallbackSkills,
  experiences as fallbackExperiences,
  education as fallbackEducation,
  certifications as fallbackCertifications,
  stats as fallbackStats,
  navLinks as fallbackNavLinks,
  projectCategories as fallbackCategories,
  heroTypingTexts as fallbackHeroTexts,
  emailjsConfig as fallbackEmailJS,
  aboutContent as fallbackAboutContent,
  skillsContent as fallbackSkillsContent,
  contactContent as fallbackContactContent,
  projectsContent as fallbackProjectsContent,
  footerContent as fallbackFooterContent,
} from '../data/portfolioData.js';

// ============================================
// FALLBACK DATA
// ============================================

function getFallbackData() {
  console.log('📦 Using local fallback data (API URL not configured)');
  return {
    personalInfo: fallbackPersonalInfo,
    socialLinks: fallbackSocialLinks,
    projects: fallbackProjects,
    skills: fallbackSkills,
    experiences: fallbackExperiences,
    education: fallbackEducation,
    certifications: fallbackCertifications,
    stats: fallbackStats,
    navLinks: fallbackNavLinks,
    projectCategories: fallbackCategories,
    heroTypingTexts: fallbackHeroTexts,
    emailjsConfig: fallbackEmailJS,
    aboutContent: fallbackAboutContent,
    skillsContent: fallbackSkillsContent,
    contactContent: fallbackContactContent,
    projectsContent: fallbackProjectsContent,
    footerContent: fallbackFooterContent,
  };
}

// ============================================
// CORE FETCH FUNCTION
// ============================================

/**
 * Fetch data dari satu sheet menggunakan READ API
 * with AbortController for timeout
 */
async function fetchSheet(sheetName) {
  try {
    // Add timeout (8 seconds) to prevent hanging on CORS errors
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch(
      `${SHEETS_API_URL}?action=read&sheet=${sheetName}`,
      { signal: controller.signal }
    );
    
    clearTimeout(timeoutId);
    
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
    console.error(`Error fetching ${sheetName}:`, error.name === 'AbortError' ? 'Request timed out' : error);
    return [];
  }
}

// ============================================
// DATA TRANSFORMATION FUNCTIONS
// ============================================

/**
 * Parse JSON strings dalam data
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
// MAIN FETCH FUNCTION
// ============================================

/**
 * Fetch semua data dari Google Sheets
 * FALLBACK: Jika API URL tidak dikonfigurasi, gunakan data lokal
 */
export async function fetchAllData() {
  // Jika API URL tidak dikonfigurasi, langsung pakai fallback
  if (!SHEETS_API_URL || SHEETS_API_URL === 'undefined') {
    return getFallbackData();
  }

  // Coba fetch dengan timeout cepat (2s). Kalo gagal → fallback
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const testResponse = await fetch(
      `${SHEETS_API_URL}?action=read&sheet=PersonalInfo`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);
    
    if (!testResponse.ok) {
      console.warn('⚠️ API not responding, using fallback');
      return getFallbackData();
    }
    
    const testResult = await testResponse.json();
    if (!testResult.success || !testResult.data?.length) {
      console.warn('⚠️ API returned empty data, using fallback');
      return getFallbackData();
    }
    
    console.log('✅ API OK, fetching all data...');
  } catch (error) {
    console.warn('⚠️ API unavailable, using fallback:', error.message);
    return getFallbackData();
  }

  // API works — fetch all 17 sheets
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
      fetchSheet('HeroTypingTexts'),
      fetchSheet('EmailJSConfig'),
      fetchSheet('AboutContent'),
      fetchSheet('SkillsContent'),
      fetchSheet('ContactContent'),
      fetchSheet('ProjectsContent'),
      fetchSheet('FooterContent')
    ]);
    
    // Validasi: jika SEMUA data kosong, fallback ke lokal
    const allEmpty = [
      personalInfoData, projectsData, skillsData, experiencesData
    ].every(d => !d || d.length === 0);
    
    if (allEmpty) {
      console.warn('⚠️ API returned empty data, using fallback');
      return getFallbackData();
    }
    
    // Parse dan rebuild data dengan validasi
    const portfolioData = {
      personalInfo: personalInfoData[0] || {},
      socialLinks: socialLinksData[0] || {},
      
      projects: parseJsonFields(projectsData, [
        'tags', 'technologies', 'features', 'highlights'
      ]),
      
      skills: rebuildSkills(skillsData),
      
      experiences: parseJsonFields(experiencesData, [
        'responsibilities', 'technologies', 'achievements'
      ]),
      
      education: parseJsonFields(educationData, [
        'relevantCourses', 'achievements'
      ]),
      
      certifications: Array.isArray(certificationsData) ? certificationsData : [],
      stats: Array.isArray(statsData) ? statsData : [],
      navLinks: Array.isArray(navLinksData) ? navLinksData : [],
      
      projectCategories: Array.isArray(categoriesData) 
        ? categoriesData.map(c => c.category).filter(Boolean)
        : [],
      
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
    return portfolioData;
    
  } catch (error) {
    console.error('❌ Error fetching from Sheets, using fallback:', error);
    return getFallbackData();
  }
}

export { fetchSheet };
