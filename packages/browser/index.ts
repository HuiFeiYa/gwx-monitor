import { initOptions } from 'core/options';
import { setupReplace } from './load';
import WebVitals from 'web-performance/src/index';
import { _global } from '../utils/global';
import { variableTypeDetection } from '../utils/is';

export * from './load'
export * from './replace'

function init(options: InitOptions = {}) {
  if(!('XMLHttpRequest' in _global) || options.disabled) return 
  // 初始化配置
  initOptions(options)
  // 替换原生事件
  setupReplace()
  // 浏览器环境下进行性能监控
  if(variableTypeDetection.isWindow(_global)) {
    new WebVitals({
      appId:'gwx-test',
      version: '1.0.0',
      reportCallback:console.log,
      immediately:true
    })
  }
}
export {
  init
}