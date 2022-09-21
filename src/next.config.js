const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  distDir: '../.next',
  webpack: config => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, './src'),
      },
    }
    return config
  },
  eslint: {
    dirs: ['src'], // src配下にかける
  },
}
