import transportData from "core/transportData"
import breadcrumb, { BREADCRUMB_TYPES} from 'core/breadcrumb'
import { ReportDataType } from 'core/index'
// 针对不同事件类型进行数据上报
const HandleEvents = {
  handleHttp() {

  },
  // 记录点击事件数据
  handleClick(data:any) {
    breadcrumb.push({
      type: BREADCRUMB_TYPES.CLICK,
      data
    })
    transportData.send({
      type:ReportDataType.TRACK,
      data
    })
  },
  handleScroll(data:any) {
    breadcrumb.push({
      type: BREADCRUMB_TYPES.SCROLL,
      data
    })
    transportData.send({
      type: ReportDataType.TRACK,
      data
    })
  },
  handleError(data:any) {

  },
  handleHistory(data:any) {
    // 处理 history 路由变化
    const { from, to } = data
    breadcrumb.push({
      type: BREADCRUMB_TYPES.HISTORY,
      category: breadcrumb.getCategory(BREADCRUMB_TYPES.HISTORY),
      data:{
        from,
        to
      }
    })
    transportData.send({
      type: ReportDataType.TRACK,
      data
    })
  },
  handleHashChange(data:any) {
    breadcrumb.push({
      type: BREADCRUMB_TYPES.HASH_CHANGE,
      category: breadcrumb.getCategory(BREADCRUMB_TYPES.HASH_CHANGE),
      data: data
    })
    transportData.send({
      type: ReportDataType.TRACK,
      data
    })
  },
  handleUnhandleRejection() {

  }
}
export default HandleEvents