/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true, // 可以设置为 false，以进行临时重定向
      },
    ];
  },
};

module.exports = nextConfig;
