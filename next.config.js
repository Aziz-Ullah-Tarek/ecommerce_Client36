/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect /auth/login to /login for cleaner URLs
      {
        source: '/auth/login',
        destination: '/login',
        permanent: true,
      },
      // Redirect /auth/register to /register
      {
        source: '/auth/register',
        destination: '/register',
        permanent: true,
      },
      // Redirect old product paths if any
      {
        source: '/product/:id',
        destination: '/products/:id',
        permanent: true,
      },
      // Redirect /dashboard to /manage-products for consistency
      {
        source: '/dashboard',
        destination: '/manage-products',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

module.exports = nextConfig;
