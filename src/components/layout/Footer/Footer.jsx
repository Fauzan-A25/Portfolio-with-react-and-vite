import { memo } from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

const Footer = memo(({ personalInfo, socialLinks, footerContent }) => {
  const currentYear = new Date().getFullYear();

  const socialLinksArray = socialLinks
    ? Object.entries(socialLinks)
        .filter(([key]) => key !== 'email')
        .map(([platform, url]) => ({
          icon: `bi-${platform}`,
          url,
          label: platform.charAt(0).toUpperCase() + platform.slice(1),
        }))
    : [];

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="footer-section">
              <div className="footer-newsletter">
                <p>"{footerContent?.quote || 'Keep learning, keep growing.'}"</p>
              </div>
            </div>
          </div>

          {/* Optional: Social Links Section */}
          {socialLinksArray.length > 0 && (
            <div className="col-lg-3 col-md-6">
              <div className="footer-section">
                <h4 className="footer-title">Connect</h4>
                <div className="footer-social">
                  {socialLinksArray.map(({ icon, url, label }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer-social-link"
                      aria-label={label}
                      title={label}
                    >
                      <i className={`bi ${icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} {personalInfo?.name || 'Portfolio'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

Footer.propTypes = {
  personalInfo: PropTypes.shape({
    name: PropTypes.string,
  }),
  socialLinks: PropTypes.shape({
    github: PropTypes.string,
    linkedin: PropTypes.string,
    instagram: PropTypes.string,
    email: PropTypes.string,
  }),
  footerContent: PropTypes.shape({
    quote: PropTypes.string,
  }),
};

Footer.defaultProps = {
  personalInfo: {
    name: 'Portfolio',
  },
  socialLinks: {},
  footerContent: {
    quote: 'Keep learning, keep growing.',
  },
};

export default Footer;
