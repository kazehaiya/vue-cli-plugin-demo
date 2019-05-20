// 注入 script 命令，vue invoke 时调用（未支持 preset）
// dll:test 需要与 defaultMode 部分的指令一致
// vue-cli-service 后的 test 需要与 pluginOptions 部分保持一致
module.exports = (api, options, rootOptions) => {
  const {
    outputName = 'vendor',
    outputPath = "public/vendor",
    noCache = true
  } = options;

  api.extendPackage({
    scripts: {
      'dll:test': 'vue-cli-service test'
    },
    vue: {
      pluginOptions: {
        test: {
          // 打包的插件
          vendors: [],
          // 打包文件名
          outputName,
          // 打包文件输出地址
          outputPath,
          // 是否缓存先前打包的文件
          noCache,
          // 非开发环境不注入 DllReferencePlugin 配置（否则会影响错误捕获和 devtool 开启）
          open: process.env.NODE_ENV === 'production'
        }
      }
    }
  })
}