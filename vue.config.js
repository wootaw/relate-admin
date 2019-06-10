module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
    } else {
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}