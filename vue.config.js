module.exports = {
  pluginOptions: {
    dll: {
      entry: 'vendor',
      filePath: './public/vendor',
      files: [
        'vue/dist/vue.runtime.esm.js',
        'vue-router',
        'vuex'
      ],
      noCache: true
    }
  }
}
