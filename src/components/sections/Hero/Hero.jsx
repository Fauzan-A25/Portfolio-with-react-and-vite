import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTypingEffect } from '../../../hooks/useTypingEffect';
import './Hero.css';

const Hero = memo(({ personalInfo, socialLinks, heroTypingTexts }) => {
  // Use the typing effect with rotating texts
  const { displayText } = useTypingEffect(
    heroTypingTexts || ['Developer', 'Designer'],
    80,      // typing speed
    50,      // delete speed
    2000     // delay between texts
  );

  const handleCVDownload = () => {
    if (personalInfo?.cvLink) {
      window.open(personalInfo.cvLink, '_blank');
    }
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinksArray = socialLinks
    ? Object.entries(socialLinks)
        .filter(([key]) => key !== 'email')
        .map(([platform, url]) => ({
          platform,
          url,
          label: platform.charAt(0).toUpperCase() + platform.slice(1)
        }))
    : [];

  return (
    <section id="home" className="hero-section">
      {/* Animated Background */}
      <div className="hero-background">
        <div className="gradient-circle circle-1"></div>
        <div className="gradient-circle circle-2"></div>
        <div className="gradient-circle circle-3"></div>
        <div className="hero-grid"></div>
      </div>

      <div className="container">
        <div className="hero-content">
          {/* Left Side - Text Content */}
          <div className="hero-text-content">
            {/* Greeting */}
            <div className="hero-greeting">
              <span className="wave">👋</span>
              <span className="greeting-text">Hello, I'm</span>
            </div>

            {/* Name */}
            <h1 className="hero-name">
              {personalInfo?.name || 'Your Name'}
            </h1>

            {/* Animated Title - Single Line with Typing Effect */}
            <div className="hero-title-wrapper">
              <h2 className="hero-title">
                <span className="title-static">
                  {personalInfo?.title || 'Developer'}
                </span>
                <span className="title-separator"> | </span>
                <span className="title-dynamic">{displayText}</span>
                <span className="cursor-blink">|</span>
              </h2>
            </div>

            {/* Tagline */}
            <p className="hero-tagline">
              {personalInfo?.tagline || 'Building amazing things with code'}
            </p>

            {/* Info Cards */}
            <div className="hero-info-cards">
              {personalInfo?.university && (
                <div className="info-card">
                  <i className="bi bi-mortarboard-fill"></i>
                  <div className="info-content">
                    <span className="info-label">Studying at</span>
                    <span className="info-value">{personalInfo.university}</span>
                  </div>
                </div>
              )}
              {personalInfo?.location && (
                <div className="info-card">
                  <i className="bi bi-geo-alt-fill"></i>
                  <div className="info-content">
                    <span className="info-label">Based in</span>
                    <span className="info-value">{personalInfo.location}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="hero-actions">
              {personalInfo?.cvLink && (
                <button className="hero-btn btn-primary" onClick={handleCVDownload}>
                  <i className="bi bi-download"></i>
                  <span>Download CV</span>
                </button>
              )}
              <a href="#contact" className="hero-btn btn-secondary" onClick={scrollToContact}>
                <i className="bi bi-envelope"></i>
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Social Links */}
            {socialLinksArray.length > 0 && (
              <div className="hero-social">
                <span className="social-label">Connect with me:</span>
                <div className="social-links">
                  {socialLinksArray.map(({ platform, url, label }) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={platform}
                      title={label}
                    >
                      <i className={`bi bi-${platform}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Profile Image */}
          <div className="hero-image-section">
            <div className="hero-image-container">
              {/* Decorative Elements */}
              <div className="image-decoration decoration-1"></div>
              <div className="image-decoration decoration-2"></div>
              
              {/* Profile Image */}
              <div className="profile-image-wrapper">
                <div className="profile-image-border">
                  <img
                    src={personalInfo?.profileImage || 'https://via.placeholder.com/500/1a1a1a/00d4aa?text=Profile'}
                    alt={personalInfo?.name || 'Profile'}
                    className="profile-image"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Floating Skill Tags */}
              <div className="floating-tag tag-1">
                <i className="bi bi-code-slash"></i>
                <span>Python</span>
              </div>
              <div className="floating-tag tag-2">
                <i className="bi bi-graph-up"></i>
                <span>ML</span>
              </div>
              <div className="floating-tag tag-3">
                <i className="bi bi-database"></i>
                <span>Data</span>
              </div>

              {/* Status Badge */}
              <div className="status-badge">
                <span className="status-dot"></span>
                <span>Available for work</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <a href="#about" aria-label="Scroll to about section">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
          <span className="scroll-text">Scroll Down</span>
        </a>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

Hero.propTypes = {
  personalInfo: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    tagline: PropTypes.string,
    university: PropTypes.string,
    location: PropTypes.string,
    cvLink: PropTypes.string,
    profileImage: PropTypes.string,
  }),
  socialLinks: PropTypes.shape({
    github: PropTypes.string,
    linkedin: PropTypes.string,
    instagram: PropTypes.string,
    email: PropTypes.string,
  }),
  heroTypingTexts: PropTypes.arrayOf(PropTypes.string),
};

Hero.defaultProps = {
  personalInfo: {
    name: 'Your Name',
    title: 'Developer',
    tagline: 'Building amazing things with code',
  },
  socialLinks: {},
  heroTypingTexts: ['Developer', 'Designer', 'Creator'],
};

export default Hero;
