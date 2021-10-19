import { afterLoad,beforeUnload, unload } from './utils/index'
import MetricsStore from './lib/store'
import createReporter from './lib/createReporter'
import { metricsName } from './constants/index';
import { IConfig } from './types/index';
import generateUniqueID from './utils/generateUniquelD';

// 管理 performance 相关数据
let metricsStore: MetricsStore
let reporter :ReturnType<typeof createReporter> // 上报函数
export default class WebVitals {
  constructor(config: IConfig) {
    const { appId, version, reportCallback, reportUri = null, immediately = false, customPaintMetrics = null, logFpsCount = 5 } = config
    // 创建 store 实例
    metricsStore = new MetricsStore(reporter)
    // 生成唯一 id
    const sectionId = generateUniqueID()
    // 创建上报函数
    reporter = createReporter(sectionId, appId, version, reportCallback)
    // 加载完成
    afterLoad(()=> {

    })
    // 页面卸载，路由切换并不会触发。跳转外链。
    ;[beforeUnload,unload].forEach(hanlder => {
      hanlder(()=> {
        const metrics = this.getCurrentMetrics()
        console.log('metrics',metrics)
      })
    });
  }
  // 返回 store 存储的所有数据
  getCurrentMetrics() {
    return metricsStore.getValues()
  }
}

