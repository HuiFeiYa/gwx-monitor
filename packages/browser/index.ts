import { initOptions } from 'core/options';
import { setupReplace } from './load';
export * from './load'
export * from './replace'
function init(options: InitOptions = {}) {
  if(!('XMLHttpRequest' in window) || options.disabled) return 
  // 初始化配置
  initOptions(options)
  // 替换原生事件
  setupReplace()
}
export {
  init
}