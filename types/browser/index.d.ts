declare enum EVENTTYPES {
  XHR = 'xhr',
  FETCH = 'fetch',
  CONSOLE = 'console',
  CLICK = 'click',
  SCROLL= 'scroll',
  HISTORY = 'history',
  ERROR = 'error',
  HASHCHANGE = 'hashchange',
  UNHANDLEDREJECTION = 'unhandledrejection',
  MITO = 'mito',
  VUE = 'Vue',
  // for miniprogram
  MINI_ROUTE = 'miniRoute',
  MINI_PERFORMANCE = 'miniPerformance',
  MINI_MEMORY_WARNING = 'miniMemoryWarning',
  MINI_NETWORK_STATUS_CHANGE = 'miniNetworkStatusChange',
  MINI_BATTERY_INFO = 'miniBatteryInfo'
}
interface ReplaceHandler{
  callback:(data:any)=> void;
  type:EVENTTYPES;
  target?: HTMLElement // 需要监听的元素
}

