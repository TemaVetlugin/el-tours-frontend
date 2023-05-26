/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: ['./shared'],
        prependData: `
            @import "~shared/styles/global.scss";
        `,
    },
}

module.exports = nextConfig
