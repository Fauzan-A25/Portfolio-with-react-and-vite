import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import './Projects.css';

const Projects = memo(({ projects, projectCategories, projectsContent }) => {
  const [elementRef, isVisible] = useIntersectionObserver();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [itemsToShow] = useState(3);

  // ✅ Filter logic dengan limit
  const getFilteredProjects = () => {
    if (!projects || projects.length === 0) return [];
    
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Slice berdasarkan showAll
    if (!showAll) {
      filtered = filtered.slice(0, itemsToShow);
    }

    return filtered;
  };

  const filteredProjects = getFilteredProjects();
  const totalProjects = selectedCategory === 'All' 
    ? (projects?.length || 0)
    : (projects?.filter(p => p.category === selectedCategory).length || 0);

  // Handle View All button
  const handleViewAll = () => {
    setShowAll(true);
  };

  // Handle Show Less button
  const handleShowLess = () => {
    setShowAll(false);
  };

  // Reset showAll ketika kategori berubah
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowAll(false);
  };

  // Default content fallback
  const content = projectsContent || {
    featuredTitle: 'Featured Projects',
    allTitle: 'All Projects',
    subtitle: 'Some of my recent work',
    allSubtitle: 'Showing {count} projects{category}',
    viewAllButton: 'View All Projects ({count})',
    showLessButton: 'Show Less',
    noProjects: 'No projects found in this category',
  };

  return (
    <section
      id="projects"
      ref={elementRef}
      className={`projects-section ${isVisible ? 'animate-in' : ''}`}
    >
      <div className="container">
        {/* Header */}
        <div className="projects-header">
          <h2 className="section-title">
            {showAll ? content.allTitle : content.featuredTitle}
          </h2>
          <p className="section-subtitle">
            {showAll 
              ? content.allSubtitle
                  .replace('{count}', totalProjects)
                  .replace('{category}', selectedCategory !== 'All' ? ` in ${selectedCategory}` : '')
              : content.subtitle
            }
          </p>
        </div>

        {/* Category Filter */}
        {projectCategories && projectCategories.length > 0 && (
          <div className="project-filters">
            {projectCategories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          ) : (
            <div className="no-projects">
              <i className="bi bi-folder-x"></i>
              <p>{content.noProjects}</p>
            </div>
          )}
        </div>

        {/* View All / Show Less Button */}
        {totalProjects > 3 && (
          <div className="projects-footer">
            {!showAll ? (
              <button 
                className="modern-btn btn-outline"
                onClick={handleViewAll}
              >
                <i className="bi bi-grid-3x3"></i>
                {content.viewAllButton.replace('{count}', totalProjects)}
              </button>
            ) : (
              <button 
                className="modern-btn btn-outline"
                onClick={handleShowLess}
              >
                <i className="bi bi-eye-slash"></i>
                {content.showLessButton}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
});

const ProjectCard = memo(({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="project-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div className="project-image-wrapper">
        <img
          src={project.image || 'https://via.placeholder.com/600x400/1a1a1a/00d4aa?text=No+Image'}
          alt={project.title}
          className="project-image"
          loading="lazy"
        />
        
        {/* Overlay with Buttons */}
        <div className={`project-overlay ${isHovered ? 'active' : ''}`}>
          <div className="overlay-buttons">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="overlay-btn"
                title="View Code"
              >
                <i className="bi bi-github"></i>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="overlay-btn"
                title="Live Demo"
              >
                <i className="bi bi-box-arrow-up-right"></i>
              </a>
            )}
          </div>
        </div>

        {/* Status Badge */}
        {project.status && (
          <div className="project-status-badge">
            <span className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>
              {project.status}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="project-content">
        {/* Category & Year */}
        <div className="project-meta">
          <span className="category">
            <i className="bi bi-folder"></i>
            {project.category}
          </span>
          {project.year && <span className="year">{project.year}</span>}
        </div>

        {/* Title */}
        <h3 className="project-title">{project.title}</h3>

        {/* Description */}
        <p className="project-description">{project.description}</p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="project-tags">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="tag more">+{project.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Footer - Links */}
        <div className="project-footer">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <i className="bi bi-github"></i>
              Code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link primary"
            >
              <i className="bi bi-play-circle"></i>
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    status: PropTypes.string,
    year: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
    githubUrl: PropTypes.string,
    demoUrl: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

Projects.displayName = 'Projects';

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      category: PropTypes.string,
      status: PropTypes.string,
      year: PropTypes.number,
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  projectCategories: PropTypes.arrayOf(PropTypes.string),
  projectsContent: PropTypes.shape({
    featuredTitle: PropTypes.string,
    allTitle: PropTypes.string,
    subtitle: PropTypes.string,
    allSubtitle: PropTypes.string,
    viewAllButton: PropTypes.string,
    showLessButton: PropTypes.string,
    noProjects: PropTypes.string,
  }),
};

Projects.defaultProps = {
  projects: [],
  projectCategories: ['All'],
  projectsContent: {
    featuredTitle: 'Featured Projects',
    allTitle: 'All Projects',
    subtitle: 'Some of my recent work',
    allSubtitle: 'Showing {count} projects{category}',
    viewAllButton: 'View All Projects ({count})',
    showLessButton: 'Show Less',
    noProjects: 'No projects found in this category',
  },
};

export default Projects;
