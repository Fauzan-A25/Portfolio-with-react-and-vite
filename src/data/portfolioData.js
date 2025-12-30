// Portfolio Data - Centralized data management for better maintainability

export const personalInfo = {
  name: 'Fauzan Ahsanudin Alfikri',
  title: 'Data Science Student',
  subtitle: 'Machine Learning Enthusiast | Python Developer',
  tagline: 'Passionate about turning data into insights and solving real-world problems through technology',
  university: 'Telkom University',
  location: 'Bandung, Indonesia',
  email: 'fauzanahsanudin@gmail.com',
  gpa: '3.8',
  cvLink: 'https://docs.google.com/document/d/1zm9N7lCHsZPCChdz5zjfQK4wogPMqb5g/',
  profileImage: './images/Fauzan.png'
};

export const socialLinks = {
  github: 'https://github.com/Fauzan-A25',
  linkedin: 'https://linkedin.com/in/fauzanahsanudin',
  instagram: 'https://instagram.com/fauzan_1718',
  email: 'mailto:fauzanahsanudin@gmail.com',
};

export const projects = [
  {
    id: 1,
    title: 'Fossil - Water Potability Prediction',
    slug: 'fossil-water-potability',
    shortDescription: 'ML application for predicting water safety',
    description:
      'An intelligent Streamlit-based Machine Learning application that predicts water potability using various chemical and physical parameters such as pH, sulfate concentration, and organic carbon. Built with MLPClassifier model to assess water safety for drinking purposes.',
    image: './images/Projects/Fossil_App_Screenshot.png',
    tags: ['Machine Learning', 'Streamlit', 'Python', 'MLPClassifier', 'Data Science'],
    technologies: [
      'Python 3.9+',
      'Streamlit',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Matplotlib',
    ],
    features: [
      'Real-time water quality prediction',
      'Interactive parameter input',
      'Visual data analysis',
      'Model performance metrics',
      'User-friendly interface',
    ],
    category: 'Machine Learning',
    status: 'Completed',
    year: 2024,
    duration: '2 months',
    role: 'Full Stack Developer',
    teamSize: 3,
    githubUrl: 'https://github.com/Fauzan-A25/FOSSIL_GDGoC-TUBES',
    demoUrl: 'https://fossil-water-app.streamlit.app',
    videoUrl: null,
    featured: true,
    highlights: [
      'Achieved 89% accuracy in water potability prediction',
      'Deployed on Streamlit Cloud for public access',
      'Processed 3,276 water quality samples',
    ],
  },
  {
    id: 2,
    title: 'COPPA Risk Prediction Model',
    slug: 'coppa-risk-prediction',
    shortDescription: 'XGBoost model for COPPA violation detection',
    description:
      'Advanced machine learning model using XGBoost to predict COPPA (Children\'s Online Privacy Protection Act) violation risks in mobile applications. Features comprehensive data preprocessing, feature engineering, and model optimization to identify apps that may violate children\'s privacy regulations.',
    image: './images/Projects/COPPA_Model.png',
    tags: ['XGBoost', 'Classification', 'Data Science', 'Privacy', 'COPPA'],
    technologies: [
      'Python 3.9+',
      'XGBoost',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'SHAP',
      'Matplotlib',
      'Seaborn',
    ],
    features: [
      'Advanced feature engineering',
      'XGBoost classification model',
      'SHAP value analysis for interpretability',
      'Comprehensive data preprocessing',
      'Model performance evaluation',
    ],
    category: 'Data Science',
    status: 'Completed',
    year: 2025,
    duration: '1 months',
    role: 'Data Scientist',
    teamSize: 1,
    githubUrl: 'https://github.com/Fauzan-A25/coppa-risk-prediction-findit2025-fauzan',
    demoUrl: null,
    videoUrl: null,
    featured: true,
    highlights: [
      'Developed predictive model with 92% accuracy',
      'Analyzed 10,000+ mobile applications',
      'Implemented SHAP for model explainability',
    ],
  },
  {
    id: 3,
    title: 'Crowd Counting with CSRNet',
    slug: 'crowd-counting-csrnet',
    shortDescription: 'Deep learning for crowd density estimation',
    description:
      'Implementation of CSRNet (Congested Scene Recognition Network) using PyTorch for accurate crowd counting and density estimation. The model can handle both sparse and dense crowds, making it suitable for various surveillance and monitoring applications.',
    image: './images/Projects/crowd_counting_csrnet.jpg',
    tags: ['Deep Learning', 'PyTorch', 'Computer Vision', 'CNN', 'CSRNet'],
    technologies: [
      'Python 3.9+',
      'PyTorch',
      'OpenCV',
      'NumPy',
      'Matplotlib',
      'CUDA',
    ],
    features: [
      'Accurate crowd density estimation',
      'Handles sparse and dense scenes',
      'Real-time inference capability',
      'Pre-trained model support',
      'Visualization tools',
    ],
    category: 'Computer Vision',
    status: 'Completed',
    year: 2025,
    duration: '1 weeks',
    role: 'ML Engineer',
    teamSize: 1,
    githubUrl: 'https://github.com/Fauzan-A25/crowd-counting-with-csrnet-competition-hology',
    demoUrl: null,
    videoUrl: null,
    featured: true,
    highlights: [
      'Trained on ShanghaiTech dataset',
      'Achieved MAE of 68.2 on Part A',
      'Optimized learning rate to 1e-4',
    ],
  },
  {
    id: 4,
    title: 'Pacific Data Viz Challenge - Climate Change & Disasters',
    slug: 'pacific-dataviz-climate-disasters',
    shortDescription: 'Data visualization project on Pacific climate change and disaster patterns',
    description:
      'An interactive data visualization project created for the Pacific Dataviz Challenge, analyzing climate change impacts and disaster patterns across Pacific Island nations. The project uses open data from the Pacific Data Hub to visualize trends in natural disasters, climate risks, and their effects on Pacific communities, supporting the Blue Pacific 2050 strategy objectives.',
    image: './images/Projects/Pacific_DataViz_Screenshot.png',
    tags: ['Data Visualization', 'Climate Change', 'Open Data', 'Pacific Islands', 'Dashboard'],
    technologies: [
      'Python',
      'Pandas',
      'Plotly/Matplotlib',
      'JavaScript',
      'D3.js',
      'HTML/CSS',
    ],
    features: [
      'Interactive climate change visualizations',
      'Disaster pattern analysis across Pacific regions',
      'Time-series data exploration',
      'Geographic heat maps',
      'Comparative regional statistics',
      'Responsive dashboard design',
    ],
    category: 'Data Visualization',
    status: 'Completed',
    year: 2025,
    duration: '3 months',
    role: 'Data Visualization Developer',
    teamSize: 1,
    githubUrl: 'https://github.com/Fauzan-A25/Pacific-Data-Viz-challenge_Climate-Change-And-Disasters',
    demoUrl: null,
    videoUrl: null,
    featured: true,
    highlights: [
      'Participated in Pacific Dataviz Challenge competition',
      'Analyzed climate and disaster data from Pacific Data Hub',
      'Created compelling visual narratives for Pacific Island climate issues',
      'Contributed to Blue Pacific 2050 strategy awareness',
    ],
  },
  {
    id: 5,
    title: 'AstroClassify - Stellar Classification System',
    slug: 'astroclassify-stellar-classification',
    shortDescription: 'ML-powered astronomical object classification system',
    description:
      'An intelligent astronomical object classification system powered by machine learning that identifies and classifies celestial objects (stars, galaxies, and quasars) based on spectral characteristics from the Sloan Digital Sky Survey (SDSS). Built with Streamlit interface featuring multiple ML models including Random Forest, XGBoost, and LightGBM for accurate stellar classification.',
    image: './images/Projects/AstroClassify_Screenshot.png',
    tags: ['Machine Learning', 'Astronomy', 'Classification', 'Streamlit', 'Data Science'],
    technologies: [
      'Python 3.x',
      'Streamlit',
      'Scikit-learn',
      'XGBoost',
      'LightGBM',
      'Pandas',
      'NumPy',
      'Matplotlib',
    ],
    features: [
      'Upload and process astronomical observation data (CSV)',
      'Automatic data preprocessing pipeline',
      'Multiple ML model selection (Random Forest, XGBoost, LightGBM)',
      'Interactive classification visualizations',
      'Confusion matrix and classification reports',
      'Export prediction results',
      'Real-time celestial object classification',
    ],
    category: 'Machine Learning',
    status: 'Completed',
    year: 2024,
    duration: '2 months',
    role: 'ML Developer',
    teamSize: 2,
    githubUrl: 'https://github.com/Fauzan-A25/AstroClassify',
    demoUrl: null,
    videoUrl: null,
    featured: true,
    highlights: [
      'Trained on SDSS spectral observation dataset',
      'Three-class classification: GALAXY, STAR, and QSO (Quasar)',
      'Implemented ensemble learning with multiple optimized models',
      'Comprehensive model evaluation with confusion matrices and reports',
      'Interactive Streamlit dashboard for astronomy enthusiasts and researchers',
    ],
  }
];

