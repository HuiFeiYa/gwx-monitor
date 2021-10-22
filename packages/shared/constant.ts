/**
 * 重写的事件类型
 */
export enum EVENTTYPES {
    XHR = "xhr",
    FETCH = "fetch",
    CONSOLE = "console",
    CLICK = "click",
    SCROLL = "scroll",
    HISTORY = "history",
    ERROR = "error",
    LOG = "log",
    HASHCHANGE = "hashchange",
    UNHANDLEDREJECTION = "unhandledrejection",
    MITO = "mito",
    VUE = "Vue",
    // for miniprogram
    MINI_ROUTE = "miniRoute",
    MINI_PERFORMANCE = "miniPerformance",
    MINI_MEMORY_WARNING = "miniMemoryWarning",
    MINI_NETWORK_STATUS_CHANGE = "miniNetworkStatusChange",
    MINI_BATTERY_INFO = "miniBatteryInfo",
}
export enum HTTP_TYPE {
    XHR = "xhr",
    FETCH = "fetch",
}
