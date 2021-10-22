
import { validateOption } from '../utils/helpers';
import { BREADCRUMB_TYPES,BREADCRUMB_CATEGORYS } from './constant'
interface BreadcrumbPushData {
  type: BREADCRUMB_TYPES;
  time?: number;
  data:any;
  category?:string;
}
class Breadcrumb {
  maxBreadcrumbs = 10
  stack:BreadcrumbPushData[] = []
  push(data: BreadcrumbPushData) {
    this.immediatePush(data)
  }
  immediatePush(data: BreadcrumbPushData) {

    data.time || (data.time = Date.now())
    if(this.stack.length >= this.maxBreadcrumbs) {
      this.stack.shift()
    }
    this.stack.push(data)
    this.stack.sort((a,b) => {
      if( a.time && b.time) {
        return a.time - b.time
      }else {
        return -1
      }
    })
    //logger.log(this.stack)
  }
  clear() {
    this.stack = []
  }
  getCategory(type: BREADCRUMB_TYPES) {
    
    if(type === BREADCRUMB_TYPES.CLICK) {
      return BREADCRUMB_CATEGORYS.USER
    }else if(type === BREADCRUMB_TYPES.HISTORY) {
      return BREADCRUMB_CATEGORYS.ROUTER
    }else{
      return BREADCRUMB_CATEGORYS.EXCEPTION
    }
  }
  bindOptions(options: InitOptions = {}) {
    const { maxBreadcrumbs } = options
    validateOption(maxBreadcrumbs,'maxBreadcrumbs','number') && (this.maxBreadcrumbs = maxBreadcrumbs)
  }
}
export default new Breadcrumb()