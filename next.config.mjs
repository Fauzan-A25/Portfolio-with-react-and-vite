/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Project thumbnails are served from Google Drive; the link-preview overlay
    // pulls screenshots from Microlink.
    remotePatterns: [
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'api.microlink.io' },
    ],
  },
};

export default nextConfig;
