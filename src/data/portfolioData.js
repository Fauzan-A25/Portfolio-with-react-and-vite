// Portfolio Data — local source of truth.
//
// Google Sheets is the live source (see utils/fetchFromSheets.js); everything
// here is the fallback that ships with the build, so the site renders fully
// even when the API is unreachable. Keys the sheet does not provide — `proofs`,
// `proofKey`, `focus` — are only ever defined here.

export const personalInfo = {
  name: 'Fauzan Ahsanudin Alfikri',
  title: 'Data Science Student',
  subtitle: 'Machine Learning Enthusiast | Python Developer',
  tagline:
    'Passionate about turning data into insights and solving real-world problems through technology',
  university: 'Telkom University',
  location: 'Bandung, Indonesia',
  focus: 'NLP · Computer Vision · ML Pipelines',
  email: 'fauzanahsanudin@gmail.com',
  gpa: '3.8',
  cvLink: 'https://docs.google.com/document/d/1zm9N7lCHsZPCChdz5zjfQK4wogPMqb5g/',
  profileImage: '/images/Fauzan-slice.png',
};

export const socialLinks = {
  github: 'https://github.com/Fauzan-A25',
  linkedin: 'https://linkedin.com/in/fauzanahsanudin',
  instagram: 'https://instagram.com/fauzan_1718',
  email: 'mailto:fauzanahsanudin@gmail.com',
};

/**
 * Documents behind the claims made on the page. Keyed so About and
 * Certifications can both open the same lightbox entry.
 *
 * `match` links a proof to a certification row coming from Google Sheets,
 * where titles are phrased loosely ("Peserta GELAR RASA 2025" vs "GELAR RASA
 * 2025"). It is tested against the row's name + issuer + date combined.
 */
export const proofs = {
  'adikara-photo': {
    title: 'Penyerahan Juara 3 — Divisi Data Mining ADIKARA 2025',
    note: 'Ajang Digital Kreatif Mahasiswa Informatika 2025 · Telkom University',
    image: '/images/foto-menang-adikara.jpeg',
  },
  'adikara-cert': {
    title: 'Sertifikat Juara 3 Divisi Data Mining',
    note: 'No. 027/AKD6/IF-DEK/2026 · kode unik A25C0013',
    image: '/images/proof-adikara-certificate.jpeg',
  },
  teaching: {
    title: 'Asisten Dosen — Sistem Cerdas',
    note: 'Fakultas Informatika, Telkom University · 2026',
    image: '/images/proof-teaching.jpeg',
  },
  'findit-2025': {
    match: /find\s*it|data analyst competition/i,
    title: 'Data Analyst Competition FIND IT! 2025',
    note: 'KMTETI FT UGM · Peserta · Sleman, 17 Mei 2025',
    image: '/images/cert-findit-2025.jpeg',
  },
  compfest17: {
    match: /compfest\s*17|data analytics dash/i,
    title: 'Data Analytics Dash — COMPFEST 17',
    note: 'Universitas Indonesia · Participant · COMPFEST 17',
    image: '/images/cert-compfest17.jpeg',
  },
  'gelarrasa-2025': {
    match: /gelar\s*rasa[^0-9]*2025/i,
    title: 'GELAR RASA 2025',
    note: 'UPN “Veteran” Jawa Timur · Peserta · No. 655/UN63.7/TU/2025',
    image: '/images/cert-gelarrasa-2025.jpeg',
  },
  compfest16: {
    match: /compfest\s*16|senior competitive programming/i,
    title: 'Senior Competitive Programming — COMPFEST 16',
    note: 'Universitas Indonesia · Participant · COMPFEST 16',
    image: '/images/cert-compfest16.jpeg',
  },
  'gelarrasa-2024': {
    match: /gelar\s*rasa[^0-9]*2024/i,
    title: 'GELAR RASA 2024',
    note: 'UPN “Veteran” Jawa Timur · Peserta · No. 1846/UN63.7/2024',
    image: '/images/cert-gelarrasa-2024.jpeg',
  },
  'aiesec-2024': {
    match: /aiesec/i,
    title: 'Youth Today × Join AIESEC 2024',
    note: 'AIESEC in Bandung · Delegate · No. 1062/TM-BDG/C/X/2024',
    image: '/images/cert-aiesec-2024.jpeg',
  },
};