export const skills = {
  programming: [
    {
      name: 'Python',
      icon: 'bi-file-code',
      color: '#3776AB',
      yearsOfExperience: 2,
      description: 'Machine Learning, Data Analysis, Backend Development',
      projects: ['CSRNet Crowd Counting', 'FindIT2025', 'ML Pipeline', 'Data Science Portfolio']
    },
    {
      name: 'JavaScript',
      icon: 'bi-braces',
      color: '#F7DF1E',
      yearsOfExperience: 1,
      description: 'React, Node.js, Full-stack Web Development',
      projects: ['Portfolio Website', 'E-commerce Dashboard', 'Real-time Chat App']
    },
    {
      name: 'Java',
      icon: 'bi-cup-hot',
      color: '#007396',
      yearsOfExperience: 1,
      description: 'OOP, Spring Boot, Android Development',
      projects: ['Mobile App', 'Backend API', 'University Projects']
    },
    {
      name: 'SQL',
      icon: 'bi-database',
      color: '#4479A1',
      yearsOfExperience: 2,
      description: 'PostgreSQL, MySQL, Database Design & Optimization',
      projects: ['E-commerce Database', 'Analytics Dashboard', 'Supabase Integration']
    }
  ],
  
  dataScience: [
    {
      name: 'TensorFlow',
      icon: 'bi-diagram-3',
      color: '#FF6F00',
      yearsOfExperience: 2,
      description: 'Deep Learning, Computer Vision, Model Training',
      projects: ['CSRNet Implementation', 'Image Classification', 'Neural Networks']
    },
    {
      name: 'PyTorch',
      icon: 'bi-lightning',
      color: '#EE4C2C',
      yearsOfExperience: 2,
      description: 'Research Projects, Model Fine-tuning',
      projects: ['Crowd Counting Research', 'Transfer Learning']
    },
    {
      name: 'Pandas & NumPy',
      icon: 'bi-table',
      color: '#150458',
      yearsOfExperience: 2,
      description: 'Data Manipulation, Statistical Analysis',
      projects: ['Data Preprocessing Pipeline', 'Analytics Tools', 'Research Analysis']
    },
    {
      name: 'Scikit-learn',
      icon: 'bi-graph-up',
      color: '#F7931E',
      yearsOfExperience: 2,
      description: 'Classical ML, Model Evaluation, Feature Engineering',
      projects: ['Prediction Models', 'Classification Tasks', 'Academic Projects']
    }
  ],
  
  tools: [
    {
      name: 'Git & GitHub',
      icon: 'bi-git',
      color: '#F05032',
      yearsOfExperience: 3,
      description: 'Version Control, Collaboration, CI/CD',
      projects: ['All Projects', 'Open Source Contributions']
    },
    {
      name: 'React',
      icon: 'bi-bootstrap',
      color: '#61DAFB',
      yearsOfExperience: 1,
      description: 'Component Architecture, Hooks, State Management',
      projects: ['Portfolio Website', 'Web Applications', 'UI Components']
    },
    {
      name: 'Docker',
      icon: 'bi-box-seam',
      color: '#2496ED',
      yearsOfExperience: 1,
      description: 'Containerization, Deployment, Environment Setup',
      projects: ['ML Model Deployment', 'Development Environments']
    },
    {
      name: 'Jupyter Notebook',
      icon: 'bi-journal-code',
      color: '#F37626',
      yearsOfExperience: 2,
      description: 'Data Analysis, Research Documentation, Prototyping',
      projects: ['Data Science Projects', 'Research Experiments', 'Tutorials']
    }
  ],
  
  soft: [
    {
      name: 'Problem Solving',
      icon: 'bi-lightbulb',
      color: '#FFD700',
      yearsOfExperience: 3,
      description: 'Analytical thinking, Algorithm design, Debugging',
      projects: ['All Technical Projects']
    },
    {
      name: 'Research & Analysis',
      icon: 'bi-search',
      color: '#9C27B0',
      yearsOfExperience: 2,
      description: 'Academic research, Literature review, Data interpretation',
      projects: ['Academic Papers', 'Research Projects', 'Journal Analysis']
    },
    {
      name: 'Documentation',
      icon: 'bi-file-text',
      color: '#00BCD4',
      yearsOfExperience: 3,
      description: 'Technical writing, Code documentation, README creation',
      projects: ['GitHub Projects', 'Technical Reports', 'API Documentation']
    },
    {
      name: 'Team Collaboration',
      icon: 'bi-people',
      color: '#4CAF50',
      yearsOfExperience: 4,
      description: 'Agile methodologies, Code reviews, Communication',
      projects: ['Group Projects', 'Open Source', 'Academic Teams']
    }
  ]
};

