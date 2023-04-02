/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        port: '',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/challenge',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
