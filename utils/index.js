const fs = require('fs');
const path = require('path');

// 获取对应 vendor 插件的地址
function getVendorPath(filePath) {
  return path.resolve(process.cwd(), 'node_modules', filePath);
}

function hasVendor(filePath) {
  return fs.existsSync(getVendorPath(filePath));
}

exports.hasVendor = hasVendor;