export const experiences = [
  {
    id: 1,
    title: 'Brand Sales Officer',
    company: 'PT Bank Muamalat Indonesia',
    location: 'Indonesia',
    period: 'Jun 2025 - Present',
    duration: '5 months',
    type: 'Internship',
    description:
      'Supporting sales team in offering Islamic banking products including account opening, savings, and financing services.',
    responsibilities: [
      'Assisted sales team in promoting Islamic banking products',
      'Supported account opening and customer onboarding processes',
      'Provided product information on savings and financing options',
      'Collaborated with team members to achieve sales targets',
    ],
    technologies: ['Banking Systems', 'Customer Relations', 'Sales Tools'],
    achievements: [
      'Contributed to Islamic banking product promotion',
      'Enhanced understanding of Sharia-compliant financial services',
    ],
  },
  {
    id: 2,
    title: 'Head of Public Relations Department',
    company: 'PRADA Telkom University',
    location: 'Bandung, Indonesia',
    period: 'Dec 2024 - Jun 2025',
    duration: '7 months',
    type: 'Organizational',
    description:
      'Led the Public Relations Department for Idul Adha PRADA 1446 H, managing external communications and stakeholder engagement.',
    responsibilities: [
      'Managed external communications and media relations',
      'Coordinated with stakeholders for event promotion',
      'Developed communication strategies for religious events',
      'Led PR team to ensure effective messaging',
    ],
    technologies: ['Communication Tools', 'Social Media', 'Event Management'],
    achievements: [
      'Successfully led PR initiatives for major religious event',
      'Enhanced organizational visibility and engagement',
    ],
  },
  {
    id: 3,
    title: 'Kader Pengembangan Sumber Daya Manusia (PSDM)',
    company: 'Al-Fath Universitas Telkom',
    location: 'Bandung, Indonesia',
    period: 'Jan 2025 - Present',
    duration: '10 months',
    type: 'Organizational',
    description:
      'Contributing to human resource development initiatives within the Al-Fath organization at Faculty of Informatics.',
    responsibilities: [
      'Participated in HR development programs',
      'Supported organizational capacity building',
      'Collaborated on member training initiatives',
      'Contributed to organizational growth strategies',
    ],
    technologies: ['HR Management', 'Team Collaboration', 'Training Tools'],
    achievements: [
      'Enhanced organizational human resource capabilities',
      'Contributed to member development programs',
    ],
  },
  {
    id: 4,
    title: 'Kader Media Fakultas Informatika',
    company: 'Al-Fath Universitas Telkom',
    location: 'Bandung, Indonesia',
    period: 'Nov 2023 - Jan 2025',
    duration: '1 year 3 months',
    type: 'Organizational',
    description:
      'Created high-quality video content supporting organizational media initiatives, managing conceptualization, production, and editing processes.',
    responsibilities: [
      'Developed creative video content concepts',
      'Performed video shooting and editing for events',
      'Ensured brand consistency across media content',
      'Collaborated with media team on content strategy',
      'Highlighted organizational values and mission through visual storytelling',
    ],
    technologies: ['Video Editing', 'Adobe Premiere', 'Content Creation', 'Multimedia Production'],
    achievements: [
      'Produced high-quality video content for organizational events',
      'Enhanced organizational media presence',
      'Strengthened content strategy contributing to Al-Fath success',
    ],
  },
  {
    id: 5,
    title: 'Data Manager - Multiple Events',
    company: 'ISLAH Telkom University',
    location: 'Bandung, Indonesia',
    period: 'Oct 2024 - Oct 2024',
    duration: '1 month',
    type: 'Organizational',
    description:
      'Managed comprehensive data operations for ISLAH 1 2024 events including Big Class and Small Class sessions, ensuring accurate tracking and reporting.',
    responsibilities: [
      'Oversaw event data management for participants and speakers',
      'Organized registration databases and documentation',
      'Ensured accurate tracking and reporting of participant information',
      'Coordinated with event teams for smooth operations',
      'Supported event evaluation through data analysis',
    ],
    technologies: ['Excel', 'Data Management', 'Database Systems', 'Analytics'],
    achievements: [
      'Managed data for multiple simultaneous event sessions',
      'Ensured data accuracy supporting successful event execution',
      'Streamlined data processes for leadership development program',
    ],
  },
  {
    id: 6,
    title: 'Organizing Committee Member',
    company: 'ISLAH Telkom University',
    location: 'Bandung, Indonesia',
    period: 'Jul 2024 - Nov 2024',
    duration: '5 months',
    type: 'Organizational',
    description:
      'Managed post-form data processing for Evodis Islah 1 2024, ensuring data accuracy, security, and accessibility.',
    responsibilities: [
      'Managed and streamlined post-form data processing',
      'Ensured data accuracy, storage, and accessibility',
      'Coordinated with team on secure data storage solutions',
      'Enabled real-time data analysis and efficient workflow',
    ],
    technologies: ['Data Processing', 'Database Management', 'Excel', 'Data Security'],
    achievements: [
      'Enhanced data management skills in dynamic event environment',
      'Improved team collaboration and problem-solving capabilities',
    ],
  },
  {
    id: 7,
    title: 'Anggota Divisi Pendataan PMB 2024',
    company: 'Al-Fath Universitas Telkom',
    location: 'Bandung, Indonesia',
    period: 'Jul 2024 - Oct 2024',
    duration: '4 months',
    type: 'Organizational',
    description:
      'Served as committee member in Data Division for PMB 2024, managing participant data collection and organization.',
    responsibilities: [
      'Collected and managed participant data',
      'Recorded and organized information systematically',
      'Ensured data accuracy for smooth event operations',
      'Contributed to enhanced participant experience through effective data handling',
    ],
    technologies: ['Data Entry', 'Excel', 'Database Management', 'Documentation'],
    achievements: [
      'Maintained accurate and well-organized participant database',
      'Supported seamless event operations through data management',
    ],
  },
];


