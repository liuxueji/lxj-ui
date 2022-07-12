const path = require('path')
module.exports = {
  pages: {
    index: {
      // 修改项目入口文件
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展webpack配置,使webpages加入编译
  chainWebpack: config => {
    config.module
      .rule('js') // 对所以的js做了处理，就是高版本语法转成低版本语法
      .include.add(path.resolve(__dirname, 'packages')).end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
  },
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
  },
  lintOnSave: false

}
