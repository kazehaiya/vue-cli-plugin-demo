
module.exports = (api, options) => {
  const webpack = require('webpack');
  const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

  if (options && options.pluginOptions) {
    // 此为 generator 生成的那个 test属性
    const userDll = options.pluginOptions.test || {};
    const { outputPath = "public/vendor" } = userDll;

    api.configureWebpack(config => {
      // 设置忽略打包的 vender 文件，添加已打包文件
      config.plugins.push(new webpack.DllReferencePlugin({
        context: api.getCwd(),
        manifest: require(api.resolve(`${outputPath}/manifest.json`))
      }));
      // 将 dll 生成的 vender 自动注入到 html 文件中
      config.plugins.push(new AddAssetHtmlPlugin({
        // dll文件位置
        filepath: api.resolve(`${outputPath}/*.js`),
        // dll 引用 dist 路径
        publicPath: 'js',
        // dll最终打包到的 dist 目录位置
        outputPath: 'js'
      }));
    })
  }
}