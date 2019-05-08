// 注入 script 命令，vue invoke 时调用（未支持 preset）
// dll:test 需要与 defaultMode 部分的指令一致
// vue-cli-service 后的 test 需要与 pluginOptions 部分保持一致
module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    scripts: {
      'dll:test': 'vue-cli-service test'
    },
    vue: {
      test: {
        vendors: ['vue/dist/vue.runtime.esm.js', 'vue-router', 'vuex'],
        outputName: 'vendor.dll.js',
        outputPath: './public/vendor',
        cleanCache: true
      }
    }
  })
}