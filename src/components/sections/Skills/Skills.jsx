import { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import './Skills.css';

const Skills = memo(({ skills, skillsContent }) => {
  const [elementRef, isVisible] = useIntersectionObserver();

  // Default content fallback
  const content = skillsContent || {
    title: 'Skills & Expertise',
    subtitle: 'Technologies and tools I work with',
    categoryTitles: {
      programming: 'Programming Languages',
      dataScience: 'Data Science & ML',
      tools: 'Tools & Technologies',
      soft: 'Soft Skills',
    },
  };

  return (
    <section 
      id="skills" 
      ref={elementRef}
      className={`skills-section ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="container">
        <h2 className="section-title">{content.title}</h2>
        <p className="section-subtitle">
          {content.subtitle}
        </p>

        <div className="skills-container">
          {skills && Object.entries(skills).map(([category, skillList], index) => (
            <SkillCategory 
              key={category}
              title={content.categoryTitles?.[category] || category}
              skills={skillList}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

const SkillCategory = memo(({ title, skills, delay }) => {
  const [categoryRef, isVisible] = useIntersectionObserver();

  if (!skills || skills.length === 0) return null;

  return (
    <div 
      ref={categoryRef}
      className={`skill-category glass-card ${isVisible ? 'animate-in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="category-title">{title}</h3>
      <div className="skills-list">
        {skills.map((skill, index) => (
          <SkillCard 
            key={skill.name} 
            skill={skill} 
            isVisible={isVisible}
            delay={index * 50}
          />
        ))}
      </div>
    </div>
  );
});

const SkillCard = memo(({ skill, isVisible, delay }) => {
  const getExperienceLabel = (years) => {
    if (!years) return '';
    if (years < 1) return `${years * 12} months`;
    if (years === 1) return '1 year';
    return `${years} years`;
  };

  return (
    <div 
      className={`skill-card ${isVisible ? 'fade-in' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="skill-icon-wrapper">
        <i 
          className={`bi ${skill.icon}`} 
          style={{ color: skill.color || 'var(--accent-color)' }}
        ></i>
      </div>
      
      <div className="skill-content">
        <div className="skill-header">
          <h4 className="skill-name">{skill.name}</h4>
          {skill.yearsOfExperience && (
            <span className="skill-experience">
              {getExperienceLabel(skill.yearsOfExperience)}
            </span>
          )}
        </div>
        
        {skill.description && (
          <p className="skill-description">{skill.description}</p>
        )}
        
        {skill.projects && skill.projects.length > 0 && (
          <div className="skill-meta">
            <span className="project-count">
              <i className="bi bi-folder-fill"></i>
              {skill.projects.length} project{skill.projects.length > 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

SkillCategory.displayName = 'SkillCategory';

SkillCategory.propTypes = {
  title: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
      color: PropTypes.string,
      yearsOfExperience: PropTypes.number,
      description: PropTypes.string,
      projects: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  delay: PropTypes.number,
};

SkillCard.displayName = 'SkillCard';

SkillCard.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string,
    icon: PropTypes.string,
    color: PropTypes.string,
    yearsOfExperience: PropTypes.number,
    description: PropTypes.string,
    projects: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isVisible: PropTypes.bool.isRequired,
  delay: PropTypes.number.isRequired,
};

Skills.displayName = 'Skills';

Skills.propTypes = {
  skills: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        icon: PropTypes.string,
        color: PropTypes.string,
        yearsOfExperience: PropTypes.number,
        description: PropTypes.string,
        projects: PropTypes.arrayOf(PropTypes.string),
      })
    )
  ),
  skillsContent: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    categoryTitles: PropTypes.objectOf(PropTypes.string),
  }),
};

Skills.defaultProps = {
  skills: {},
  skillsContent: {
    title: 'Skills & Expertise',
    subtitle: 'Technologies and tools I work with',
    categoryTitles: {
      programming: 'Programming Languages',
      dataScience: 'Data Science & ML',
      tools: 'Tools & Technologies',
      soft: 'Soft Skills',
    },
  },
};

export default Skills;
