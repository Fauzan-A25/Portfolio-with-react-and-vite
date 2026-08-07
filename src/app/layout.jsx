import { Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const sans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

// A description an answer engine can lift verbatim: who, what, where, and the
// specific claims (role, award) that make the sentence worth citing.
const DESCRIPTION =
  'Fauzan Ahsanudin Alfikri is a Data Science undergraduate at Telkom University, Bandung, specialising in Machine Learning, Natural Language Processing, and Computer Vision. Teaching Assistant for Sistem Cerdas, 3rd place in the Data Mining Division at ADIKARA 2025, and builder of end-to-end ML pipelines with MLflow and Docker.';

const TITLE = 'Fauzan Ahsanudin Alfikri | Data Science Portfolio';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s | Fauzan Ahsanudin Alfikri',
  },
  description: DESCRIPTION,
  applicationName: 'Fauzan Ahsanudin Alfikri — Portfolio',
  keywords: [
    'Fauzan Ahsanudin Alfikri',
    'Data Science',
    'Machine Learning',
    'NLP',
    'Computer Vision',
    'Python',
    'Telkom University',
    'Data Science portfolio Indonesia',
  ],
  authors: [{ name: 'Fauzan Ahsanudin Alfikri', url: SITE_URL }],
  creator: 'Fauzan Ahsanudin Alfikri',
  publisher: 'Fauzan Ahsanudin Alfikri',
  category: 'technology',
  // Single-page site: every visit should resolve to the same canonical URL,
  // whatever anchor or query string it arrived with.
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Uncapped snippets and large image previews are what make a page
      // eligible for rich results and AI Overview cards.
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'profile',
    firstName: 'Fauzan',
    lastName: 'Ahsanudin Alfikri',
    username: 'Fauzan-A25',
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'Fauzan Ahsanudin Alfikri — Data Science Portfolio',
    locale: 'en_US',
    // The 1200x630 card comes from app/opengraph-image.jsx; declaring images
    // here would override that file convention.
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  // No `icons` key on purpose. Both icons come from the app/ file convention
  // (icon.svg and apple-icon.jsx), which emits the <link> tags automatically.
  // Declaring `icons` here overrides that convention wholesale — which is how
  // the apple-touch-icon went missing before.
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0c0c0d' },
    { media: '(prefers-color-scheme: light)', color: '#faf9f9' },
  ],
};

/**
 * Resolves the theme before first paint so a returning visitor on the light
 * theme never sees a dark flash. Kept tiny and dependency-free on purpose.
 */
const themeInit = `
(function(){
  try {
    // Dark is the designed default; the OS preference only wins if the
    // visitor has never picked a theme here and explicitly prefers light.
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" className={`${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
