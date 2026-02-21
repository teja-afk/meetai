import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirect() {
    return [
      {
        source: "/",
        destination: "/meetings",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
