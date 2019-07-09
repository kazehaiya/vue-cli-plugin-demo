const { log, logWithSpinner, done, stopSpinner } = require('@vue/cli-shared-utils')

module.exports = (api, options) => {
  const path = require('path');
  // 导入 webpack-chain 模块，该模块导出了一个用于创建一个webpack配置API的单一构造函数。
  const webpack = require('webpack');
  const Config = require('webpack-chain');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  // 对该单一构造函数创建一个新的配置实例
  const config = new Config();
  // 获取 package.json
  const packageJson = require(api.resolve('package.json'));
  const DEPEND = packageJson.dependencies || {};
  const DEV_DEPEND = packageJson.devDependencies || {};

  api.registerCommand(
    "test",
    {
      description: "此为指令的说明",
      usage: "vue-cli-service test",
      options: {
        '--ignore': 'use default config of dll-plugins'
      }
    },
    async args => {
      logWithSpinner("Your run the test command, let's pack the dll!");

      const userDll = options.pluginOptions.test || {};
      const {
        vendors = [],
        outputName = 'vendor',
        outputPath = "public/vendor",
        noCache = true
      } = userDll;

      // 至少需要打包一个
      if (!vendors.length) {
        log('你没有需要预打包的内容！');
        process.exit(0);
      }

      // 配置 mode
      config.mode('production');
      // 配置 entry
      vendors.forEach(pack => {
        // 验证是否包含此包
        const vendorContent = DEPEND[pack] || DEV_DEPEND[pack];
        vendorContent ? config.entry(outputName).add(pack) : log(`The package '${pack}' isn't found, passed`)
      });
      // 配置 output
      config.output
        .filename('[name].dll.[hash:8].js')
        .library('[name]_[hash]')
        .path(api.resolve(outputPath));
      // 配置 plugins
      // 根据设置来添加清除插件
      if (noCache) {
        config.plugin('cleanCache').use(new CleanWebpackPlugin({}))
      }
      // 配置 dllPlugins
      config.plugin('dllPlugsins').use(new webpack.DllPlugin({
        context: api.getCwd(),
        path: path.join(api.getCwd(), outputPath, 'manifest.json'),
        // 保持与 output.library 中名称一致
        name: '[name]_[hash]'
      }));

      // 获取生成的配置
      const result = config.toConfig();

      // 构建我们的 dll 包
      webpack(result, (err, stats) => {
        stopSpinner(false);
        log();
        if (err) {
          log(err);
          return false;
        } else {
          log('Build complete');
          done('');
        }
      });

    })
}