import { ImageResponse } from 'next/og';
import { getPortfolioData } from '@/lib/portfolio';

// The previous share image was the 368x372 portrait, which social cards and
// AI answer surfaces downgrade to a thumbnail. This renders the 1200x630 card
// they actually want, in the site's own dark palette.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Fauzan Ahsanudin Alfikri — Data Science Portfolio';

export default async function Image() {
  const data = await getPortfolioData();
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 40, height: 1, background: '#dcdde0' }} />
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
