import type { NextConfig } from "next";

// GitHub pages
const nextConfig: NextConfig = {
  basePath: "/portfolio-next-app",
  output: "export",
  reactStrictMode: true,
};

// Docker
// const nextConfig: NextConfig = {
//   basePath: "/portfolio-next-app",
//   output: "standalone",
// };

export default nextConfig;
