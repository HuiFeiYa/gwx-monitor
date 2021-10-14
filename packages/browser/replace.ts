import { throttle } from "utils/helpers";
import { triggerHandlers } from "core/subscribe";
import options from 'core/options'
import { on } from 'utils/helpers';
import { EVENTTYPES } from "shared/constant";
import { subscribeEvent } from '../core/subscribe';
export function addReplaceHandler(hanlder:ReplaceHandler){
  // 先判断该类型事件是否已经替换
  if(!subscribeEvent(hanlder)) return 
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
function replace(type:EVENTTYPES,target = document.body) {
  switch (type) {
    case EVENTTYPES.CLICK:
      clickReplace()
      break;
    case EVENTTYPES.SCROLL:
      scrollReplace(target)
      break;
  }
}