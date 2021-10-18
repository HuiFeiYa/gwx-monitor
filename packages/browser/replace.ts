import { triggerHandlers } from "core/subscribe";
import options from 'core/options'
import { _global, on, throttle, getLocationHref, replaceOld } from 'utils/index';
import { EVENTTYPES } from "shared/constant";
import { subscribeEvent } from '../core/subscribe';
import { variableTypeDetection } from '../utils/is';
// 通过 addReplaceHandler 将指定类型的事件存储在 handlers 中
export function addReplaceHandler(hanlder:ReplaceHandler){
  // 先判断该类型事件是否已经替换
  if(!subscribeEvent(hanlder)) return 
  // 替换原生事件，
  // 将 triggerHanlders 触发指定类型事件，在 replace 事件中触发指定类型事件。
  replace(hanlder.type,hanlder.target)
}

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

function scrollReplace(target = document.body) {
  const scrollThrottle = throttle(triggerHandlers,options.throttleDelayTime)
  on(
      target,
      'scroll',
      function (this:any,e) {
        scrollThrottle(
          EVENTTYPES.SCROLL,
          {
            category: 'scroll',
            data: e
          }
        )
      },
      true
    )
}

let lastHref = getLocationHref()
function historyReplace() {
  function historyReplaceFn(originalHistoryFn:(...args:any[])=>void) {
    return function(this:History,...args:any[]) {
      const url = args[2]
      if(url) {
        const from = lastHref
        const to = location.origin + String(url)
        lastHref = to 
        // 无论是 popstate 事件触发还是 pushState、replaceState 都触发 history 事件
        triggerHandlers(EVENTTYPES.HISTORY, { from, to })
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
      triggerHandlers(EVENTTYPES.HISTORY, { from ,to })
      oldOnpopstate && oldOnpopstate.apply(this,[e])
    } 
    // 拦截 history.pushState(state, title[, url]) 事件
    replaceOld(_global.history,'pushState', historyReplaceFn)
    // 拦截 history.replaceState(stateObj,title [,url]) 事件
    replaceOld(_global.history, 'replaceState', historyReplaceFn)
  }

}
function replace(type:EVENTTYPES,target = document.body) {
  switch (type) {
    case EVENTTYPES.CLICK:
      clickReplace()
      break;
    case EVENTTYPES.SCROLL:
      scrollReplace(target)
      break;
    case EVENTTYPES.HISTORY: 
    historyReplace()
      break;
  }
}
