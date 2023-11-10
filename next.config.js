/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/developaul/**',
      },
    ],
  },
}

// https://res.cloudinary.com/developaul/image/upload/v1699585337/stylus-shop/qk4jgrlttg8ygd9qfdbq.jpg

module.exports = nextConfig
