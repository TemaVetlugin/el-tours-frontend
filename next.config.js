/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        appDir: true,
    },
    sassOptions: {
        includePaths: ['./shared'],
        prependData: `
            @import "~shared/styles/global.scss";
        `,
    },
}

module.exports = nextConfig
