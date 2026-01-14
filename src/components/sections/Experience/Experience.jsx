import { memo } from 'react';
import PropTypes from 'prop-types';
import './Experience.css';

const Experience = memo(({ experiences }) => {
  // Jika data kosong, tampilkan placeholder
  if (!experiences || experiences.length === 0) {
    return (
      <section 
        id="experience" 
        className="experience-section"
        style={{ 
          background: 'var(--primary-bg)', 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="container">
          <h2 style={{ color: 'white', textAlign: 'center' }}>
            Loading experiences...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="experience" 
      className="experience-section"
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Professional Experience
          </h2>
          <p className="section-subtitle">
            Experience and professional journey
          </p>
        </div>

        {/* Timeline Container */}
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {experiences.map((exp) => (
            <div 
              key={exp.id} 
              className="experience-card"
            >
              {/* Timeline Dot */}
              <div className="timeline-dot">
                <i className="bi bi-briefcase"></i>
              </div>

              {/* Card Content */}
              <div className="experience-content">
                {/* Main Info */}
                <div className="experience-main">
                  <div className="experience-header">
                    <div>
                      <h3 className="experience-title">{exp.title}</h3>
                      <p className="experience-company">{exp.company}</p>
                    </div>
                    {exp.type && (
                      <span className={`experience-type type-${exp.type.toLowerCase()}`}>
                        {exp.type}
                      </span>
                    )}
                  </div>

                  {/* Period */}
                  <div className="experience-period">
                    <span>{exp.period}</span>
                    {exp.duration && <span className="duration">{exp.duration}</span>}
                  </div>
                </div>

                {/* Description */}
                {exp.description && (
                  <p className="experience-description">{exp.description}</p>
                )}

                {/* Key Responsibilities */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="experience-responsibilities">
                    <h4>Key Responsibilities:</h4>
                    <ul>
                      {exp.responsibilities.slice(0, 3).map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="experience-technologies">
                    {exp.technologies.slice(0, 5).map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Experience.displayName = 'Experience';

Experience.propTypes = {
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      company: PropTypes.string,
      location: PropTypes.string,
      period: PropTypes.string,
      duration: PropTypes.string,
      type: PropTypes.string,
      description: PropTypes.string,
      responsibilities: PropTypes.arrayOf(PropTypes.string),
      technologies: PropTypes.arrayOf(PropTypes.string),
      achievements: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};

Experience.defaultProps = {
  experiences: [],
};

export default Experience;
