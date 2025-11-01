import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuilderrors : true,
  },
  cacheComponents: true,
  images : {
    remotePatterns : [{
      protocol : 'https',
      hostname : 'res.cloudinary.com'
    },],
  }
  /* config options here */
};

export default nextConfig;
