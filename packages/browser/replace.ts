import { triggerHandlers } from "core/subscribe";
import options from 'core/options'
import { _global, on, throttle, getLocationHref, replaceOld,calcStayTime, getTimeStamp } from 'utils/index';
import { EVENTTYPES } from "shared/constant";
import { subscribeEvent } from '../core/subscribe';
import { variableTypeDetection } from '../utils/is';
import { HTTP_TYPE } from 'shared/index'
/**
 * 通过 addReplaceHandler 将指定类型的事件存储在 handlers 中
 * @param hanlder 
 * @returns 
 */
export function addReplaceHandler(hanlder:ReplaceHandler){
  // 先判断该类型事件是否已经替换
  if(!subscribeEvent(hanlder)) return 
  // 替换原生事件，
  // 将 triggerHanlders 触发指定类型事件，在 replace 事件中触发指定类型事件。
  replace(hanlder.type,{
    classList:hanlder.classList ? hanlder.classList: []
  })
}

/**
 * 点击事件监听
 */
function clickReplace() {
  const clickThrottle = throttle(triggerHandlers,options.throttleDelayTime)
  on(
    document,
    'click',
    function (this:any,e:any) {
      // 传递给 triggerHandlers 的参数
      // 触发 handlers 事件 map 中的 DOM 事件
      clickThrottle(EVENTTYPES.CLICK, {
        category: 'click', // 事件类型
        data: e // 将 dom 传递给 callback 函数
      })
    },
    true
  )
}

/**
 * 滚动事件监听,给多个元素设置滚动监听
 * @param targetList 
 */
function scrollReplace(targetList) {
  const scrollThrottle = throttle(triggerHandlers,options.throttleDelayTime)
  targetList.forEach(ele => {
    on(
        ele,
        'scroll',
        function (this:any,e) {
          scrollThrottle(
            EVENTTYPES.SCROLL,
            {
              category: 'scroll',
              data: {
                originEvent:e
              }
            }
          )
        },
        true
      )
  })
}

/**
 * history 事件监听
 */
let lastHref = getLocationHref()
function historyReplace() {
  function historyReplaceFn(originalHistoryFn:(...args:any[])=>void) {
    return function(this:History,...args:any[]) {
      let url = args[2]
      if(url) {
        // 路径是否携带 http 协议
        url = url.indexOf('http') !== -1 ? url : (location.origin + url)
        console.log('url',url)
        const from = lastHref
        const to =  String(url)
      
        lastHref = to 
        // 无论是 popstate 事件触发还是 pushState、replaceState 都触发 history 事件
        triggerHandlers(
          EVENTTYPES.HISTORY, 
          {
             from, 
             to,
             ...calcStayTime.calc()
          }
        )
      }
      // 执行原生 history 相关的 api
      return originalHistoryFn.apply(this,args)
    }
  }
  if(variableTypeDetection.isWindow(_global)) {
    const oldOnpopstate = _global.onpopstate
    // 监听 popstate 事件
    _global.onpopstate = function (this:WindowEventHandlers,e:PopStateEvent ) {
      const to = getLocationHref()
      const from = lastHref
      // 更新上一次路径
      lastHref = to 
      // 触发传入 handlers 的 callback 函数
      triggerHandlers(
        EVENTTYPES.HISTORY, 
        {
           from, 
           to,
           ...calcStayTime.calc()
        }
      )
      oldOnpopstate && oldOnpopstate.apply(this,[e])
    } 
    // 拦截 history.pushState(state, title[, url]) 事件
    replaceOld(_global.history,'pushState', historyReplaceFn)
    // 拦截 history.replaceState(stateObj,title [,url]) 事件
    replaceOld(_global.history, 'replaceState', historyReplaceFn)
  }

}

/**
 * 监听 hash 变化
 */
function hashReplace() {
  if(variableTypeDetection.isWindow(_global)) {
    on(_global, EVENTTYPES.HASHCHANGE, function(e){
      const to = getLocationHref()
      const from = lastHref
      // 更新上一次路径
      lastHref = to 
      triggerHandlers(EVENTTYPES.HASHCHANGE, {
        from,
        to,
        ...calcStayTime.calc()
      })
    })
  }
}
interface ReplaceOptions {
  classList?: string[]
}
function xhrReplace() {
  if(!('XMLHttpRequest' in _global)){
    return 
  }
  const originalXhrProto = XMLHttpRequest.prototype
  // 请求参数
  let reqConfig:{
    method:string;url:string;sTime:number;type:HTTP_TYPE;body?:any
  }
  let reqHeader: {
    [propName:string]: any
  } = {}
  // 替换 XMLHttpRequest 原生 open 事件
  replaceOld(originalXhrProto,'open',(originalOpen)=>{
    // 返回函数替换原 originalOpen 事件 xhr.open(method,url,async)
    return function(this:XMLHttpRequest,...args:any[]) {
      const [method,url] = args
      reqConfig = {
        method,
        url,
        sTime: getTimeStamp(),
        type: HTTP_TYPE.XHR
      }
      originalOpen.apply(this,args)
    }
  })
  // 拦截请求头数据
  replaceOld(originalXhrProto,'setRequestHeader', originalSetRequestHeader => {
    return function (this:XMLHttpRequest,header,value) {
      reqHeader[header] = value
      originalSetRequestHeader.call(this,header,value)
    }
  })
  // 拦截 body 值
  replaceOld(originalXhrProto, 'send', originalSend => {
    // xhr.send(body)
    return function (this:XMLHttpRequest,body:any) {
      reqConfig.body = body
      originalSend.apply(this,body)
      
      // 设置监听事件
      this.addEventListener('error',error=> {
        console.log(error)
      })
      this.addEventListener('loadend', (res:ProgressEvent) => {
        const { response, status,responseText,responseURL } = res.target as XMLHttpRequest
        const resConfig = {
          elapsedTime: getTimeStamp() - reqConfig.sTime,
          status,
          responseURL,
          responseText,
          response
        }
        triggerHandlers(EVENTTYPES.XHR, {
          resConfig,
          reqConfig,
          reqHeader
        })
      })
    }
  })


}1
function fetchReplace() {

}
function replace(
  type:EVENTTYPES, 
  options: ReplaceOptions
 ) {
  let scrollTargetList:Element[] = []
  const { classList } = options
  if(classList) {
    classList.forEach((key:string)=> {
      scrollTargetList.push(...Array.from(document.querySelectorAll(key)))
    })
  }
  switch (type) {
    case EVENTTYPES.XHR:
      xhrReplace()
      break;
    case EVENTTYPES.FETCH:
      fetchReplace()
      break;
    case EVENTTYPES.CLICK:
      clickReplace()
      break;
    case EVENTTYPES.SCROLL:
      scrollReplace([document.body as Element].concat(scrollTargetList))
      break;
    case EVENTTYPES.HISTORY: 
      historyReplace()
      break;
    case EVENTTYPES.HASHCHANGE:
      hashReplace()
      break;
  }
}
