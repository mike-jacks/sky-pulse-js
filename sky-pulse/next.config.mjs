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
};

export default nextConfig;