export const education = [
  {
    id: 1,
    degree: 'Bachelor of Data Science (S.Si.D.)',
    institution: 'Telkom University',
    location: 'Bandung, Indonesia',
    period: '2023 - 2027',
    gpa: 'N/A',
    status: 'In Progress',
    relevantCourses: [
      'Machine Learning',
      'Data Analytics',
      'Database Management',
      'Statistical Analysis',
      'Programming',
      'Big Data',
    ],
    achievements: [
      'Active member of GDGoC Telkom University (Dec 2024 - Jun 2025)',
      'Data Analyst Competition FIND IT! 2025 participant',
      'Multiple organizational leadership roles',
    ],
  },
];


export const certifications = [
  {
    id: 1,
    name: 'MySkill Certified INLINE ELEMENTS',
    issuer: 'MySkill',
    date: 'N/A',
    credentialId: 'N/A',
    url: null,
  },
  {
    id: 2,
    name: 'Certificate of Recognition as Delegate',
    issuer: 'Youth Today X Join AIESEC 2024',
    date: '2024',
    credentialId: 'N/A',
    url: null,
  },
  {
    id: 3,
    name: 'Data Analyst Competition FIND IT! 2025',
    issuer: 'Competition Certificate',
    date: '2025',
    credentialId: 'N/A',
    url: null,
  },
  {
    id: 4,
    name: 'Belajar Dasar AI',
    issuer: 'Online Learning Platform',
    date: 'N/A',
    credentialId: 'N/A',
    url: null,
  },
  {
    id: 5,
    name: 'MySkill Certified Browse, HTTP, DNS, and Hosting',
    issuer: 'MySkill',
    date: 'N/A',
    credentialId: 'N/A',
    url: null,
  },
];

