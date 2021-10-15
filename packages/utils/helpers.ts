import logger  from './logger'
export function on(
  target: EventTarget,
  eventName: keyof GlobalEventHandlersEventMap,
  handler: EventListenerOrEventListenerObject | null,
  options?: boolean
) {
  target.addEventListener(eventName, handler,options)
}
export const throttle = (fn:Function, delay: number) => {
  let canRun = true
  return function(this:any,...args){
    if(!canRun)return 
    canRun = false
    fn && fn.apply(this,args)
    setTimeout(() => {
      canRun = true
    }, delay);
  }
}
export function typeofAny(target:any, type: any) :boolean {
  return typeof target === type
}
export function validateOption<T>(target:any,targetName:string,expectType:T) : target is T {
  if(typeofAny(target,expectType)) {
    return true
  }
  typeof target !== 'undefined' && logger.error(`${targetName}期望传入${expectType}类型，目前是${typeof target}类型`)
  return false
}