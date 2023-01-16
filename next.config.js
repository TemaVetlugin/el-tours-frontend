/** @type {import('next').NextConfig} */
const { withGlobalCss } = require('next-global-css');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
    openAnalyzer: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(withGlobalCss()({
    output: 'standalone',
    reactStrictMode: true,
    swcMinify: true,
    pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
    sassOptions: {
        includePaths: ['./shared'],
        prependData: `
            @import "~shared/styles/global.scss";
        `,
    },
}));
