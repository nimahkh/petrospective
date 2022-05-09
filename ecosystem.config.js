module.exports = {
  name: 'petrospective',
  script: 'serve',
  env_production: {
    PM2_SERVE_PATH: './dist',
    PM2_SERVE_SPA: true,
    PM2_SERVE_HOMEPAGE: '/index.html'
  },
}
