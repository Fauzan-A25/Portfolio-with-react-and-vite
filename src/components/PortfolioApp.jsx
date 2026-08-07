'use client';

import dynamic from 'next/dynamic';
import { ThemeProvider } from '@/context/ThemeContext';
import { ProofProvider } from '@/components/ui/ProofModal/ProofModal';

import Navbar from '@/components/layout/Navbar/Navbar';
import LoadingScreen from '@/components/layout/LoadingScreen/LoadingScreen';
import Hero from '@/components/sections/Hero/Hero';
import ScrollToTop from '@/components/core/ScrollToTop/ScrollToTop';
import LinkPeek from '@/components/ui/LinkPeek/LinkPeek';

// Every section below is page content, so it is imported statically and ships
// in the server-rendered HTML. Lazy-loading them hid the entire portfolio from
// crawlers that do not run JavaScript.
import About from '@/components/sections/About/About';
import Skills from '@/components/sections/Skills/Skills';
import Experience from '@/components/sections/Experience/Experience';
import Certifications from '@/components/sections/Certifications/Certifications';
import Projects from '@/components/sections/Projects/Projects';
import Contact from '@/components/sections/Contact/Contact';
import Footer from '@/components/layout/Footer/Footer';

// The assistant is a widget, not content: it pulls in the Gemini SDK and a
// markdown renderer, and nothing it shows belongs in the indexed HTML.
const AiAssistant = dynamic(() => import('@/components/AiAssistant/AiAssistant'), {
  ssr: false,
});

/**
 * `data` is resolved on the server from src/data/portfolio.json and handed in
 * as a prop, so it is always present by the time this renders — there is no
 * fetch, no loading state, and no hydration gap. The guard below is a guard
 * against a malformed data file, not a normal render path.
 */
export default function PortfolioApp({ data = null }) {
  if (!data) {
    return (
      <ThemeProvider>
        <LoadingScreen error="Portfolio data is empty." />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <ProofProvider proofs={data.proofs}>
        <Navbar />
        <ScrollToTop />
        <LinkPeek />

        <main>
          <Hero
            personalInfo={data.personalInfo}
            socialLinks={data.socialLinks}
            heroTypingTexts={data.heroTypingTexts}
          />
          <About
            personalInfo={data.personalInfo}
            aboutContent={data.aboutContent}
            stats={data.stats}
          />
          <Skills skills={data.skills} skillsContent={data.skillsContent} />
          <Experience experiences={data.experiences} />
          <Certifications certifications={data.certifications} />
          <Projects
            projects={data.projects}
            projectCategories={data.projectCategories}
            projectsContent={data.projectsContent}
          />
          <Contact
            personalInfo={data.personalInfo}
            socialLinks={data.socialLinks}
            contactContent={data.contactContent}
            emailjsConfig={data.emailjsConfig}
          />
        </main>

        <Footer
          personalInfo={data.personalInfo}
          socialLinks={data.socialLinks}
          footerContent={data.footerContent}
        />
        <AiAssistant portfolioData={data} />
      </ProofProvider>
    </ThemeProvider>
  );
}
