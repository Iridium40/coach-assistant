/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/daily-actions',
        destination: '/dashboard',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
