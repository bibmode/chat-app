/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.pinimg.com",
      "uqrsrriefchzshmmcweo.supabase.in",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
