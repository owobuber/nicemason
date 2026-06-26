import type { NextConfig } from "next";

// Static export for shared hosting (Truehost / cPanel / any static host).
// Outputs a self-contained `out/` folder that can be uploaded to public_html.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    // Static export cannot use the Next image optimizer (it needs a Node server),
    // so images in /public are served as-is.
    unoptimized: true,
  },
};

export default nextConfig;
