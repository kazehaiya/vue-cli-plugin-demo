
module.exports = (api, options) => {
  const configFile = require('./service/config-file');
  const registCommand = require('./service/regist-command');

  // 更改 vue.config.js 文件的部分配置
  configFile(api, options);
  // 注册指令，使它能够通过 vue-cli-service 执行
  registCommand(api, options)
}

// 为注册的插件命令提供特定的模式： production
module.exports.defaultModes = {
  'dll:test': 'production'
}