import { variableTypeDetection } from "./is"
export const isNodeEnv = variableTypeDetection.isProcess(typeof process !== 'undefined' ? process : 0)
export const isWxMiniEnv = variableTypeDetection.isObject(typeof wx !== undefined ? wx : 0)
export const isBrowserEnv = variableTypeDetection.isWindow( typeof window !== undefined ? window : 0)

// 记录已经替换的原生事件类型
const replaceFlag = {}
// 获取某个原生事件是否替换
export function getFlag(replaceType:EVENTTYPES) :boolean {
  return replaceFlag[replaceType] ? true : false
}

// 设置某个原生事件是否被替换
export function setFlag(replaceType:EVENTTYPES,isSet:boolean) {
  if(replaceFlag[replaceType])return 
  replaceFlag[replaceType] = isSet
}
export function getGlobal() {
  if(isBrowserEnv) return window
  if(isWxMiniEnv) return wx 
  if(isNodeEnv) return process
  return window
}
export const _global = getGlobal()
