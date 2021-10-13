import { throttle } from "utils/helpers";
import { triggerHandlers } from "core/subscribe";
import options from 'core/options'
import { on } from 'utils/helpers';
import { EVENTTYPES } from "shared/constant";
import { subscribeEvent } from '../core/subscribe';
export function addReplaceHandler(hanlder:ReplaceHandler){
  // 先判断该类型事件是否已经替换
  if(!subscribeEvent(hanlder)) return 
  replace(hanlder.type)
}

function domReplace() {
  const clickThrottle = throttle(triggerHandlers,options.throttleDelayTime)
  on(
    document,
    'click',
    function (this:any) {
      // 传递给 triggerHandlers 的参数
      // 触发 handlers 事件 map 中的 DOM 事件
      clickThrottle(EVENTTYPES.DOM, {
        category: 'click', // 事件类型
        data: this // 将 dom 传递给 callback 函数
      })
    },
    true
  )
}

function replace(type:EVENTTYPES) {
  switch (type) {
    case EVENTTYPES.DOM:
      domReplace()
      break;
  }
}