import {Queue} from 'utils/index'
import looger from 'utils/logger'
import { validateOption } from '../utils/helpers';
export enum ReportDataType  {
  TRACK = 0,
  ERROR = 1
}
export enum UploadType {
  IMAGE = 0,
  XHR = 1,
  BEACON = 2
}
export class TransportData {
  queue!: Queue
  errorDsn = ''
  trackDsn = ''
  uploadType = UploadType.BEACON
  constructor() {
    this.queue = new Queue()
    this.uploadType = Boolean(navigator.sendBeacon) ? UploadType.BEACON : UploadType.IMAGE
  }
  imgRequest(data:any,url:string) {
    const requestFun = () => {
      let img:null | HTMLImageElement = new Image()
      // 添加后缀分割符
      const spliceStr = url.indexOf('?') === -1 ? '?' : '&'
      img.src = `${url}${spliceStr}data=${encodeURIComponent(JSON.stringify(data))}`
      img = null 
    }
    this.queue.addFn(requestFun)
  }
  async xhrPost(data:any,url:string) {
    const requestFun = () => {
      let xhr = new XMLHttpRequest()
      xhr.open('post',url)
      xhr.send(data)
      xhr.setRequestHeader('Content-type','application/json;charset=UTF-8')
      xhr.withCredentials = true
      xhr.send(JSON.stringify(data))
    }
    this.queue.addFn(requestFun)
  }
  async beacon(data:any,url:string) {
    navigator.sendBeacon(url,JSON.stringify(data))
  }
  // 数据上报函数
  async send(data:ReportData){
    let dsn = ''
    if(data.type === ReportDataType.TRACK) {
      dsn = this.trackDsn
    }else if(data.type === ReportDataType.ERROR) {
      dsn = this.errorDsn
    }else{
      looger.error('没有设置错误上报的 dsn 和埋点上报的 dsn 地址，请在 init 中传入')
      return 
    }
    switch(this.uploadType) {
      case UploadType.IMAGE:
        this.imgRequest({...data,uploadType:UploadType.IMAGE},dsn)
        break;
      case UploadType.XHR:
        this.xhrPost({...data,uploadType:UploadType.XHR},dsn)
        break;
      case UploadType.BEACON:
        this.beacon({...data,uploadType:UploadType.XHR},dsn)
      
    }
    
  }
  bindOptions(options:InitOptions) {
    const {
      errorDsn,
      trackDsn,
      uploadType
    } = options
    validateOption(uploadType,'uploadType','string') && (this.uploadType = uploadType)
    validateOption(errorDsn, 'errorDsn', 'string') && (this.errorDsn = errorDsn)
    validateOption(trackDsn, 'trackDsn', 'string') && (this.trackDsn = trackDsn)
  }
}

export default new TransportData()