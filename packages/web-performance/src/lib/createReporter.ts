import { IReportData, IMetrics, IMetricsObj,IReportHandler } from '../types/index';
// 返回一个函数类型为 IReportHandler
function createReporter(sectionId: string, appId: string, version: string, callback: Function): IReportHandler {
  return (data:IMetrics| IMetricsObj) =>  {
    const reportData: IReportData = {
      sectionId,
      appId,
      version,
      data,
      timestamp: +new Date()
    }
    if('requestIdleCallback' in window) {
      // 空闲时候执行 callback 函数，最多延迟 3s 添加到主线程中
      window.requestIdleCallback(
        () => {
          callback(reportData)
        },
        {
          timeout:3000
        }
      )
    } else {
      callback(reportData)
    }
  }
}
export default   createReporter