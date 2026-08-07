import { ImageResponse } from 'next/og';
import { getPortfolioData } from '@/lib/portfolio';

// The previous share image was the 368x372 portrait, which social cards and
// AI answer surfaces downgrade to a thumbnail. This renders the 1200x630 card
// they actually want, in the site's own dark palette.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Fauzan Ahsanudin Alfikri — Data Science Portfolio';

// The FA mark, inlined as a data URI. Satori renders <img> reliably; a raw
// <svg> child is only partially supported, so this is the safe way in.
const MARK = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 32" fill="none" ' +
    'stroke="#dcdde0" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M4.6 27.2V6.4h9.2"/><path d="M4.6 16.6h7.2"/>' +
    '<path d="M18.8 27.2 25.4 5.2l6.6 22"/><path d="M21.4 16.6h8"/></svg>',
)}`;

export default function Image() {
  const data = getPortfolioData();
  const info = data.personalInfo || {};

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0c0c0d',
          color: '#f3f3f4',
          padding: '72px 80px',
          border: '1px solid #272829',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={MARK} width={45} height={40} alt="" />
          <div style={{ width: 1, height: 34, background: '#272829' }} />
          <div style={{ fontSize: 22, letterSpacing: 6, color: '#dcdde0' }}>
            {`DATA SCIENCE · ${(info.university || 'TELKOM UNIVERSITY').toUpperCase()}`}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, letterSpacing: -2 }}>
            {info.name || 'Fauzan Ahsanudin Alfikri'}
          </div>
          <div style={{ fontSize: 34, color: '#9b9c9f' }}>
            {info.focus || 'NLP · Computer Vision · ML Pipelines'}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14 }}>
          {['Machine Learning', 'NLP', 'Computer Vision', 'Python'].map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                padding: '10px 22px',
                border: '1px solid rgba(220,221,224,.26)',
                borderRadius: 999,
                fontSize: 24,
                color: '#dcdde0',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
