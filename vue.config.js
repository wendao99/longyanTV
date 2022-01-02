// const registerRouter = require('./backend/router')

module.exports = {
  devServer:{
    host: 'longyan-tv.vercel.app',
    disableHostCheck,
    proxy:{
      '^/api':{
        target:'http://120.25.75.58:8889',
        changeOrigin:true,
        pathRewrite:{
          '^/api': ''
        }
      }
    }
  },
  // configureWebpack: (config) => {
  //   if (process.env.npm_config_report) {
  //     const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  //     config.plugins.push(new BundleAnalyzerPlugin())
  //   }
  // },
  // productionSourceMap: false,
  // publicPath: process.env.NODE_ENV === 'production' ? '/music-next/' : '/'
}
