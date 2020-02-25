const withSass = require('@zeit/next-sass')
const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({})

module.exports = withSass({
  webpack (config, options) {
    config.resolve.alias[''] = path.join(__dirname, '')
    return config
  },
  sassLoaderOptions: {
    includePaths: ["/static/style/main.scss"]
  }
})
