import { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import './Certifications.css';

const Certifications = memo(({ certifications }) => {
  const [elementRef, isVisible] = useIntersectionObserver();

  return (
    <section 
      id="certifications" 
      className={`certifications-section ${isVisible ? 'animate-in' : ''}`}
      ref={elementRef}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            <i className="bi bi-award"></i> Certifications & Achievements
          </h2>
          <p className="section-subtitle">
            Professional certifications and recognition earned throughout my journey
          </p>
        </div>

        <div className="certifications-grid">
          {certifications?.map((cert, index) => (
            <div 
              key={cert.id} 
              className={`certification-card ${isVisible ? 'fade-in' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="cert-icon-wrapper">
                <i className="bi bi-patch-check"></i>
                <div className="cert-glow"></div>
              </div>

              {/* Content */}
              <div className="cert-content">
                <h3 className="cert-name">{cert.name}</h3>
                
                <div className="cert-issuer">
                  <i className="bi bi-building"></i>
                  <span>{cert.issuer}</span>
                </div>

                {cert.date && cert.date !== 'N/A' && (
                  <div className="cert-date">
                    <i className="bi bi-calendar-check"></i>
                    <span>Issued: {cert.date}</span>
                  </div>
                )}

                {cert.credentialId && cert.credentialId !== 'N/A' && (
                  <div className="cert-credential">
                    <i className="bi bi-key"></i>
                    <span className="credential-id">ID: {cert.credentialId}</span>
                  </div>
                )}

                {cert.url && (
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="cert-verify-btn"
                  >
                    <i className="bi bi-box-arrow-up-right"></i>
                    Verify Certificate
                  </a>
                )}
              </div>

              {/* Badge Decoration */}
              <div className="cert-badge">
                <i className="bi bi-trophy"></i>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        {certifications && certifications.length > 0 && (
          <div className="cert-stats">
            <div className="stat-item">
              <i className="bi bi-patch-check-fill"></i>
              <div className="stat-content">
                <span className="stat-value">{certifications.length}</span>
                <span className="stat-label">Total Certifications</span>
              </div>
            </div>
            <div className="stat-item">
              <i className="bi bi-trophy-fill"></i>
              <div className="stat-content">
                <span className="stat-value">
                  {certifications.filter(c => c.name.includes('Competition')).length}
                </span>
                <span className="stat-label">Competition Awards</span>
              </div>
            </div>
            <div className="stat-item">
              <i className="bi bi-mortarboard-fill"></i>
              <div className="stat-content">
                <span className="stat-value">
                  {certifications.filter(c => 
                    c.issuer.includes('MySkill') || c.name.includes('Belajar')
                  ).length}
                </span>
                <span className="stat-label">Learning Certificates</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

Certifications.displayName = 'Certifications';

Certifications.propTypes = {
  certifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      issuer: PropTypes.string,
      date: PropTypes.string,
      credentialId: PropTypes.string,
      url: PropTypes.string,
    })
  ),
};

Certifications.defaultProps = {
  certifications: [],
};

export default Certifications;
