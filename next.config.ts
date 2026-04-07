// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // هيخلي الـ build يكمل حتى لو فيه أخطاء TypeScript
    ignoreBuildErrors: true,
  },
  eslint: {
    // هيخلي الـ build يكمل حتى لو فيه أخطاء ESLint
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;