import logger  from './logger'
export function on(
  target: EventTarget,
  eventName: keyof GlobalEventHandlersEventMap | keyof WindowEventMap, 
  handler: EventListenerOrEventListenerObject,
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
export function getLocationHref(){
  if(typeof document === 'undefined' || !document.location) {
    return ''
  }
  return document.location.href 
}
/**
 * 替换目标对象下的属性
 * @param source 替换对象
 * @param name  替换对象属性，默认认为是一个函数
 * @param replacement 替换对象属性时执行函数，接受原属性的值
 * @param isForced 是否强制替换
 * @returns 
 */
export function replaceOld(source:any,name: string, replacement:Callback, isForced = true) {
  if(source === undefined) return 
  if(name in source || isForced) {
    const original = source[name]
    const wrapped = replacement(original)
    if(typeof wrapped === 'function') {
      source[name] = wrapped
    }
  }
}
export function getTimeStamp() {
  return Date.now()
}