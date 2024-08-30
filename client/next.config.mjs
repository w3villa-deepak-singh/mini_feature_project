// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: 'http://localhost:3001/api/:path*',
        },
      ];
    },
  };
  
  export default nextConfig;