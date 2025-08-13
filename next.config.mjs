/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    esmExternals: "loose",
  },
  output: "export",
};

export default nextConfig;
