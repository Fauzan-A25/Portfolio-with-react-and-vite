import './Footer.css';

export default function Footer({ personalInfo = {}, socialLinks = {}, footerContent = {} }) {
  const links = [
    ['GitHub', socialLinks.github],
    ['LinkedIn', socialLinks.linkedin],
    ['Instagram', socialLinks.instagram],
    ['Email', personalInfo.email ? `mailto:${personalInfo.email}` : null],
  ].filter(([, href]) => Boolean(href));

  return (
    <footer className="ft">
      <div className="ft__inner">
        <div className="ft__lead">
          {footerContent.quote && <p className="ft__quote">“{footerContent.quote}”</p>}
          <p className="ft__copy mono">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>

        <div className="ft__links">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              data-peek={href.startsWith('mailto:') ? undefined : href}
              className="pill"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