export const projects = [
  {
    id: 1,
    title: 'Fossil — Water Potability Prediction',
    description:
      'Streamlit ML app that predicts water potability from chemical and physical parameters using an MLPClassifier. 89% accuracy across 3,276 samples.',
    image: 'https://drive.google.com/thumbnail?id=1MNgX_ecN6bDlplqUxACGC-kCxn2VVL_b&sz=w800',
    technologies: ['Streamlit', 'Scikit-learn', 'Pandas'],
    category: 'Machine Learning',
    year: 2024,
    duration: '2 mo',
    teamSize: 3,
    githubUrl: 'https://github.com/Fauzan-A25/FOSSIL_GDGoC-TUBES',
    demoUrl: 'https://fossil-water-app.streamlit.app',
    featured: true,
  },
  {
    id: 2,
    title: 'COPPA Risk Prediction Model',
    description:
      'XGBoost model predicting COPPA violation risk in mobile apps, with SHAP for explainability. 92% accuracy across 10,000+ applications.',
    image: 'https://drive.google.com/thumbnail?id=15zIwGLfO5luTSJuBbaVzeusAXttw4dQC&sz=w800',
    technologies: ['XGBoost', 'SHAP', 'Seaborn'],
    category: 'Data Science',
    year: 2025,
    duration: '1 mo',
    teamSize: 1,
    githubUrl: 'https://github.com/Fauzan-A25/coppa-risk-prediction-findit2025-fauzan',
    demoUrl: null,
    featured: true,
  },
  {
    id: 3,
    title: 'Crowd Counting with CSRNet',
    description:
      'CSRNet in PyTorch for crowd density estimation on sparse and dense scenes. Trained on ShanghaiTech, MAE 68.2 on Part A.',
    image: 'https://drive.google.com/thumbnail?id=15j18nDquKe53cXk8P5EVYKpxtB701T0j&sz=w800',
    technologies: ['PyTorch', 'OpenCV', 'CUDA'],
    category: 'Computer Vision',
    year: 2025,
    duration: '1 wk',
    teamSize: 1,
    githubUrl: 'https://github.com/Fauzan-A25/crowd-counting-with-csrnet-competition-hology',
    demoUrl: null,
    featured: true,
  },
  {
    id: 4,
    title: 'GenZ Financial Literacy Dashboard',
    description:
      'React and Recharts analytics dashboard covering five literacy dimensions, with filtering across 38 Indonesian provinces and CSV export.',
    image: 'https://drive.google.com/thumbnail?id=1HjqCn7kwTuYcA7Td8NRWAJijQONhSmvn&sz=w800',
    technologies: ['TypeScript', 'Recharts', 'Zustand'],
    category: 'Data Visualization',
    year: 2025,
    duration: '1 mo',
    teamSize: 1,
    githubUrl: 'https://github.com/Fauzan-A25/dashboard-analisis-sigacorr',
    demoUrl: 'https://fauzan-a25.github.io/dashboard-analisis-sigacorr/',
    featured: true,
  },
  {
    id: 5,
    title: 'AstroClassify — Stellar Classification',
    description:
      'Classifies galaxies, stars, and quasars from SDSS spectral data with Random Forest, XGBoost, and LightGBM behind a Streamlit interface.',
    image: 'https://drive.google.com/thumbnail?id=1ff0HQZp-cSbtA7Z-5MMRYntikp09Ju7C&sz=w800',
    technologies: ['LightGBM', 'Streamlit', 'XGBoost'],
    category: 'Machine Learning',
    year: 2024,
    duration: '2 mo',
    teamSize: 2,
    githubUrl: 'https://github.com/Fauzan-A25/AstroClassify',
    demoUrl: null,
    featured: true,
  },
  {
    id: 6,
    title: 'Smart Face Anti-Spoofing',
    description:
      'Liveness detection against printed photos, screen replays, and masks, with live webcam inference for facial recognition pipelines.',
    image: 'https://drive.google.com/thumbnail?id=1yX95ip3J-i-XqxZX4Q4qmucjNuG8V0BP&sz=w800',
    technologies: ['PyTorch', 'OpenCV', 'NumPy'],
    category: 'Computer Vision',
    year: 2025,
    duration: '2 mo',
    teamSize: 2,
    githubUrl: 'https://github.com/FaarisKhairrudin/Smart-Face-AntiSpoofing',
    demoUrl: null,
    featured: true,
  },
  {
    id: 7,
    title: 'Pacific Data Viz — Climate & Disasters',
    description:
      'Interactive visual narrative on climate risk across Pacific Island nations using Pacific Data Hub open data, built for the Pacific Dataviz Challenge.',
    image: 'https://drive.google.com/thumbnail?id=1fuV_ZSnRbq31JD96f_cGES5RXrgyvNl-&sz=w800',
    technologies: ['D3.js', 'Plotly', 'Pandas'],
    category: 'Data Visualization',
    year: 2025,
    duration: '3 mo',
    teamSize: 1,
    githubUrl:
      'https://github.com/Fauzan-A25/Pacific-Data-Viz-challenge_Climate-Change-And-Disasters',
    demoUrl: null,
    featured: true,
  },
];

