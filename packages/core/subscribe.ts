import { nativeTryCatch } from 'utils/exception';
import logger from 'utils/logger'
type ReplaceCallback = (data: any) => void
// 收集所有类型事件，每个事件类型是一个数组
const handlers: { [key in EVENTTYPES]?: ReplaceCallback[]} = {}
// 触发对应事件类型的所有事件
export function triggerHandlers(type: EVENTTYPES,data:any) {
  // 如果类型不存在于 handlers 中结束
  if(!type || !handlers[type])return
  handlers[type]?.forEach(callback=> {
    nativeTryCatch(
      ()=>{callback(data)},
      (e)=>{
        logger.error(`重写事件triggerHandlers的回调函数发生错误\nType:${type}\nName:${callback.name}\nError:${e}`)
      }
    )
  })
}