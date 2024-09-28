/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Optional: enables React's Strict Mode
    async headers() {
      return [
        {
          // Apply these headers to all routes in the app
          source: '/(.*)',
          headers: [
            {
              key: 'Access-Control-Allow-Origin',
              value: 'http://localhost:3000', // Allow requests from this origin (your Next.js app)
            },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET,POST,PUT,DELETE,OPTIONS', // Allow these methods
            },
            {
              key: 'Access-Control-Allow-Headers',
              value: 'X-Requested-With, Content-Type, Authorization', // Specify allowed headers
            },
            {
              key: 'Access-Control-Allow-Credentials',
              value: 'true', // Allow credentials like cookies to be sent
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  