export const skills = {
  programming: [
    { name: 'Python', yearsOfExperience: 3, description: 'ML, data analysis, backend' },
    { name: 'JavaScript', yearsOfExperience: 2, description: 'React, Node.js' },
    { name: 'TypeScript', yearsOfExperience: 1, description: 'Typed React dashboards' },
    { name: 'Go', yearsOfExperience: 1, description: 'Services and tooling' },
    { name: 'C++', yearsOfExperience: 1, description: 'Competitive programming' },
    { name: 'Dart', yearsOfExperience: 1, description: 'Flutter apps' },
  ],
  dataScience: [
    { name: 'PyTorch', yearsOfExperience: 2, description: 'Research models, fine-tuning' },
    { name: 'Natural Language Processing', yearsOfExperience: 2, description: 'NER, argument mining' },
    { name: 'Deep Learning', yearsOfExperience: 2, description: 'CNNs and transformers' },
    { name: 'Machine Learning', yearsOfExperience: 2, description: 'Classical ML pipelines' },
    { name: 'Data Analysis', yearsOfExperience: 2, description: 'Pandas, statistical evaluation' },
    { name: 'Neural Network', yearsOfExperience: 2, description: 'Architecture design' },
    { name: 'Named Entity Recognition', yearsOfExperience: 1, description: 'Sequence labelling' },
    { name: 'Argument Mining', yearsOfExperience: 1, description: 'Discourse structure' },
  ],
  tools: [
    { name: 'Linux', yearsOfExperience: 3, description: 'Daily driver, servers' },
    { name: 'Git', yearsOfExperience: 2, description: 'Version control, collaboration' },
    { name: 'Docker', yearsOfExperience: 1, description: 'Reproducible ML environments' },
    { name: 'Data Management', yearsOfExperience: 2, description: 'Collection and reporting' },
    { name: 'Video Production', yearsOfExperience: 2, description: 'Organisational content' },
    { name: 'Video Editing', yearsOfExperience: 2, description: 'Post-production' },
  ],
  soft: [
    { name: 'Leadership', yearsOfExperience: 3, description: 'Department and team lead' },
    { name: 'Teamwork', yearsOfExperience: 3, description: 'Cross-division collaboration' },
    { name: 'Communication', yearsOfExperience: 3, description: 'Public relations, teaching' },
    { name: 'Problem Solving', yearsOfExperience: 3, description: 'Analytical thinking' },
    { name: 'Event Management', yearsOfExperience: 2, description: 'Committee coordination' },
  ],
};

