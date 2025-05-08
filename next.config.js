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
}

module.exports = nextConfig 