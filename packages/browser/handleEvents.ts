import transportData from "core/transportData"
import breadcrumb, { BREADCRUMB_TYPES} from 'core/breadcrumb'
// 针对不同事件类型进行数据上报
const HandleEvents = {
  handleHttp() {

  },
  // 记录点击事件数据
  handleClick(data:any) {
    breadcrumb.push({
      type: BREADCRUMB_TYPES.CLICK,
    })
    transportData.send({
      type:0,
      data
    })
  },
  handleScroll(data:any) {
    breadcrumb.push({
      type: BREADCRUMB_TYPES.SCROLL,
    })
    transportData.send({
      type: 0,
      data
    })
  },
  handleError() {

  },
  handleHistory() {

  },
  handleHashChange() {

  },
  handleUnhandleRejection() {

  }
}
export default HandleEvents