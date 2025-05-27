/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  
  // Enable for WebSocket API routes
  async rewrites() {
    return [
      {
        source: '/api/ws',
        destination: '/api/ws',
      },
    ];
  },
  
  // Add image optimization for better performance
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig 