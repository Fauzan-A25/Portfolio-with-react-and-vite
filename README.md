# 🚀 Modern Portfolio Website

> A modern, responsive, and highly customizable portfolio website built with React and Vite

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Customization](#-customization)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Overview

A professional portfolio website designed for developers, data scientists, and tech professionals. Built with modern web technologies and best practices, featuring smooth animations, responsive design, and easy customization through a centralized data file.

**Live Demo:** [Your Live URL Here]

## ✨ Features

- 🎨 **Modern & Clean Design** - Glassmorphism UI with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **Lightning Fast** - Powered by Vite for optimal performance
- 🎭 **Smooth Animations** - AOS library and custom CSS animations
- 🎯 **Easy Customization** - Single data file (`src/data/portfolio.json`) for all content
- 🌓 **Theme Support** - Light/Dark mode toggle (optional)
- 🎪 **Project Showcase** - Interactive cards with filtering by category
- 📊 **Skills Section** - Visual skill bars with categories
- 📧 **Contact Form** - Ready-to-integrate contact section
- 🔄 **Reusable Components** - Clean component architecture
- 🚀 **SEO Optimized** - Meta tags and semantic HTML

## 🛠️ Tech Stack

### Core
- **React** 18.3.1 - UI library
- **Vite** 5.4.2 - Build tool
- **JavaScript (ES6+)** - Programming language

### Libraries & Tools
- **Swiper.js** - Touch slider for projects
- **AOS** - Animate on scroll library
- **Bootstrap Icons** - Icon library

### Styling
- **CSS3** - Custom styling with variables
- **CSS Grid & Flexbox** - Layout system
- **CSS Animations** - Smooth transitions

## 📦 Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Setup Steps

1. **Clone the repository**
```

git clone https://github.com/Fauzan-A25/Portfolio-with-react-and-vite.git
cd portfolio-react

```

2. **Install dependencies**
```

npm install

```

3. **Start development server**
```

npm run dev

```

4. **Open in browser**
```

http://localhost:5173

```

### Available Scripts

```

npm start        \# Start web
npm run dev      \# Start development server
npm run build    \# Build for production
npm run preview  \# Preview production build
npm run lint     \# Run ESLint

```

## 📁 Project Structure

```

portfolio-react/
├── public/
│   ├── images/                    \# Static images
│   │   ├── profile.jpg           \# Your profile photo
│   │   ├── about.jpg             \# About section image
│   │   └── projects/             \# Project screenshots
│   │       ├── project1.png
│   │       └── project2.png
│   └── favicon.svg               \# Website favicon
│
├── src/
│   ├── components/
│   │   ├── core/                 \# Core reusable components
│   │   │   ├── ScrollToTop/
│   │   │   │   ├── ScrollToTop.jsx
│   │   │   │   └── ScrollToTop.css
│   │   │   └── ThemeToggle/
│   │   │       ├── ThemeToggle.jsx
│   │   │       └── ThemeToggle.css
│   │   │
│   │   ├── layout/               \# Layout components
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Navbar.css
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── Footer.css
│   │   │   └── LoadingScreen/
│   │   │       ├── LoadingScreen.jsx
│   │   │       └── LoadingScreen.css
│   │   │
│   │   └── sections/             \# Page sections
│   │       ├── Hero/
│   │       │   ├── Hero.jsx
│   │       │   └── Hero.css
│   │       ├── About/
│   │       │   ├── About.jsx
│   │       │   └── About.css
│   │       ├── Skills/
│   │       │   ├── Skills.jsx
│   │       │   └── Skills.css
│   │       ├── Projects/
│   │       │   ├── Projects.jsx
│   │       │   └── Projects.css
│   │       └── Contact/
│   │           ├── Contact.jsx
│   │           └── Contact.css
│   │
│   ├── hooks/                    \# Custom React hooks
│   │   ├── useIntersectionObserver.js
│   │   ├── useTypingEffect.js
│   │   └── useScrollAnimation.js
│   │
│   ├── context/                  \# React Context (optional)
│   │   └── ThemeContext.jsx
│   │
│   ├── data/                     \# Centralized data
│   │   └── portfolio.json       \# ⭐ Single source of truth for all content
│   │
│   ├── styles/                   \# Global styles
│   │   └── globals.css
│   │
│   ├── App.jsx                   \# Main App component
│   └── main.jsx                  \# Entry point
│
├── .gitignore                    \# Git ignore rules
├── index.html                    \# HTML template
├── package.json                  \# Dependencies
├── vite.config.js               \# Vite configuration
└── README.md                     \# This file

```

## 🎨 Customization

All content lives in **one file**: `src/data/portfolio.json`. There is no CMS,
no spreadsheet and no data API — edit the JSON, commit, redeploy. The page is
statically prerendered from it, so whatever is in that file is exactly what a
browser, Googlebot and an AI crawler all receive.

### 1. Update Personal Information

Edit the `personalInfo` object in `src/data/portfolio.json`:

```json
"personalInfo": {
  "name": "Your Name",
  "title": "Your Title",
  "email": "your@email.com",
  "university": "Your University",
  "location": "Your City, Country",
  "profileImage": "/images/your-photo.jpg",
  "cvLink": "https://drive.google.com/your-cv-link"
}
```

### 2. Add Projects

Append to the `projects` array. `description` is the field that matters most:
it is what ends up in the JSON-LD graph and in `/llms.txt`, so write specific,
attributable numbers ("89% accuracy across 3,276 samples") rather than adjectives.

```json
{
"id": 1,
"title": "Your Project Name",
"description": "Project description...",
"image": "/images/projects/your-project.png",
"tags": ["React", "Node.js", "MongoDB"],
"technologies": ["React", "Node.js"],
"category": "Web Development",
"status": "Completed",
"year": 2025,
"githubUrl": "https://github.com/username/repo",
"demoUrl": "https://your-demo.com",
"featured": true
}
```

> `category` must also exist in the `projectCategories` array or the filter
> chip for it will never appear.

### 3. Update Skills

```

export const skills = {
programming: [
{ name: 'Python', level: 90, icon: 'bi-file-code', color: '\#3776AB' },
{ name: 'JavaScript', level: 85, icon: 'bi-braces', color: '\#F7DF1E' },
// Add more skills...
],
// More categories...
};

```

### 4. Update Social Links

```

export const socialLinks = {
github: 'https://github.com/yourusername',
linkedin: 'https://linkedin.com/in/yourusername',
instagram: 'https://instagram.com/yourusername',
twitter: 'https://twitter.com/yourusername',
email: 'mailto:your@email.com',
};

```

### 5. Customize Colors

Edit CSS variables in `src/styles/globals.css`:

```

:root {
--primary-bg: \#0a0a0a;
--secondary-bg: \#121212;
--text-primary: \#ffffff;
--text-secondary: \#a0a0a0;
--accent-color: \#00d4aa;
--accent-gradient: linear-gradient(135deg, \#00d4aa 0%, \#00a8e8 100%);
/* Add more custom colors */
}

```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy with one click

### Deploy to Netlify

1. Build the project:
```

npm run build

```

2. Deploy the `dist` folder to [Netlify](https://netlify.com)

### Deploy to GitHub Pages

1. Install gh-pages:
```

npm install --save-dev gh-pages

```

2. Add to `package.json`:
```

"scripts": {
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
}

```

3. Update `vite.config.js`:
```

export default defineConfig({
base: '/your-repo-name/',
// ... rest of config
});

```

4. Deploy:
```

npm run deploy

```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Fauzan Ahsanudin Alfikri**

- GitHub: [@Fauzan-A25](https://github.com/Fauzan-A25)
- LinkedIn: [@fauzanahsanudin](https://linkedin.com/in/fauzanahsanudin)

## 🙏 Acknowledgments

- [React](https://react.dev) - UI Library
- [Vite](https://vitejs.dev) - Build Tool
- [Swiper](https://swiperjs.com) - Slider Component
- [AOS](https://michalsnik.github.io/aos/) - Animation Library
- [Bootstrap Icons](https://icons.getbootstrap.com) - Icon Library

---

⭐ If you found this helpful, please consider giving it a star on GitHub!

Made by Fauzan Ahsanudin Alfikri