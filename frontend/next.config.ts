// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* CORS এবং API Proxy হ্যান্ডেল করার জন্য */
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // আপনার ব্যাকএন্ড পোর্ট দিন
      },
    ];
  },
  

  
 
};

export default nextConfig;
