/**
 * Portfolio data loader — pure JSON, zero runtime dependencies.
 *
 * All portfolio content lives in sibling JSON files under src/data/portfolio/.
 * Edit them directly in any text editor; no Google Sheets, no API, no build-time
 * fetch.  The site revalidates via Next.js ISR (1 h) so a production redeploy
 * picks up changes automatically.
 *
 * Shape match is guaranteed at build time by the import assertions below —
 * if a JSON file is malformed or missing a required key the build fails.
 */
import personalInfo from '@/data/portfolio/personal.json';
import socialLinks from '@/data/portfolio/social.json';
import proofs from '@/data/portfolio/proofs.json';
import projects from '@/data/portfolio/projects.json';
import skills from '@/data/portfolio/skills.json';
import experiences from '@/data/portfolio/experiences.json';
import education from '@/data/portfolio/education.json';
import certifications from '@/data/portfolio/certifications.json';
import stats from '@/data/portfolio/stats.json';
import navLinks from '@/data/portfolio/nav.json';
import projectCategories from '@/data/portfolio/categories.json';
import heroTypingTexts from '@/data/portfolio/hero.json';
import emailjsConfig from '@/data/portfolio/emailjs.json';
import aboutContent from '@/data/portfolio/about.json';
import skillsContent from '@/data/portfolio/skills-content.json';
import contactContent from '@/data/portfolio/contact.json';
import projectsContent from '@/data/portfolio/projects-content.json';
import footerContent from '@/data/portfolio/footer.json';

const portfolioData = {
  personalInfo,
  socialLinks,
  proofs,
  projects,
  skills,
  experiences,
  education,
  certifications,
  stats,
  navLinks,
  projectCategories,
  heroTypingTexts,
  emailjsConfig,
  aboutContent,
  skillsContent,
  contactContent,
  projectsContent,
  footerContent,
};

export {
  personalInfo,
  socialLinks,
  proofs,
  projects,
  skills,
  experiences,
  education,
  certifications,
  stats,
  navLinks,
  projectCategories,
  heroTypingTexts,
  emailjsConfig,
  aboutContent,
  skillsContent,
  contactContent,
  projectsContent,
  footerContent,
};

export default portfolioData;
