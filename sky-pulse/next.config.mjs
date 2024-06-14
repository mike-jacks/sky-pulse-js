/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'api.weather.gov',
          port: '',
          pathname: '/icons/**'
        }
      ]
    },
    output: 'export',
    basePath: '/sky-polse-js',
    assetPrefix: '/sky-puls-js',
  };
  
  export default nextConfig;
  