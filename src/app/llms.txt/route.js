import { getPortfolioData } from '@/lib/portfolio';
import { SITE_URL } from '@/lib/site';

export const revalidate = 3600;

/**
 * /llms.txt — a plain-text digest for AI agents.
 *
 * Worth being honest about: Google has stated llms.txt is not a ranking or
 * citation signal, and server-log audits have not found the major AI crawlers
 * requesting it. It costs nothing to serve and some smaller agents do read it,
 * but the SSR HTML and the JSON-LD graph are what actually do the work here.
 */
export async function GET() {
  const data = await getPortfolioData();
  const info = data.personalInfo || {};
  const social = data.socialLinks || {};

  // Sheet-authored descriptions run to several paragraphs; a bullet list needs
  // them on one line or the structure falls apart.
  const oneLine = (s) => (s || '').replace(/\s+/g, ' ').trim();

  const summary = (data.aboutContent?.paragraphs || [])
    .map((p) => oneLine((p.text || '').replace('{university}', info.university || '')))
    .filter(Boolean);

  const projects = (data.projects || []).filter((p) => p?.title);
  const certs = (data.certifications || []).filter((c) => c?.name);
  const roles = (data.experiences || []).filter((e) => e?.title);

  const skills = Object.entries(data.skills || {})
    .map(([group, list]) => {
      const names = (list || []).map((s) => s?.name).filter(Boolean);
      if (!names.length) return null;
      const label = data.skillsContent?.categoryTitles?.[group] || group;
      return `- ${label}: ${names.join(', ')}`;
    })
    .filter(Boolean);

  const lines = [
    `# ${info.name || 'Portfolio'}`,
    '',
    `> ${info.title || 'Data Science Student'} at ${info.university || ''} — ${info.focus || ''}. Portfolio: ${SITE_URL}`,
    '',
    '## Summary',
    '',
    ...summary.map((p) => `${p}\n`),
    '## Profile',
    '',
    `- Name: ${info.name || '—'}`,
    `- Role: ${info.title || '—'}`,
    `- Institution: ${info.university || '—'}`,
    `- Location: ${info.location || '—'}`,
    `- Focus areas: ${info.focus || '—'}`,
    `- Email: ${info.email || '—'}`,
    social.github ? `- GitHub: ${social.github}` : null,
    social.linkedin ? `- LinkedIn: ${social.linkedin}` : null,
    '',
    '## Skills',
    '',
    ...skills,
    '',
    '## Projects',
    '',
    ...projects.map((p) => {
      const link = p.demoUrl || p.githubUrl;
      const head = link ? `- [${p.title}](${link})` : `- ${p.title}`;
      const meta = [p.category, p.year, (p.technologies || []).join(', ')]
        .filter(Boolean)
        .join(' · ');
      return `${head}: ${oneLine(p.description)}${meta ? ` (${meta})` : ''}`;
    }),
    '',
    '## Experience',
    '',
    ...roles.map(
      (e) => `- ${e.title}, ${e.company || '—'} (${e.period || '—'}): ${oneLine(e.description)}`,
    ),
    '',
    '## Certifications and competitions',
    '',
    ...certs.map((c) => `- ${c.name} — ${c.issuer || '—'}${c.role ? `, ${c.role}` : ''}${c.date ? `, ${c.date}` : ''}`),
    '',
    `Last updated: ${new Date().toISOString().slice(0, 10)}`,
    '',
  ].filter((line) => line !== null);

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
