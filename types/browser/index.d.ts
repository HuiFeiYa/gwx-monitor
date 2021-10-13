declare enum EVENTTYPES {
  XHR = "xhr",
  FETCH = "fetch",
  CONSOLE = "console",
  DOM = "dom",
  HISTORY = "history",
  ERROR = "error",
  HASHCHANGE = "hashchange",
  UNHANDLEDREJECTION = "unhandledrejection",
  MITO = "mito",
  VUE = "Vue",
  MINI_ROUTE = "miniRoute",
  MINI_PERFORMANCE = "miniPerformance",
  MINI_MEMORY_WARNING = "miniMemoryWarning",
  MINI_NETWORK_STATUS_CHANGE = "miniNetworkStatusChange",
  MINI_BATTERY_INFO = "miniBatteryInfo"
}
interface ReplaceHanlder{
  hanlder:(data:any)=> void;
  type:EVENTTYPES
}