export const experiences = [
  {
    id: 1,
    title: 'Asisten Laboratorium NLP',
    company: 'Universitas Telkom',
    companyUrl: 'https://telkomuniversity.ac.id',
    location: 'Bandung',
    period: 'Dec 2024 — Present',
    duration: '1 yr 6 mos',
    type: 'Part-time',
    description:
      'Membimbing mahasiswa Sains Data dalam NLP menggunakan Python dan PyTorch. Fokus pada NER, Argument Mining, dan Neural Network.',
    responsibilities: ['Membimbing praktikum NLP', 'Mengembangkan proyek penelitian NER'],
    technologies: ['Python', 'PyTorch', 'NLP', 'NER'],
  },
  {
    id: 2,
    title: 'Steering Committee (Pendataan)',
    company: 'PRADA Telkom University',
    location: 'Bandung',
    period: 'Sep 2025 — Present',
    duration: '9 mos',
    type: 'Organization',
    description:
      'Berperan sebagai pengawas dan penasihat strategis dalam sistem pendataan kegiatan PRADA Telkom University.',
    responsibilities: [],
    technologies: [],
  },
  {
    id: 3,
    title: 'Brand Sales Officer',
    company: 'PT Bank Muamalat Indonesia',
    companyUrl: 'https://www.bankmuamalat.co.id',
    location: '',
    period: 'Jun 2025 — Aug 2025',
    duration: '3 mos',
    type: 'Internship',
    description: 'Mendukung tim sales dalam menawarkan produk perbankan syariah.',
    responsibilities: [],
    technologies: [],
  },
  {
    id: 4,
    title: 'Head of Public Relations',
    company: 'PRADA Telkom University',
    location: 'Bandung',
    period: 'Dec 2024 — Jun 2025',
    duration: '7 mos',
    type: 'Organization',
    description:
      'Memimpin Humas untuk Idul Adha PRADA 1446 H. Koordinasi komunikasi, dokumentasi, dan publikasi acara.',
    responsibilities: [],
    technologies: [],
  },
  {
    id: 5,
    title: 'Kader PSDM & Kader Media',
    company: 'Al-Fath Universitas Telkom',
    location: 'Bandung',
    period: 'Nov 2023 — Feb 2026',
    duration: '2 yrs 4 mos',
    type: 'Organization',
    description:
      'Kader PSDM (Jan 2025 – Feb 2026) dan Kader Media (Nov 2023 – Jan 2025). Bertanggung jawab atas pengembangan SDM serta produksi konten video.',
    responsibilities: [],
    technologies: ['Video Production', 'Video Editing'],
  },
  {
    id: 6,
    title: 'Active Member — GDGoC',
    company: 'GDGoC Telkom University',
    location: 'Bandung',
    period: 'Dec 2024 — Jun 2025',
    duration: '7 mos',
    type: 'Organization',
    description:
      'Anggota aktif GDGoC Telkom University. Berpartisipasi dalam workshop dan proyek teknologi Google.',
    responsibilities: [],
    technologies: [],
  },
  {
    id: 7,
    title: 'Organizing Committee & Data Manager',
    company: 'ISLAH Telkom University',
    location: 'Bandung',
    period: 'Jul 2024 — Nov 2024',
    duration: '5 mos',
    type: 'Organization',
    description:
      'Panitia Penyelenggara dan Manajer Data untuk Evodis Islah 1 2024. Mengelola pendataan dan pelaporan peserta.',
    responsibilities: ['Mengelola pendataan peserta', 'Koordinasi acara'],
    technologies: [],
  },
  {
    id: 8,
    title: 'Anggota Divisi Pendataan',
    company: 'PMB 2024',
    location: 'Bandung',
    period: 'Jul 2024 — Oct 2024',
    duration: '4 mos',
    type: 'Committee',
    description: 'Mengumpulkan dan mengelola data peserta untuk acara PMB 2024.',
    responsibilities: [],
    technologies: [],
  },
];

export const education = [
  {
    id: 1,
    degree: 'S1 Sains Data',
    institution: 'Telkom University',
    period: '2023 — Present',
    location: 'Bandung, Indonesia',
    relevantCourses: [
      'Machine Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Statistika',
      'Basis Data',
    ],
  },
];

export const certifications = [
  {
    id: 1,
    name: 'Data Analyst Competition FIND IT! 2025',
    issuer: 'KMTETI FT UGM',
    role: 'Peserta',
    date: '17 Mei 2025',
    credentialId: 'N/A',
    proofKey: 'findit-2025',
    url: null,
  },
  {
    id: 2,
    name: 'Data Analytics Dash — COMPFEST 17',
    issuer: 'Universitas Indonesia',
    role: 'Participant',
    date: '2025',
    credentialId: 'N/A',
    proofKey: 'compfest17',
    url: null,
  },
  {
    id: 3,
    name: 'GELAR RASA 2025',
    issuer: 'UPN “Veteran” Jawa Timur',
    role: 'Peserta',
    date: '2025',
    credentialId: '655/UN63.7/TU/2025',
    proofKey: 'gelarrasa-2025',
    url: null,
  },
  {
    id: 4,
    name: 'Senior Competitive Programming — COMPFEST 16',
    issuer: 'Universitas Indonesia',
    role: 'Participant',
    date: '2024',
    credentialId: 'N/A',
    proofKey: 'compfest16',
    url: null,
  },
  {
    id: 5,
    name: 'GELAR RASA 2024',
    issuer: 'UPN “Veteran” Jawa Timur',
    role: 'Peserta',
    date: '2024',
    credentialId: '1846/UN63.7/2024',
    proofKey: 'gelarrasa-2024',
    url: null,
  },
  {
    id: 6,
    name: 'Youth Today × Join AIESEC 2024',
    issuer: 'AIESEC in Bandung',
    role: 'Delegate',
    date: '2024',
    credentialId: '1062/TM-BDG/C/X/2024',
    proofKey: 'aiesec-2024',
    url: null,
  },
  {
    id: 7,
    name: 'MySkill Certified: Inline Elements',
    issuer: 'MySkill',
    role: '',
    date: 'N/A',
    credentialId: 'N/A',
    proofKey: null,
    url: null,
  },
  {
    id: 8,
    name: 'Belajar Dasar AI',
    issuer: 'Online learning',
    role: '',
    date: 'N/A',
    credentialId: 'N/A',
    proofKey: null,
    url: null,
  },
];