export const stats = [
  { icon: 'bi-code-slash', value: '15+', label: 'Projects', color: '#00a8e8' },
  { icon: 'bi-trophy', value: '5+', label: 'Competitions', color: '#7b2cbf' },
];

// Navigation links
export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'certifications', label: 'Certifications', href: '#certifications' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

// Filter categories for projects
export const projectCategories = [
  'All',
  'Machine Learning',
  'Data Science',
  'Computer Vision',
  'Natural Language Processing',
  'Data Visualization',
];

// Hero section typing texts
export const heroTypingTexts = [
  'Machine Learning Enthusiast',
  'Python Developer',
];

// EmailJS Configuration
export const emailjsConfig = {
  serviceId: 'service_e0byds5',
  templateId: 'template_jtsltyj',
  publicKey: '_RI8Nk23mYc9B8ZeX',
};

// About Section Content
export const aboutContent = {
  paragraphs: [
    {
      id: 1,
      text: 'Third-year undergraduate student of Data Science at {university} with strong skills in data analysis, statistical evaluation, and problem-solving. Actively involved in academic activities with excellent attention to detail and observation skills.',
    },
    {
      id: 2,
      text: 'Proficient in programming with Python for data processing and analysis. Experienced in participating in various Data Science competitions, demonstrating strong analytical and critical thinking skills. A collaborative team player dedicated to delivering accurate and reliable data insights.',
    },
  ],
  highlights: [
    {
      id: 1,
      icon: 'bi-check-circle-fill',
      text: 'Strong analytical and problem-solving skills',
    },
    {
      id: 2,
      icon: 'bi-check-circle-fill',
      text: 'Experience in ML competitions and projects',
    },
    {
      id: 3,
      icon: 'bi-check-circle-fill',
      text: 'Team collaboration and communication',
    },
  ],
};

