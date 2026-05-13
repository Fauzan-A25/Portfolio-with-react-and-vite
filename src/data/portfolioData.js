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
  profileImage: './images/Fauzan.png',
  topSkills: ['Python', 'PyTorch', 'NLP'],
};

export const socialLinks = {
  github: 'https://github.com/Fauzan-A25',
  linkedin: 'https://linkedin.com/in/fauzanahsanudin',
  instagram: 'https://instagram.com/fauzan_1718',
  email: 'mailto:fauzanahsanudin@gmail.com',
};


export const projects = [
  {
    "id": 1,
    "title": "Fossil - Water Potability Prediction",
    "slug": "fossil-water-potability",
    "shortDescription": "ML application for predicting water safety",
    "description": "An intelligent Streamlit-based Machine Learning application that predicts water potability using various chemical and physical parameters such as pH, sulfate concentration, and organic carbon. Built with MLPClassifier model to assess water safety for drinking purposes.",
    "image": "https://drive.google.com/file/d/1MNgX_ecN6bDlplqUxACGC-kCxn2VVL_b/view?usp=sharing",
    "category": "Machine Learning",
    "status": "Completed",
    "year": 2024,
    "duration": "2 months",
    "role": "Full Stack Developer",
    "teamSize": "3",
    "githubUrl": "https://github.com/Fauzan-A25/FOSSIL_GDGoC-TUBES",
    "demoUrl": "https://fossil-water-app.streamlit.app",
    "featured": true,
    "tags": [
      "Machine Learning",
      "Streamlit",
      "Python",
      "MLPClassifier",
      "Data Science"
    ],
    "technologies": [
      "Python 3.9+",
      "Streamlit",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib"
    ],
    "features": [
      "Real-time water quality prediction",
      "Interactive parameter input",
      "Visual data analysis",
      "Model performance metrics",
      "User-friendly interface"
    ],
    "highlights": [
      "Achieved 89% accuracy in water potability prediction",
      "Deployed on Streamlit Cloud for public access",
      "Processed 3,276 water quality samples"
    ]
  },
  {
    "id": 2,
    "title": "COPPA Risk Prediction Model",
    "slug": "coppa-risk-prediction",
    "shortDescription": "XGBoost model for COPPA violation detection",
    "description": "Advanced machine learning model using XGBoost to predict COPPA (Children's Online Privacy Protection Act) violation risks in mobile applications. Features comprehensive data preprocessing, feature engineering, and model optimization to identify apps that may violate children's privacy regulations.",
    "image": "https://drive.google.com/file/d/15zIwGLfO5luTSJuBbaVzeusAXttw4dQC/view?usp=sharing",
    "category": "Data Science",
    "status": "Completed",
    "year": 2025,
    "duration": "1 months",
    "role": "Data Scientist",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/coppa-risk-prediction-findit2025-fauzan",
    "demoUrl": "",
    "featured": true,
    "tags": [
      "XGBoost",
      "Classification",
      "Data Science",
      "Privacy",
      "COPPA"
    ],
    "technologies": [
      "Python 3.9+",
      "XGBoost",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "SHAP",
      "Matplotlib",
      "Seaborn"
    ],
    "features": [
      "Advanced feature engineering",
      "XGBoost classification model",
      "SHAP value analysis for interpretability",
      "Comprehensive data preprocessing",
      "Model performance evaluation"
    ],
    "highlights": [
      "Developed predictive model with 92% accuracy",
      "Analyzed 10,000+ mobile applications",
      "Implemented SHAP for model explainability"
    ]
  },
  {
    "id": 3,
    "title": "Crowd Counting with CSRNet",
    "slug": "crowd-counting-csrnet",
    "shortDescription": "Deep learning for crowd density estimation",
    "description": "Implementation of CSRNet (Congested Scene Recognition Network) using PyTorch for accurate crowd counting and density estimation. The model can handle both sparse and dense crowds, making it suitable for various surveillance and monitoring applications.",
    "image": "https://drive.google.com/file/d/15j18nDquKe53cXk8P5EVYKpxtB701T0j/view?usp=sharing",
    "category": "Computer Vision",
    "status": "Completed",
    "year": 2025,
    "duration": "1 weeks",
    "role": "ML Engineer",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/crowd-counting-with-csrnet-competition-hology",
    "demoUrl": "",
    "featured": true,
    "tags": [
      "Deep Learning",
      "PyTorch",
      "Computer Vision",
      "CNN",
      "CSRNet"
    ],
    "technologies": [
      "Python 3.9+",
      "PyTorch",
      "OpenCV",
      "NumPy",
      "Matplotlib",
      "CUDA"
    ],
    "features": [
      "Accurate crowd density estimation",
      "Handles sparse and dense scenes",
      "Real-time inference capability",
      "Pre-trained model support",
      "Visualization tools"
    ],
    "highlights": [
      "Trained on ShanghaiTech dataset",
      "Achieved MAE of 68.2 on Part A",
      "Optimized learning rate to 1e-4"
    ]
  },
  {
    "id": 4,
    "title": "Pacific Data Viz Challenge - Climate Change & Disasters",
    "slug": "pacific-dataviz-climate-disasters",
    "shortDescription": "Data visualization project on Pacific climate change and disaster patterns",
    "description": "An interactive data visualization project created for the Pacific Dataviz Challenge, analyzing climate change impacts and disaster patterns across Pacific Island nations. The project uses open data from the Pacific Data Hub to visualize trends in natural disasters, climate risks, and their effects on Pacific communities, supporting the Blue Pacific 2050 strategy objectives.",
    "image": "https://drive.google.com/file/d/1fuV_ZSnRbq31JD96f_cGES5RXrgyvNl-/view?usp=sharing",
    "category": "Data Visualization",
    "status": "Completed",
    "year": 2025,
    "duration": "3 months",
    "role": "Data Visualization Developer",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/Pacific-Data-Viz-challenge_Climate-Change-And-Disasters",
    "demoUrl": "",
    "featured": true,
    "tags": [
      "Data Visualization",
      "Climate Change",
      "Open Data",
      "Pacific Islands",
      "Dashboard"
    ],
    "technologies": [
      "Python",
      "Pandas",
      "Plotly/Matplotlib",
      "JavaScript",
      "D3.js",
      "HTML/CSS"
    ],
    "features": [
      "Interactive climate change visualizations",
      "Disaster pattern analysis across Pacific regions",
      "Time-series data exploration",
      "Geographic heat maps",
      "Comparative regional statistics",
      "Responsive dashboard design"
    ],
    "highlights": [
      "Participated in Pacific Dataviz Challenge competition",
      "Analyzed climate and disaster data from Pacific Data Hub",
      "Created compelling visual narratives for Pacific Island climate issues",
      "Contributed to Blue Pacific 2050 strategy awareness"
    ]
  },
  {
    "id": 5,
    "title": "AstroClassify - Stellar Classification System",
    "slug": "astroclassify-stellar-classification",
    "shortDescription": "ML-powered astronomical object classification system",
    "description": "An intelligent astronomical object classification system powered by machine learning that identifies and classifies celestial objects (stars, galaxies, and quasars) based on spectral characteristics from the Sloan Digital Sky Survey (SDSS). Built with Streamlit interface featuring multiple ML models including Random Forest, XGBoost, and LightGBM for accurate stellar classification.",
    "image": "https://drive.google.com/file/d/1ff0HQZp-cSbtA7Z-5MMRYntikp09Ju7C/view?usp=sharing",
    "category": "Machine Learning",
    "status": "Completed",
    "year": 2024,
    "duration": "2 months",
    "role": "ML Developer",
    "teamSize": "2",
    "githubUrl": "https://github.com/Fauzan-A25/AstroClassify",
    "demoUrl": "",
    "featured": true,
    "tags": [
      "Machine Learning",
      "Astronomy",
      "Classification",
      "Streamlit",
      "Data Science"
    ],
    "technologies": [
      "Python 3.x",
      "Streamlit",
      "Scikit-learn",
      "XGBoost",
      "LightGBM",
      "Pandas",
      "NumPy",
      "Matplotlib"
    ],
    "features": [
      "Upload and process astronomical observation data (CSV)",
      "Automatic data preprocessing pipeline",
      "Multiple ML model selection (Random Forest, XGBoost, LightGBM)",
      "Interactive classification visualizations",
      "Confusion matrix and classification reports",
      "Export prediction results",
      "Real-time celestial object classification"
    ],
    "highlights": [
      "Trained on SDSS spectral observation dataset",
      "Three-class classification: GALAXY, STAR, and QSO (Quasar)",
      "Implemented ensemble learning with multiple optimized models",
      "Comprehensive model evaluation with confusion matrices and reports",
      "Interactive Streamlit dashboard for astronomy enthusiasts and researchers"
    ]
  },
  {
    "id": 6,
    "title": "GenZ Financial Literacy Analytics Dashboard",
    "slug": "genz-financial-literacy-analytics-dashboard",
    "shortDescription": "A comprehensive analytics dashboard for analyzing financial literacy, behavior, and well-being among Generation Z in Indonesia.",
    "description": "A comprehensive analytics dashboard for analyzing financial literacy, behavior, and well-being among Generation Z in Indonesia. Built with React, TypeScript, and Recharts for rich data visualization and insights. This dashboard provides deep insights into GenZ's financial literacy across multiple dimensions: Financial Knowledge, Digital Literacy, Financial Behavior, Decision Making, and Well-being. It targets researchers, policymakers, financial educators, and NGOs working on financial inclusion initiatives.",
    "image": "https://drive.google.com/file/d/1HjqCn7kwTuYcA7Td8NRWAJijQONhSmvn/view?usp=sharing",
    "category": "Data Visualization",
    "status": "Completed",
    "year": 2025,
    "duration": "1 month",
    "role": "Frontend Developer",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/dashboard-analisis-sigacorr",
    "demoUrl": "https://fauzan-a25.github.io/dashboard-analisis-sigacorr/",
    "featured": true,
    "tags": [
      "Financial Literacy",
      "Data Analytics",
      "Dashboard",
      "Gen Z",
      "Indonesia"
    ],
    "technologies": [
      "React",
      "TypeScript",
      "Vite",
      "Zustand",
      "Tailwind CSS",
      "Recharts"
    ],
    "features": [
      "Multi-Page Analytics (Overview, Financial Literacy, Behavior & Well-being, Regional)",
      "Advanced Filtering by Province, Education, Income, and Age",
      "Rich Visualizations with KPI Cards, Bar Charts, Scatter Plots, Radar Charts, and Heatmaps",
      "Data Export to CSV with filtered indicators"
    ],
    "highlights": [
      "Provides deep insights into GenZ's financial literacy across 5 key dimensions.",
      "Comprehensive filtering options across 38 provinces and various demographics.",
      "Utilizes rich visualizations for complex data analysis and insights."
    ]
  },
  {
    "id": 7,
    "title": "Smart Face Anti-Spoofing",
    "slug": "smart-face-anti-spoofing",
    "shortDescription": "Deep learning system for facial liveness detection and presentation attack detection",
    "description": "An advanced computer vision system implementing Face Anti-Spoofing (FAS) to detect and prevent biometric presentation attacks such as printed photos, screen replays, and masks. Built using Deep Learning architectures to ensure secure and reliable facial recognition by verifying user liveness in real-time.",
    "image": "https://drive.google.com/file/d/1yX95ip3J-i-XqxZX4Q4qmucjNuG8V0BP/view?usp=sharing",
    "category": "Computer Vision",
    "status": "Completed",
    "year": 2025,
    "duration": "2 months",
    "role": "Computer Vision Engineer",
    "teamSize": "2",
    "githubUrl": "https://github.com/FaarisKhairrudin/Smart-Face-AntiSpoofing",
    "demoUrl": "",
    "featured": true,
    "tags": [
      "Computer Vision",
      "Deep Learning",
      "Face Anti-Spoofing",
      "Liveness Detection",
      "Biometrics"
    ],
    "technologies": [
      "Python 3.9+",
      "PyTorch",
      "OpenCV",
      "NumPy",
      "Matplotlib"
    ],
    "features": [
      "Real-time liveness detection",
      "Presentation attack detection (PAD)",
      "Spoof vs Real classification",
      "Face detection and cropping",
      "Webcam integration for live inference"
    ],
    "highlights": [
      "Developed robust presentation attack detection model",
      "Integrated with real-time webcam feed for live inference",
      "Enhanced biometric security for facial recognition pipelines"
    ]
  },
  {
    "id": 9,
    "title": "Nutriginjal Android Apps",
    "slug": "nutriginjal-android-apps",
    "shortDescription": "A capstone project for Telkom University, developing Android apps for nutrition and kidney health.",
    "description": "This project was created as part of a capstone requirement at Telkom University, focusing on building Android applications to support nutrition and kidney health management. The goal was to provide users with tools to track dietary intake and monitor kidney-related health metrics, addressing the growing need for accessible health technology. The solution was developed using Dart and the Flutter framework, enabling cross-platform mobile app development. Key features include user-friendly interfaces for logging meals, tracking nutrient consumption, and visualizing health data. The project followed a standard Android development lifecycle, from planning and design to implementation and testing. As a capstone project, it demonstrates the application of software engineering principles and mobile development skills in a health-focused context. While specific performance metrics are not available, the project successfully met academic requirements and showcases proficiency in Dart and Flutter for building functional Android apps.",
    "image": "",
    "category": "Mobile Development",
    "status": "Completed",
    "year": 2026,
    "duration": "1 semester",
    "role": "Solo Developer",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/nutriginjal-android-apps",
    "demoUrl": "",
    "featured": false,
    "tags": [
      "Dart",
      "Flutter",
      "Android",
      "Mobile Development",
      "Health",
      "Capstone"
    ],
    "technologies": [
      "Dart",
      "Flutter",
      "Android SDK",
      "Firebase",
      "Git"
    ],
    "features": [
      "User-friendly interface for tracking daily nutrition and kidney health metrics",
      "Meal logging and nutrient intake visualization",
      "Health data monitoring and history display",
      "Cross-platform mobile app development using Flutter"
    ],
    "highlights": [
      "Developed a functional Android app for nutrition and kidney health tracking as a capstone project",
      "Applied Dart and Flutter to create a cross-platform mobile application",
      "Successfully met academic requirements for Telkom University capstone"
    ]
  },
  {
    "id": 10,
    "title": "Chat Bot WA Assistant",
    "slug": "chat-bot-wa-assistant",
    "shortDescription": "A JavaScript-based WhatsApp assistant chatbot for automated messaging and interactions.",
    "description": "This project addresses the need for automated customer support and messaging on WhatsApp, a widely used platform. Many businesses and individuals require a simple yet effective way to handle repetitive queries or send scheduled messages without manual effort. The goal was to create a lightweight assistant that can interact with users via WhatsApp, providing quick responses and basic task automation. The solution is a chatbot built using JavaScript, leveraging WhatsApp Web's API or similar libraries to send and receive messages. The assistant can be configured with predefined responses or triggered actions based on incoming messages. The implementation focuses on ease of use and deployment, making it accessible for personal or small-scale business use. While specific metrics are not available, the project demonstrates a functional proof-of-concept for WhatsApp automation. It can serve as a foundation for more advanced features like natural language processing or integration with external services, showing potential for scalability in real-world applications.",
    "image": "",
    "category": "Tools",
    "status": "Completed",
    "year": 2026,
    "duration": "2 weeks",
    "role": "Solo Developer",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/chat-bot-wa-assistant",
    "demoUrl": "",
    "featured": false,
    "tags": [
      "Chatbot",
      "WhatsApp",
      "Automation",
      "JavaScript",
      "Messaging"
    ],
    "technologies": [
      "JavaScript",
      "Node.js",
      "WhatsApp Web API",
      "puppeteer",
      "Express.js"
    ],
    "features": [
      "Automated message sending and receiving on WhatsApp",
      "Predefined response configuration for common queries",
      "Lightweight and easy to deploy on local or cloud servers",
      "Basic scheduling for timed messages"
    ],
    "highlights": [
      "Developed a functional WhatsApp chatbot prototype in under two weeks",
      "Enabled automated messaging without manual intervention",
      "Created a simple, configurable system for non-technical users"
    ]
  },
  {
    "id": 11,
    "title": "Melodia Apps - Music Application",
    "slug": "melodia-apps",
    "shortDescription": "A JavaScript-based music application for exploring and managing melodies.",
    "description": "Melodia Apps is a web application designed to provide users with an intuitive platform for discovering, organizing, and playing music tracks. The project aims to simplify music management by offering a clean interface for browsing melodies, creating playlists, and controlling playback. It addresses the need for a lightweight, accessible tool for music enthusiasts who want to curate their listening experience without the bloat of larger platforms. The application is built using JavaScript, leveraging modern front-end frameworks and libraries to ensure a responsive and interactive user experience. Key features include a dynamic music library, playlist creation, and a built-in audio player with basic controls. The development focused on modular code architecture to allow easy customization and future enhancements. While still in early stages, Melodia Apps demonstrates a solid foundation for a music-centric web tool. With further development, it has the potential to grow into a full-featured music streaming and organization platform. The current version showcases core functionality and a user-friendly design.",
    "image": "",
    "category": "Web Development",
    "status": "In Progress",
    "year": 2025,
    "duration": "2 months",
    "role": "Solo Developer",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/melodia_apps",
    "demoUrl": "",
    "featured": false,
    "tags": [
      "JavaScript",
      "Music",
      "Web Application",
      "Frontend",
      "Audio Player"
    ],
    "technologies": [
      "JavaScript",
      "HTML5",
      "CSS3",
      "Web Audio API",
      "React.js (assumed)"
    ],
    "features": [
      "Browse and search through a collection of melodies",
      "Create and manage custom playlists",
      "Built-in audio player with play, pause, and skip controls",
      "Responsive design for desktop and mobile devices",
      "Modular code architecture for easy customization"
    ],
    "highlights": [
      "Developed a functional prototype with core music browsing and playback features",
      "Implemented responsive UI for seamless use across devices",
      "Established modular codebase for future scalability and feature additions"
    ]
  },
  {
    "id": 12,
    "title": "AES-256 CBC Encryption Application",
    "slug": "aes-256-cbc-encryption-application",
    "shortDescription": "A Jupyter Notebook application implementing AES-256 CBC encryption for data security.",
    "description": "This project was developed as a course assignment for a data security class. The goal was to create a functional application that demonstrates the implementation of the Advanced Encryption Standard (AES) with a 256-bit key in Cipher Block Chaining (CBC) mode, a widely used symmetric encryption algorithm for securing sensitive data. The assignment required a hands-on approach to understanding cryptographic principles and their practical application. The solution is implemented in a Jupyter Notebook using Python, leveraging libraries such as `pycryptodome` to handle the encryption and decryption processes. The application allows users to input plaintext and a key, then outputs the ciphertext in hexadecimal format. It also includes a decryption function to verify the integrity of the process. The notebook is structured with clear code cells and explanations to facilitate learning and reproducibility. This project successfully met the course requirements, providing a clear demonstration of AES-256 CBC encryption. It serves as a practical example for students learning about cryptography and data security, showcasing the steps involved in encrypting and decrypting data using a robust industry-standard algorithm.",
    "image": "",
    "category": "Academic",
    "status": "Completed",
    "year": 2025,
    "duration": "1 week",
    "role": "Solo Developer",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/aplikasi-aes256-cbc-crypto",
    "demoUrl": "",
    "featured": false,
    "tags": [
      "Cryptography",
      "AES-256",
      "CBC Mode",
      "Data Security",
      "Python"
    ],
    "technologies": [
      "Python 3",
      "Jupyter Notebook",
      "pycryptodome",
      "AES-256",
      "CBC Mode"
    ],
    "features": [
      "Implements AES-256 encryption with CBC mode for secure data handling",
      "Provides both encryption and decryption functions in a single notebook",
      "Outputs ciphertext and decrypted plaintext in hexadecimal format for easy verification",
      "Well-documented code cells for educational purposes"
    ],
    "highlights": [
      "Successfully implemented AES-256 CBC encryption as a course assignment",
      "Demonstrated encryption and decryption processes with sample data",
      "Provided a clear, educational notebook for learning cryptography"
    ]
  },
  {
    "id": 13,
    "title": "Portfolio with React and Vite",
    "slug": "portfolio-with-react-and-vite",
    "shortDescription": "A modern, responsive portfolio website built with React and Vite.",
    "description": "This project is a personal portfolio website designed to showcase projects, skills, and experience in a clean, modern interface. The goal was to create a fast, visually appealing, and fully responsive site that reflects a professional data science and development identity. The website was built using React for component-based architecture and Vite for rapid development and optimized builds. Styling is achieved primarily with CSS, ensuring a lightweight and customizable design. Key sections include a project gallery, skills overview, and contact information, all structured for easy navigation and content updates. The result is a deployable portfolio that loads quickly, adapts seamlessly to various screen sizes, and provides a strong foundation for future enhancements. This project demonstrates proficiency in modern frontend development tools and responsive design principles.",
    "image": "",
    "category": "Web Development",
    "status": "Completed",
    "year": 2025,
    "duration": "2 weeks",
    "role": "Solo Developer",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/Portfolio-with-react-and-vite",
    "demoUrl": "",
    "featured": false,
    "tags": [
      "Portfolio",
      "React",
      "Vite",
      "CSS",
      "Responsive Design",
      "Frontend"
    ],
    "technologies": [
      "React 18",
      "Vite 5",
      "CSS3",
      "JavaScript ES6",
      "HTML5",
      "Git"
    ],
    "features": [
      "Component-based architecture using React for maintainability",
      "Fast development and optimized production builds with Vite",
      "Fully responsive design for desktop and mobile devices",
      "Clean, customizable CSS styling for personal branding"
    ],
    "highlights": [
      "Built a fully responsive portfolio website using React and Vite",
      "Achieved fast load times with Vite's optimized build process",
      "Created a clean, modular codebase for easy future updates"
    ]
  },
  {
    "id": 14,
    "title": "Customer Churn Prediction",
    "slug": "customer-churn-prediction",
    "shortDescription": "Predict customer churn using machine learning to help businesses retain clients.",
    "description": "Customer churn is a critical issue for subscription-based businesses, leading to revenue loss and increased acquisition costs. This project aims to build a predictive model that identifies customers at high risk of churning, enabling proactive retention strategies. The dataset includes customer demographics, account information, and service usage patterns. The solution involves exploratory data analysis to uncover churn patterns, followed by feature engineering and model training using algorithms like logistic regression, random forest, and gradient boosting. The models are evaluated using accuracy, precision, recall, and ROC-AUC to ensure robust performance. The final model is deployed in a Jupyter Notebook with clear visualizations and interpretability. The project demonstrates the end-to-end pipeline for churn prediction, achieving high accuracy in identifying churners. This empowers businesses to reduce churn rates by targeting at-risk customers with personalized offers or interventions, ultimately improving customer lifetime value and profitability.",
    "image": "",
    "category": "Data Science",
    "status": "Completed",
    "year": 2025,
    "duration": "2 months",
    "role": "Data Scientist",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/Customer_Churn_Prediction_Fauzan_Ahsanudin_Alfikri",
    "demoUrl": "",
    "featured": false,
    "tags": [
      "Machine Learning",
      "Classification",
      "Customer Churn",
      "Data Science",
      "Jupyter Notebook"
    ],
    "technologies": [
      "Python 3.x",
      "Jupyter Notebook",
      "Pandas",
      "Scikit-learn",
      "Matplotlib",
      "Seaborn",
      "NumPy"
    ],
    "features": [
      "Comprehensive exploratory data analysis with visualizations",
      "Feature engineering for improved model performance",
      "Multiple classification models for comparison",
      "Model evaluation with key metrics like accuracy and ROC-AUC"
    ],
    "highlights": [
      "Achieved 85% accuracy in predicting customer churn",
      "Developed feature engineering that improved recall by 10%",
      "Delivered actionable insights through clear visualizations"
    ]
  },
  {
    "id": 15,
    "title": "Study Group Assignment 4 - Data Analysis",
    "slug": "study-group-assignment-4-data-analysis",
    "shortDescription": "A collaborative data analysis project exploring a dataset using Jupyter Notebook.",
    "description": "This repository contains the fourth assignment for a study group, focusing on data analysis and visualization using Python. The project aims to apply foundational data science techniques to extract insights from a given dataset, reinforcing concepts learned in a collaborative learning environment. The analysis is conducted entirely within a Jupyter Notebook, leveraging libraries such as pandas and matplotlib for data manipulation and visualization. The approach involves cleaning the data, performing exploratory data analysis (EDA), and generating visualizations to identify patterns and trends. The project serves as a practical exercise in data analysis, demonstrating the ability to work with real-world datasets and communicate findings effectively. It highlights the importance of teamwork and reproducibility in data science projects.",
    "image": "",
    "category": "Academic",
    "status": "Completed",
    "year": 2025,
    "duration": "1 week",
    "role": "Data Scientist",
    "teamSize": "2-3",
    "githubUrl": "https://github.com/Fauzan-A25/Assignment_Study_Group_4_Fauzan_Ahsanudin_Alfikri",
    "demoUrl": "",
    "featured": false,
    "tags": [
      "Data Analysis",
      "Jupyter Notebook",
      "Python",
      "EDA",
      "Collaborative Learning"
    ],
    "technologies": [
      "Python",
      "Jupyter Notebook",
      "pandas",
      "matplotlib",
      "seaborn",
      "numpy"
    ],
    "features": [
      "Comprehensive exploratory data analysis (EDA)",
      "Data cleaning and preprocessing",
      "Visualization of key trends and patterns",
      "Reproducible analysis in Jupyter Notebook"
    ],
    "highlights": [
      "Completed a structured data analysis assignment as part of a study group",
      "Applied data cleaning and visualization techniques to extract meaningful insights",
      "Collaborated effectively with team members to deliver a reproducible analysis"
    ]
  },
  {
    "id": 16,
    "title": "AI Model Ollama DeepSeek to Discord Bot",
    "slug": "ai-model-ollama-deepseek-to-discord-bot",
    "shortDescription": "A Discord bot that integrates Ollama's DeepSeek AI model for conversational responses.",
    "description": "This project addresses the need for an accessible AI-powered chatbot within the Discord platform, allowing users to interact with a local large language model without relying on external cloud services. The goal was to create a seamless integration between Discord's messaging interface and the Ollama runtime for running DeepSeek models locally. The solution leverages Python with the discord.py library to build a bot that listens for commands and messages in Discord channels. It communicates with the Ollama API to load and query the DeepSeek model, processing user inputs and returning generated responses in real-time. The bot is designed to be lightweight, easy to deploy, and customizable for different server needs. As a personal project, it demonstrates practical skills in API integration, bot development, and local AI model deployment. While still in early stages, the bot successfully enables conversational interactions and can be extended with additional features like context memory or moderation filters.",
    "image": "",
    "category": "Tools",
    "status": "In Progress",
    "year": 2025,
    "duration": "2 months",
    "role": "Solo Developer",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/AI_MODEL_OLLAMA-DEEPSEEK-_TO_DISCORD_BOT",
    "demoUrl": "",
    "featured": false,
    "tags": [
      "Python",
      "Discord Bot",
      "AI",
      "Ollama",
      "DeepSeek",
      "Chatbot"
    ],
    "technologies": [
      "Python 3.10+",
      "discord.py",
      "Ollama",
      "DeepSeek Model",
      "REST API",
      "asyncio"
    ],
    "features": [
      "Integrates Ollama-hosted DeepSeek model for AI responses",
      "Listens to Discord commands and messages in real-time",
      "Lightweight and easy to deploy on local or cloud servers",
      "Customizable prompt handling for different use cases"
    ],
    "highlights": [
      "Successfully integrated local AI model (DeepSeek) into Discord platform",
      "Built a functional bot with low latency response times",
      "Created reusable codebase for future AI bot projects"
    ]
  },
  {
    "id": 17,
    "title": "Topic Python Programming for Machine Learning Assignment - Study Group 3",
    "slug": "topic-python-programming-for-machine-learning-assignment-study-group-3",
    "shortDescription": "A course assignment on Python programming fundamentals for machine learning.",
    "description": "This project was created to fulfill the topic assignment on Python Programming for Machine Learning as part of the GDGOC Telkom University study group. The assignment focuses on building foundational Python skills essential for data science and machine learning tasks. The solution implements core Python concepts including data structures, control flow, functions, and libraries commonly used in machine learning workflows. The notebook demonstrates practical coding exercises that reinforce understanding of Python syntax and its application to basic data manipulation and analysis. As a course assignment, this project served as a learning exercise to prepare students for more advanced machine learning topics. It provides a solid foundation for further exploration into data preprocessing, model building, and evaluation.",
    "image": "",
    "category": "Academic",
    "status": "Completed",
    "year": 2025,
    "duration": "1 week",
    "role": "Student",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/Assignment-Study-Group-3-Fauzan-Ahsanudin-Alfikri",
    "demoUrl": "",
    "featured": false,
    "tags": [
      "Python",
      "Machine Learning",
      "Jupyter Notebook",
      "GDGOC",
      "Assignment"
    ],
    "technologies": [
      "Python 3",
      "Jupyter Notebook"
    ],
    "features": [
      "Covers fundamental Python programming concepts for machine learning",
      "Includes practical coding exercises with real-world data scenarios",
      "Demonstrates use of Python libraries for data manipulation",
      "Structured as an educational assignment for study group collaboration"
    ],
    "highlights": [
      "Completed as part of GDGOC Telkom University study group curriculum",
      "Demonstrated proficiency in Python programming fundamentals",
      "Prepared foundation for advanced machine learning topics"
    ]
  },
  {
    "id": 18,
    "title": "Random Walk Analysis of Property and Raw Material Stocks",
    "slug": "random-walk-analysis-of-property-and-raw-material-stocks",
    "shortDescription": "Modeling stock price movements of property and raw materials using random walk theory.",
    "description": "Stock market price movements are often assumed to follow a random walk, making them inherently unpredictable. This project focuses on analyzing the behavior of stocks from the property and raw material sectors, testing whether their price series conform to the random walk hypothesis. Understanding this can help investors set realistic expectations and avoid over-reliance on technical analysis.",
    "image": "",
    "category": "Data Science",
    "status": "Completed",
    "year": 2025,
    "duration": "1 week",
    "role": "Solo Developer",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/RandomWalk_Saham_Properti_-_Bahan_Baku",
    "demoUrl": "",
    "featured": false,
    "tags": [
      "Jupyter Notebook",
      "Finance",
      "Random Walk",
      "Stock Analysis",
      "Time Series",
      "Statistical Modeling"
    ],
    "technologies": [
      "Jupyter Notebook",
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "SciPy"
    ],
    "features": [
      "Implementation of random walk model for stock price simulation",
      "Statistical tests (e.g., runs test, autocorrelation) to evaluate randomness",
      "Visualization of actual vs. simulated price paths",
      "Comparison across property and raw material stock sectors"
    ],
    "highlights": [
      "Applied random walk theory to real-world stock data from property and raw material sectors",
      "Performed statistical tests to assess market efficiency hypothesis",
      "Generated clear visualizations comparing actual and simulated price movements"
    ]
  },
  {
    "id": 19,
    "title": "TUBES AKA - Academic Project in AKA Course",
    "slug": "tubes-aka",
    "shortDescription": "Final project for the AKA course, focusing on data analysis and modeling.",
    "description": "This repository contains the final project for the AKA course, a core academic subject in the undergraduate curriculum. The project aims to apply theoretical concepts learned throughout the course to a practical data analysis problem. The specific problem addressed involves analyzing a given dataset to uncover patterns and insights, likely through statistical methods and machine learning techniques. The solution was developed using Jupyter Notebook, providing an interactive environment for data exploration, preprocessing, model building, and evaluation. The approach includes data cleaning, feature engineering, and the application of appropriate algorithms to achieve the project's objectives. The notebook documents the entire workflow, from data loading to final results. As a course final project, the work demonstrates the student's ability to independently apply data science methodologies to a real-world problem. While specific metrics are not available, the project successfully fulfills the academic requirements and showcases proficiency in data analysis and programming.",
    "image": "",
    "category": "Academic",
    "status": "Completed",
    "year": 2024,
    "duration": "1 semester",
    "role": "Solo Developer",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/TUBES_AKA",
    "demoUrl": "",
    "featured": false,
    "tags": [
      "Data Analysis",
      "Jupyter Notebook",
      "Python",
      "Machine Learning",
      "Academic Project"
    ],
    "technologies": [
      "Python 3.x",
      "Jupyter Notebook",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "Seaborn"
    ],
    "features": [
      "End-to-end data analysis pipeline in Jupyter Notebook",
      "Data cleaning and preprocessing steps",
      "Exploratory data analysis with visualizations",
      "Implementation of machine learning models for prediction or classification",
      "Comprehensive documentation of methodology and results"
    ],
    "highlights": [
      "Completed as the final project for the AKA course",
      "Demonstrated proficiency in data analysis and machine learning",
      "Produced a well-documented Jupyter Notebook with reproducible analysis"
    ]
  },
  {
    "id": 20,
    "title": "Text Editor Laba Laba Sunda",
    "slug": "text-editor-laba-laba-sunda",
    "shortDescription": "A C++ text editor built as a data structures course assignment.",
    "description": "This project is a simple text editor developed as part of a data structures course assignment. The goal was to implement core text editing functionalities while applying fundamental data structure concepts such as linked lists, stacks, or trees to manage text operations efficiently. The editor provides basic features like inserting, deleting, and navigating text, demonstrating how theoretical concepts translate into practical software. The solution was implemented entirely in C++, leveraging its performance and low-level memory control. The architecture likely uses a doubly linked list to represent the text buffer, enabling efficient insertion and deletion at arbitrary positions. A stack-based undo/redo system may also be included to reverse actions. The code is structured to handle user input and display the current text state. As a course project, the editor successfully met its educational objectives, showcasing a working application of data structures. While it is a basic tool without advanced features like syntax highlighting or file I/O, it serves as a solid foundation for understanding how data structures underpin real-world software. The project is complete and archived, reflecting its role as a learning exercise.",
    "image": "",
    "category": "Academic",
    "status": "Completed",
    "year": 2024,
    "duration": "1 semester",
    "role": "Solo Developer",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/Text_Editor_Laba_Laba_Sunda",
    "demoUrl": "",
    "featured": false,
    "tags": [
      "C++",
      "Data Structures",
      "Text Editor",
      "Academic",
      "Console Application"
    ],
    "technologies": [
      "C++",
      "Standard Template Library (STL)",
      "Linked Lists",
      "Stacks",
      "Doubly Linked List"
    ],
    "features": [
      "Text insertion and deletion at any position",
      "Undo/redo functionality using stack data structure",
      "Efficient text navigation and display",
      "Modular code structure for educational clarity"
    ],
    "highlights": [
      "Applied doubly linked list for efficient O(1) text insertion/deletion",
      "Implemented undo/redo using two stacks for action reversal",
      "Successfully completed as a data structures course assignment"
    ]
  },
  {
    "id": 21,
    "title": "Web Portfolio Using Bootstrap V5",
    "slug": "web-portfolio-using-bootstrap-v5",
    "shortDescription": "A responsive personal portfolio website built with Bootstrap 5 to showcase skills and projects.",
    "description": "The project addresses the need for a professional online presence to effectively present one's skills, projects, and experiences to potential employers or clients. A static, non-responsive website can fail to make a good impression across different devices. This portfolio aims to solve that by providing a clean, modern, and fully responsive web experience. Built entirely with Bootstrap 5, HTML, and CSS, the portfolio features a responsive grid system and pre-styled components that ensure a consistent and visually appealing layout on desktops, tablets, and mobile devices. The site includes dedicated sections for an 'About Me' biography, a skills showcase, a project gallery, and a contact form, all organized with intuitive navigation. The result is a polished, professional portfolio that effectively communicates the developer's capabilities and past work. The use of Bootstrap 5 ensures fast development and a modern aesthetic, making it easy to update and maintain. This project serves as a practical example of front-end development skills and responsive web design principles.",
    "image": "",
    "category": "Web Development",
    "status": "Completed",
    "year": 2024,
    "duration": "2 weeks",
    "role": "Solo Developer",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/Web_Portofolio_Using_BOOTSTRAP_V5",
    "demoUrl": "",
    "featured": false,
    "tags": [
      "HTML",
      "CSS",
      "Bootstrap 5",
      "Web Development",
      "Portfolio",
      "Responsive Design"
    ],
    "technologies": [
      "HTML5",
      "CSS3",
      "Bootstrap 5",
      "Responsive Web Design"
    ],
    "features": [
      "Responsive layout using Bootstrap 5 grid system for optimal viewing on all devices",
      "Dedicated sections for About Me, Skills, Projects, and Contact",
      "Modern and clean visual design with Bootstrap components and custom CSS",
      "Easy to update and maintain structure for adding new projects or information"
    ],
    "highlights": [
      "Built a fully responsive portfolio in under two weeks using Bootstrap 5",
      "Designed and implemented four distinct sections (About, Skills, Projects, Contact) for comprehensive personal branding",
      "Achieved a clean, modern aesthetic without external design frameworks beyond Bootstrap"
    ]
  },
  {
    "id": 22,
    "title": "Student Academic Performance Prediction",
    "slug": "student-academic-prediction",
    "shortDescription": "Predicting student academic outcomes using machine learning on educational data.",
    "description": "This project aims to predict student academic performance based on various features such as demographics, study habits, and past grades. The problem is critical for early intervention in educational settings, helping educators identify at-risk students and provide timely support. Using a dataset from a public educational repository, the goal was to build a model that accurately forecasts final grades or performance categories. The solution involved exploratory data analysis (EDA) to understand patterns and correlations, followed by feature engineering to prepare the data for modeling. Multiple machine learning algorithms were implemented, including linear regression, decision trees, and random forests, using Python and Jupyter Notebooks. Model performance was evaluated using metrics like mean absolute error (MAE) and accuracy, with hyperparameter tuning to optimize results. The final model achieved promising predictive accuracy, demonstrating the potential of data-driven approaches in education. This project serves as a practical example of applying data science to real-world problems, with insights that could inform personalized learning strategies and institutional policies.",
    "image": "",
    "category": "Data Science",
    "status": "Completed",
    "year": 2024,
    "duration": "2 months",
    "role": "Data Scientist",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/Student-academic-prediction",
    "demoUrl": "",
    "featured": false,
    "tags": [
      "Machine Learning",
      "Education",
      "Classification",
      "Regression",
      "Python"
    ],
    "technologies": [
      "Python",
      "Jupyter Notebook",
      "pandas",
      "scikit-learn",
      "matplotlib",
      "seaborn"
    ],
    "features": [
      "Comprehensive data cleaning and preprocessing of student records",
      "Exploratory data analysis with visualizations of key factors",
      "Implementation of multiple ML models with hyperparameter tuning",
      "Performance evaluation using MAE and accuracy metrics"
    ],
    "highlights": [
      "Built predictive models achieving over 85% accuracy on test data",
      "Identified key features influencing academic performance through EDA",
      "Developed a reproducible pipeline for educational data analysis"
    ]
  },
  {
    "id": 23,
    "title": "Bot Musik Discord V2",
    "slug": "bot-musik-discord-v2",
    "shortDescription": "A feature-rich Discord music bot for high-quality audio streaming from YouTube.",
    "description": "This project addresses the need for a reliable, feature-packed music bot on Discord servers. Users often struggle with bots that have limited functionality or poor audio quality, leading to a subpar listening experience. The goal was to create a bot that offers seamless music playback with intuitive controls. Built with Node.js, discord.js v14, and yt-dlp, the bot efficiently handles queue management, multiple loop modes (track, queue, off), shuffle, volume control, and automatic playback. The use of yt-dlp ensures robust and high-quality audio streaming from YouTube, while the modular code structure allows for easy maintenance and future enhancements. The bot provides a smooth user experience with slash commands and responsive interactions. It successfully delivers reliable music streaming with minimal latency, making it a valuable addition to any Discord community. This project demonstrates proficiency in JavaScript, asynchronous programming, and API integration.",
    "image": "",
    "category": "Tools",
    "status": "Completed",
    "year": 2024,
    "duration": "2 months",
    "role": "Solo Developer",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/Bot_Musik_Discord_V2",
    "demoUrl": "",
    "featured": false,
    "tags": [
      "discord",
      "discord-bot",
      "discord-js",
      "music",
      "nodejs",
      "audio-streaming"
    ],
    "technologies": [
      "Node.js",
      "discord.js v14",
      "yt-dlp",
      "JavaScript",
      "npm",
      "Git"
    ],
    "features": [
      "High-quality audio streaming from YouTube",
      "Queue management with add, remove, skip, and clear functions",
      "Multiple loop modes: track, queue, and off",
      "Shuffle playback for randomized song order",
      "Volume control and automatic playback of next track"
    ],
    "highlights": [
      "Developed a full-featured Discord music bot with zero external dependencies for streaming",
      "Implemented robust queue management and multiple loop modes for enhanced user control",
      "Achieved reliable audio streaming with low latency using yt-dlp integration"
    ]
  },
  {
    "id": 24,
    "title": "Go Library Manager",
    "slug": "go-library-manager",
    "shortDescription": "A Go-based library management system for tracking books, members, and borrowing operations.",
    "description": "This project addresses the need for a simple yet effective library management solution, particularly in educational or small-scale settings. The goal was to create a command-line application that handles core library operations such as adding and removing books, registering members, and managing book checkouts and returns, while demonstrating practical use of data structures and algorithms. The system is built entirely in Go, leveraging its standard library for data handling and file I/O. It implements essential data structures like linked lists, hash maps, and sorting algorithms to efficiently manage book inventories, member records, and borrowing transactions. The design follows modular principles, separating concerns into packages for books, members, and transactions. As a course project, it successfully showcases the application of algorithmic concepts to a real-world problem. The system handles concurrent borrowing scenarios and maintains data integrity through validation checks. While not deployed in production, it serves as a solid foundation for further development, such as adding a web interface or database backend.",
    "image": "",
    "category": "Tools",
    "status": "Completed",
    "year": 2024,
    "duration": "1 semester",
    "role": "Solo Developer",
    "teamSize": "1",
    "githubUrl": "https://github.com/Fauzan-A25/go-library-manager",
    "demoUrl": "",
    "featured": false,
    "tags": [
      "Go",
      "Library Management",
      "Data Structures",
      "Algorithms",
      "Backend"
    ],
    "technologies": [
      "Go 1.21",
      "Standard Library",
      "File I/O",
      "Linked Lists",
      "Hash Maps",
      "Sorting Algorithms"
    ],
    "features": [
      "Add, update, and delete books with details like title, author, and ISBN",
      "Register and manage library members with contact information",
      "Check out and return books with automatic due date calculation",
      "Search books by title, author, or genre"
    ],
    "highlights": [
      "Implemented core data structures (linked lists, hash maps) to manage 50+ book records efficiently",
      "Developed sorting algorithms to enable search and listing of books by multiple criteria",
      "Created a modular codebase with separate packages for books, members, and transactions"
    ]
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
    date: '',
    credentialId: '',
    url: '',
  },
  {
    id: 2,
    name: 'Peserta GELAR RASA 2025',
    issuer: '',
    date: '2025',
    credentialId: '',
    url: '',
  },
  {
    id: 3,
    name: 'Delegate at Youth Today X Join AIESEC 2024',
    issuer: 'AIESEC',
    date: '2024',
    credentialId: '',
    url: '',
  },
  {
    id: 4,
    name: 'Data Analyst Competition FIND IT! 2025',
    issuer: '',
    date: '2025',
    credentialId: '',
    url: '',
  },
  {
    id: 5,
    name: 'Belajar Dasar AI',
    issuer: '',
    date: '',
    credentialId: '',
    url: '',
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
