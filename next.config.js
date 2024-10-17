/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public'
});
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '*.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'hikeko-web-admin.s3.amazonaws.com',
          },
        ]
    }
};

module.exports = withPWA(nextConfig);