// Skills Section Content
export const skillsContent = {
  title: 'Skills & Expertise',
  subtitle: 'Technologies and tools I work with, measured by years of hands-on experience',
  categoryTitles: {
    programming: 'Programming Languages',
    dataScience: 'Data Science & ML',
    tools: 'Tools & Frameworks',
    soft: 'Soft Skills',
  },
};

// Contact Section Content
export const contactContent = {
  title: 'Get In Touch',
  subtitle: "Have a project in mind? Let's work together to create something amazing",
  leftSection: {
    title: 'Contact Me',
    description: "Feel free to reach out through any of these channels. I'm always open to discussing new projects and opportunities.",
  },
  form: {
    name: {
      label: 'Your Name',
      placeholder: 'John Doe',
    },
    email: {
      label: 'Your Email',
      placeholder: 'john@example.com',
    },
    subject: {
      label: 'Subject',
      placeholder: 'Project Inquiry',
    },
    message: {
      label: 'Message',
      placeholder: 'Tell me about your project...',
    },
    submit: 'Send Message',
    sending: 'Sending...',
  },
  messages: {
    success: 'Thank you! Your message has been sent successfully.',
    error: 'Oops! Something went wrong. Please try again or contact me directly.',
  },
};

// Projects Section Content
export const projectsContent = {
  featuredTitle: 'Featured Projects',
  allTitle: 'All Projects',
  subtitle: 'Showcasing latest work in data science and machine learning',
  allSubtitle: 'Displaying all {count} projects{category}',
  viewAllButton: 'View All Projects ({count})',
  showLessButton: 'Show Less',
  noProjects: 'No projects found in this category',
};

// Footer Section Content
export const footerContent = {
  quote: 'Data is the new oil. But like oil, data is useless unless refined.',
};

export default {
  personalInfo,
  socialLinks,
  projects,
  skills,
  experiences,
  education,
  certifications,
  stats,
  navLinks,
  projectCategories,
  heroTypingTexts,
  emailjsConfig,
  aboutContent,
  skillsContent,
  contactContent,
  projectsContent,
  footerContent,
};
