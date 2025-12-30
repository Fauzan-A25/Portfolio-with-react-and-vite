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
            <i className="bi bi-briefcase"></i> Professional Experience
          </h2>
          <p className="section-subtitle">
            My journey through professional roles and organizational leadership
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
                <i className="bi bi-building"></i>
              </div>

              {/* Card Content */}
              <div className="experience-content">
                {/* Header */}
                <div className="experience-header">
                  <div className="title-group">
                    <h3 className="experience-title">{exp.title}</h3>
                    <div className="company-info">
                      <span className="company-name">
                        <i className="bi bi-building"></i>
                        {exp.company}
                      </span>
                      {exp.location && (
                        <span className="company-location">
                          <i className="bi bi-geo-alt"></i>
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>
                  {exp.type && (
                    <span className={`experience-type type-${exp.type.toLowerCase()}`}>
                      {exp.type}
                    </span>
                  )}
                </div>

                {/* Period */}
                <div className="experience-period">
                  <i className="bi bi-calendar-event"></i>
                  <span>{exp.period}</span>
                  {exp.duration && (
                    <span className="duration">
                      <i className="bi bi-clock"></i>
                      {exp.duration}
                    </span>
                  )}
                </div>

                {/* Description */}
                {exp.description && (
                  <p className="experience-description">{exp.description}</p>
                )}

                {/* Responsibilities */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="experience-responsibilities">
                    <h4><i className="bi bi-check-circle"></i> Key Responsibilities:</h4>
                    <ul>
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Achievements */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="experience-achievements">
                    <h4><i className="bi bi-trophy"></i> Achievements:</h4>
                    <ul>
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="experience-technologies">
                    {exp.technologies.map((tech, idx) => (
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
