/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'build',
    output: 'standalone',
    experimental: {
        turbotrace: {
            logAll: true,
        },
    },
}
export default nextConfig
