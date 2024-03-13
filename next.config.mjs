/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  output: "export",
};

export default nextConfig;
