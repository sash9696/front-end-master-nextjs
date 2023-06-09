/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
})

module.exports = withPWA({
  images: {
    domains: ['media.graphassets.com'],
  },
  reactStrictMode: true,
  // additional config
})
