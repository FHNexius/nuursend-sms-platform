/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@nuursend/ui', '@nuursend/types'],
  eslint: {
    // Disable ESLint during builds for now (skeleton code)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Already handled by tsconfig
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;

