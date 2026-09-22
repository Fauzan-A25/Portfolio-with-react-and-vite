/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Do not advertise the framework/version to anyone probing the response.
  poweredByHeader: false,

  // Security headers. The site is a static portfolio (no cookies, no auth),
  // so this is defense-in-depth rather than fixing an active hole. The CSP is
  // deliberately permissive on img/connect: project thumbnails come from Google
  // Drive and Dicoding, link previews from Microlink, and the contact form
  // posts to EmailJS. Tightening those would break the content.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.emailjs.com https://api.microlink.io",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
            ].join('; '),
          },
        ],
      },
    ];
  },

  // Self-hosted on a systemd user service behind a Cloudflare Tunnel, so the
  // deploy artifact has to be self-contained: `standalone` emits a server.js
  // with only the node_modules the app actually reaches, instead of requiring
  // a full `npm install` on the server.
  //
  // It does NOT copy `.next/static` or `public` into the bundle — Next assumes
  // a CDN serves those. There is no CDN here, so scripts/bundle.sh copies them
  // in. Skipping that step yields a site with no CSS and no images.
  output: 'standalone',

  // `images.unoptimized` stops the optimizer from running, but Next still
  // traces sharp into the bundle because the /_next/image route exists in the
  // server build. sharp is the one native dependency here, so as long as it is
  // in the artifact a Windows build cannot run on the Linux server. Excluding
  // it from the trace is what actually makes the bundle portable.
  //
  // Safe only because the optimizer is off and nothing imports next/image; if
  // either changes, drop this and build on Linux.
  outputFileTracingExcludes: {
    '**/*': ['node_modules/@img/**', 'node_modules/sharp/**'],
  },

  images: {
    // Nothing in this app imports next/image — project thumbnails and the
    // link-preview overlay use plain <img> against Google Drive and Microlink.
    // Leaving the optimizer on therefore buys nothing and costs a lot: it pulls
    // `sharp` into the standalone bundle, and sharp is a native module. Builds
    // happen on Windows and run on Linux, so that meant shipping
    // @img/sharp-win32-x64 to a Linux server. Turning it off makes the deploy
    // artifact pure JavaScript and portable across platforms.
    //
    // Re-enable this (and rebuild on Linux, or in a Linux container) the moment
    // anything starts importing next/image.
    unoptimized: true,
  },
};

export default nextConfig;
