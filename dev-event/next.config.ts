import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
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
