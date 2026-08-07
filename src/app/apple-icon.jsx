import { ImageResponse } from 'next/og';

// iOS ignores SVG favicons and rasterises this instead when a visitor adds the
// site to their home screen. 180x180 is the size Apple asks for; anything
// smaller gets upscaled and the strokes go soft.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // iOS applies its own rounded mask, so the plate is drawn square and
          // filled edge to edge — a rounded plate would be clipped twice.
          background: '#0c0c0d',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          width={124}
          height={110}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 32" fill="none" ' +
              'stroke="#f3f3f4" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round">' +
              '<path d="M4.6 27.2V6.4h9.2"/><path d="M4.6 16.6h7.2"/>' +
              '<path d="M18.8 27.2 25.4 5.2l6.6 22"/><path d="M21.4 16.6h8"/></svg>',
          )}`}
        />
      </div>
    ),
    size,
  );
}
