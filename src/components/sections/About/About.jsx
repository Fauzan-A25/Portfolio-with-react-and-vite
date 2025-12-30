import { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import './About.css';

const About = memo(({ personalInfo, aboutContent, stats }) => {
  const [elementRef, isVisible] = useIntersectionObserver();

  return (
    <section 
      id="about" 
      ref={elementRef}
      className={`about-section ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="container">
        {/* Centered Content */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="about-content">
              <h2 className="section-title">About Me</h2>
              <div className="title-underline"></div>
              
              {aboutContent?.paragraphs?.map((para) => (
                <p key={para.id} className="about-text">
                  {para.text.replace('{university}', personalInfo?.university || 'University')}
                </p>
              ))}

              {/* Highlights */}
              <div className="about-highlights">
                {aboutContent?.highlights?.map((highlight) => (
                  <div key={highlight.id} className="highlight-item">
                    <i className={`bi ${highlight.icon}`}></i>
                    <span>{highlight.text}</span>
                  </div>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="stats-grid">
                {stats?.map((stat, index) => (
                  <div 
                    key={index} 
                    className="stat-card glass-card"
                  >
                    <i className={`bi ${stat.icon} stat-icon`} style={{ color: stat.color }}></i>
                    <h3 className="stat-value">{stat.value}</h3>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="about-cta">
                <a href="#contact" className="modern-btn">
                  <i className="bi bi-chat-dots"></i>
                  Let's Talk
                </a>
                <a href="#projects" className="modern-btn btn-outline">
                  <i className="bi bi-folder"></i>
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';

About.propTypes = {
  personalInfo: PropTypes.shape({
    university: PropTypes.string,
  }),
  aboutContent: PropTypes.shape({
    paragraphs: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        text: PropTypes.string,
      })
    ),
    highlights: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        icon: PropTypes.string,
        text: PropTypes.string,
      })
    ),
  }),
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      value: PropTypes.string,
      label: PropTypes.string,
      color: PropTypes.string,
    })
  ),
};

export default About;
