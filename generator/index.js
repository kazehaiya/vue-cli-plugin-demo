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
          vendors: [],
          outputName,
          outputPath,
          noCache
        }
      }
    }
  })
}