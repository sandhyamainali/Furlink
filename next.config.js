// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbor.forbes.com',
        port: '',
        pathname: '/thumbor/fit-in/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'furlink-backend.vercel.app',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
  // Add any other Next.js configurations here
};

// This is the line you NEED to change to fix the error
export default nextConfig;