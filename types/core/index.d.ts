declare enum UploadType {
  IMAGE = 0,
  XHR = 1,
  BEACON = 2
}
interface InitOptions  {
  uploadType?: UploadType
  /**
   * 错误监控的dsn服务器地址
   */
  errorDsn?: string
  /**
   * 为true时，整个sdk将禁用
   */
  disabled?: boolean
  /**
   * 每个项目有一个唯一key，给监控的dsn用的
   */
  apikey?: string
  /**
   * 使用img上报的方式，默认为false，默认是xhr的上报方式
   */
  useImgUpload?: boolean
  /**
   * 每个项目有一个唯一trackKey，给埋点的dsn用的
   */
  trackKey?: string
  /**
   * 默认为关闭，为true是会打印一些信息：breadcrumb
   */
  debug?: boolean
  /**
   * 默认是关闭traceId，开启时，页面的所有请求都会生成一个uuid，放入请求头中
   */
  enableTraceId?: boolean
  /**
   * 如果开启了enableTraceId,也需要配置该配置项，includeHttpUrlTraceIdRegExp.test(xhr.url)为true时，才会在该请求头中添加traceId
   * 由于考虑部分接口如果随便加上多余的请求头会造成跨域，所以这边用的是包含关系的正则
   */
  includeHttpUrlTraceIdRegExp?: RegExp
  /**
   * traceId放入请求头中的key，默认是Trace-Id
   */
  traceIdFieldName?: string
  /**
   * 默认为空，所有ajax都会被监听，不为空时，filterXhrUrlRegExp.test(xhr.url)为true时过滤
   */
  filterXhrUrlRegExp?: RegExp
  /**
   * 忽视某些错误不上传
   */
  // ignoreErrors?: Array<string | RegExp>
  /**
   * 默认20，最大100，超过100还是设置成100
   */
  maxBreadcrumbs?: number
  /**
   * 按钮点击和微信触摸事件节流时间，默认是0
   */
  throttleDelayTime?: number
  /**
   * 在引入wx-mini的情况下，使用该参数用来开启
   */
  enableTrack?: boolean
  /**
   * 在开启enableBury后，将所有埋点信息上报到该服务端地址，如果该属性有值时才会启动无痕埋点
   */
  trackDsn?: string
  /**
   * 最多可重复上报同一个错误的次数
   */
  maxDuplicateCount?: number
}
