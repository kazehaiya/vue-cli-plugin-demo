import fs from 'fs';
import path from 'path';

// 获取对应 vendor 插件的地址
function getVendorPath(filePath) {
  return path.resolve(process.cwd(), filePath);
}

export function hasVendor(filePath) {
  return fs.existsSync(getVendorPath(filePath));
}