import { SITE_URL, abs } from '@/lib/site';
import { getDirectImageUrl } from '@/utils/imageHelper';

/**
 * JSON-LD for the portfolio, built from the same merged data the page renders
 * so the graph can never drift from the visible content.
 *
 * Everything hangs off one `Person` node: AI search engines resolve a portfolio
 * to a *person* entity, and the `sameAs` links are what tie this page to the
 * GitHub / LinkedIn profiles they already know about.
 */

const clean = (obj) => {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v == null) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    if (typeof v === 'string' && v.trim() === '') continue;
    out[k] = v;
  }
  return out;
};

/**
 * Flattens the nested skills object and the coursework into one `knowsAbout`
 * list — this is the topic set an AI search engine associates with the person.
 */
function knowsAbout(skills = {}, education = []) {
  const fromSkills = Object.values(skills)
    .flat()
    .map((s) => s?.name);
  const fromCourses = education.flatMap((e) => e?.relevantCourses || []);
  return [...new Set([...fromSkills, ...fromCourses].filter(Boolean))];
}

function credentials(certifications = []) {
  return certifications.filter((c) => c?.name).map((c) =>
    clean({
      '@type': 'EducationalOccupationalCredential',
      name: c.name,
      credentialCategory: 'certificate',
      dateCreated: c.date || null,
      url: c.url || null,
      recognizedBy: c.issuer ? { '@type': 'Organization', name: c.issuer } : null,
    }),
  );
}

function workExperience(experiences = []) {
  return experiences.filter((e) => e?.title).map((e) =>
    clean({
      '@type': 'OrganizationRole',
      roleName: e.title,
      description: e.description || null,
      startDate: e.period || null,
      memberOf: e.company
        ? clean({ '@type': 'Organization', name: e.company, url: e.companyUrl || null })
        : null,
    }),
  );
}

function projectItems(projects = []) {
  return projects
    .filter((p) => p?.title)
    .map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: clean({
        '@type': p.githubUrl ? 'SoftwareSourceCode' : 'CreativeWork',
        name: p.title,
        description: p.description || null,
        // The sheet stores Drive *share* links, which serve an HTML page, not
        // an image. Same conversion the cards use, so schema and page agree.
        image: getDirectImageUrl(p.image) || null,
        url: p.demoUrl || p.githubUrl || null,
        codeRepository: p.githubUrl || null,
        dateCreated: p.year ? String(p.year) : null,
        genre: p.category || null,
        keywords: Array.isArray(p.technologies) ? p.technologies.join(', ') : null,
        author: { '@id': `${SITE_URL}/#person` },
      }),
    }));
}

export function buildPortfolioSchema(data, { dateModified } = {}) {
  const info = data.personalInfo || {};
  const social = data.socialLinks || {};

  const sameAs = [social.github, social.linkedin, social.instagram].filter(Boolean);

  // The About paragraphs are the richest self-contained summary on the page —
  // reuse them so the entity description matches what a reader sees.
  const paragraphs = (data.aboutContent?.paragraphs || [])
    .map((p) => (p.text || '').replace('{university}', info.university || ''))
    .filter(Boolean);

  const person = clean({
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: info.name || null,
    url: SITE_URL,
    image: info.profileImage ? abs(info.profileImage) : null,
    email: info.email || null,
    jobTitle: info.title || null,
    description: paragraphs[0] || info.tagline || null,
    knowsAbout: knowsAbout(data.skills, data.education),
    sameAs,
    alumniOf: info.university
      ? clean({
          '@type': 'CollegeOrUniversity',
          name: info.university,
          url: 'https://telkomuniversity.ac.id',
        })
      : null,
    homeLocation: info.location
      ? { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: info.location } }
      : null,
    hasCredential: credentials(data.certifications),
    hasOccupation: workExperience(data.experiences),
  });

  const website = clean({
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: info.name ? `${info.name} — Data Science Portfolio` : 'Data Science Portfolio',
    inLanguage: 'en',
    publisher: { '@id': `${SITE_URL}/#person` },
  });

  const page = clean({
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: info.name ? `${info.name} | Data Science Portfolio` : 'Data Science Portfolio',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#person` },
    mainEntity: { '@id': `${SITE_URL}/#person` },
    primaryImageOfPage: info.profileImage ? abs(info.profileImage) : null,
    // Freshness is a documented AI-citation signal; the build date is the
    // honest answer for a statically generated page.
    dateModified: dateModified || new Date().toISOString(),
    inLanguage: 'en',
  });

  const projectList = clean({
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#projects`,
    name: 'Data science and machine learning projects',
    numberOfItems: (data.projects || []).length,
    itemListElement: projectItems(data.projects),
  });

  return {
    '@context': 'https://schema.org',
    '@graph': [person, website, page, projectList],
  };
}
