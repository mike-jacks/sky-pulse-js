/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  images: {
    unoptimized: isProd ? false : true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.weather.gov",
        port: "",
        pathname: "/icons/**",
      },
    ],
  },
  output: "export",
  basePath: isProd ? "/sky-pulse-js" : "",
  assetPrefix: isProd ? "/sky-pulse-js" : "",
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
};

export default nextConfig;
