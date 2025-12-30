// src/App.jsx
import { lazy, Suspense } from 'react';
import { usePortfolioData } from './hooks/usePortfolioData';

import AnimeEffects from './components/effects/AnimeEffects/AnimeEffects';
import Navbar from './components/layout/Navbar/Navbar';
import LoadingScreen from './components/layout/LoadingScreen/LoadingScreen';
import Hero from './components/sections/Hero/Hero';
import ScrollToTop from './components/core/ScrollToTop/ScrollToTop';
import ThemeToggle from './components/core/ThemeToggle/ThemeToggle';
import BackgroundMusic from './components/BackgroundMusic/BackgroundMusic';
import AiAssistant from './components/AiAssistant/AiAssistant';

const About = lazy(() => import('./components/sections/About/About'));
const Skills = lazy(() => import('./components/sections/Skills/Skills'));
const Experience = lazy(() => import('./components/sections/Experience/Experience'));
const Certifications = lazy(() => import('./components/sections/Certifications/Certifications'));
const Projects = lazy(() => import('./components/sections/Projects/Projects'));
const Contact = lazy(() => import('./components/sections/Contact/Contact'));
const Footer = lazy(() => import('./components/layout/Footer/Footer'));

function App() {
  const { data: portfolioData, loading, error } = usePortfolioData();
  
  // Full‑page loading overlay
  if (loading) {
    return (
      <>
        <LoadingScreen />
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'radial-gradient(circle at top, rgba(76,81,191,0.35), transparent 55%), #050816',
            color: '#f9fafb',
            textAlign: 'center',
            zIndex: 9999,
            padding: '0 20px',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '999px',
              border: '4px solid rgba(156,163,175,0.35)',
              borderTopColor: '#6366f1',
              animation: 'spin 0.9s linear infinite',
              marginBottom: 20,
            }}
          />
          <h2 style={{ margin: 0, fontSize: 24, letterSpacing: 0.5 }}>
            Preparing portfolio…
          </h2>
          <p
            style={{
              marginTop: 10,
              opacity: 0.7,
              fontSize: 14,
              maxWidth: 360,
            }}
          >
            Loading content and projects. This will only take a moment.
          </p>

          <style>
            {`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </>
    );
  }
  
  // Error state
  if (error || !portfolioData) {
    return (
      <>
        <LoadingScreen />
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background:
              'radial-gradient(circle at top, rgba(239,68,68,0.18), transparent 55%), #050816',
            color: '#f9fafb',
            padding: '0 24px',
            textAlign: 'center',
            zIndex: 9999,
          }}
        >
          <div style={{ fontSize: 52, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ margin: 0, fontSize: 24, color: '#fecaca' }}>
            Something went wrong
          </h2>
          <p
            style={{
              opacity: 0.8,
              marginTop: 12,
              maxWidth: 420,
              fontSize: 14,
            }}
          >
            The portfolio content could not be loaded right now. Please check your
            connection or try again in a moment.
          </p>
          {error && (
            <p
              style={{
                marginTop: 12,
                maxWidth: 480,
                fontSize: 12,
                fontFamily: 'monospace',
                background: 'rgba(15,23,42,0.9)',
                padding: '10px 14px',
                borderRadius: 8,
                border: '1px solid rgba(148,163,184,0.35)',
                opacity: 0.8,
              }}
            >
              {error}
            </p>
          )}
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 22,
              padding: '10px 22px',
              background:
                'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(79,70,229,0.35)',
            }}
          >
            Try again
          </button>
        </div>
      </>
    );
  }
  
  return (
    <>
      <LoadingScreen />
      <BackgroundMusic />
      <AiAssistant portfolioData={portfolioData} />
      <Navbar navLinks={portfolioData.navLinks} />
      <ThemeToggle />
      {/* <AnimeEffects /> */}
      <ScrollToTop />
      
      <Suspense
        fallback={
          <div
            style={{
              minHeight: '50vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary, #ffffff)',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '999px',
                border: '3px solid rgba(156,163,175,0.35)',
                borderTopColor: '#6366f1',
                animation: 'spin 0.9s linear infinite',
                marginRight: 12,
              }}
            />
            <span>Loading section…</span>
          </div>
        }
      >
        <Hero 
          personalInfo={portfolioData.personalInfo}
          socialLinks={portfolioData.socialLinks}
          heroTypingTexts={portfolioData.heroTypingTexts}
        />
        <About 
          personalInfo={portfolioData.personalInfo}
          aboutContent={portfolioData.aboutContent}
          stats={portfolioData.stats}
        />
        <Skills 
          skills={portfolioData.skills}
          skillsContent={portfolioData.skillsContent}
        />
        <Experience 
          experiences={portfolioData.experiences}
        />
        <Certifications 
          certifications={portfolioData.certifications}
        />
        <Projects 
          projects={portfolioData.projects}
          projectCategories={portfolioData.projectCategories}
          projectsContent={portfolioData.projectsContent}
        />
        <Contact 
          personalInfo={portfolioData.personalInfo}
          socialLinks={portfolioData.socialLinks}
          contactContent={portfolioData.contactContent}
          emailjsConfig={portfolioData.emailjsConfig}
        />
        <Footer 
          personalInfo={portfolioData.personalInfo}
          socialLinks={portfolioData.socialLinks}
          footerContent={portfolioData.footerContent}
        />
      </Suspense>
    </>
  );
}

export default App;
