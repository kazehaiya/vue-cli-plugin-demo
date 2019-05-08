const Init = require('./service/init-file');

module.exports = (api, options) => {
  // 检验 vue.config.js 文件十分存在，不存在则创建文件
  Init(api, options);
  // 更改 vue.config.js 文件的部分配置
}

// 为注册的插件命令提供特定的模式： production
module.exports.defaultModes = {
  'dll:test': 'production'
}