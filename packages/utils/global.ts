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