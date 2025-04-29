const { ANALYZE } = process.env
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Cấu hình từ file gốc
    images: {
        domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com"],
        formats: ['image/webp'],
        minimumCacheTTL: 60,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    poweredByHeader: false,
    reactStrictMode: true,
    compress: true,
    onDemandEntries: {
        maxInactiveAge: 25 * 1000,
        pagesBufferLength: 5,
    },
}

module.exports = withBundleAnalyzer(nextConfig) 