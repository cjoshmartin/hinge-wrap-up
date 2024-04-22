/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media.hingenexus.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'storage.googleapis.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