export const stats = [
  { value: '15+', label: 'Projects shipped' },
  { value: '5+', label: 'Competitions' },
  { value: '25', label: 'Tracked skills' },
];

export const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'certifications', label: 'Certificates', href: '#certifications' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const projectCategories = [
  'All',
  'Machine Learning',
  'Data Science',
  'Computer Vision',
  'Data Visualization',
];

export const heroTypingTexts = [
  'Machine Learning Enthusiast',
  'Python Developer',
  'NLP Research Assistant',
];

export const emailjsConfig = {
  serviceId: 'service_e0byds5',
  templateId: 'template_jtsltyj',
  publicKey: '_RI8Nk23mYc9B8ZeX',
};

export const aboutContent = {
  paragraphs: [
    {
      id: 1,
      text: 'Third-year undergraduate student of Data Science at {university} specializing in Machine Learning, Natural Language Processing (NLP), and Computer Vision. Currently serving as a Teaching Assistant for the Sistem Cerdas course, demonstrating strong academic leadership, excellent attention to detail, and a solid foundation in intelligent systems.',
    },
    {
      id: 2,
      text: 'Proficient in Python, C++, and SQL with hands-on experience building end-to-end ML pipelines using MLflow and Docker. Proven track record in data science competitions, including securing 3rd Place in the Data Mining Division at ADIKARA 2025. A collaborative team player dedicated to delivering accurate data insights and impactful predictive analytics solutions.',
    },
  ],
  highlights: [
    {
      id: 1,
      text: 'Award-winning data mining competitor (3rd Place ADIKARA 2025)',
      proofKey: 'adikara-cert',
      proofLabel: 'Sertifikat',
    },
    {
      id: 2,
      text: 'Expertise in NLP, Computer Vision, and end-to-end ML pipelines',
      link: 'projects',
      linkLabel: '7 proyek',
    },
    {
      id: 3,
      text: 'Academic leadership as a Teaching Assistant — Sistem Cerdas, 2026',
      proofKey: 'teaching',
      proofLabel: 'Dokumentasi',
    },
  ],
};

export const skillsContent = {
  title: 'Skills & Expertise',
  subtitle:
    'Technologies and tools I work with, measured by years of hands-on experience.',
  categoryTitles: {
    programming: 'Programming Languages',
    dataScience: 'Data Science & ML',
    tools: 'Tools & Frameworks',
    soft: 'Soft Skills',
  },
};

export const contactContent = {
  title: 'Get in touch',
  subtitle: "Have a project in mind? Let's work together to create something amazing",
  leftSection: {
    title: 'Contact Me',
    description:
      "Have a project in mind? Feel free to reach out through any of these channels. I'm always open to discussing new projects and opportunities.",
  },
  form: {
    name: { label: 'Your name', placeholder: 'John Doe' },
    email: { label: 'Your email', placeholder: 'john@example.com' },
    subject: { label: 'Subject', placeholder: 'Project Inquiry' },
    message: { label: 'Message', placeholder: 'Tell me about your project...' },
    submit: 'Send message',
    sending: 'Sending…',
  },
  messages: {
    success: 'Thank you! Your message has been sent successfully.',
    error: 'Oops! Something went wrong. Please try again or contact me directly.',
  },
};

export const projectsContent = {
  featuredTitle: 'Featured Projects',
  allTitle: 'All Projects',
  subtitle: 'Showcasing latest work in data science and machine learning.',
  noProjects: 'No projects found in this category',
};

export const footerContent = {
  quote: 'Data is the new oil. But like oil, data is useless unless refined.',
};

const portfolioData = {
  personalInfo,
  socialLinks,
  proofs,
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

export default portfolioData;
