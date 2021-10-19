import { addReplaceHandler } from "./replace";
import { htmlElementAsString, getWindowHeight } from "utils/browser";
import { EVENTTYPES  } from "shared/constant";
import handleEvents from './handleEvents';

export function setupReplace():void {
  addReplaceHandler({
    callback: (res) => {
      // 触发 click 上报事件
      handleEvents.handleClick(res)
      const htmlString = htmlElementAsString(res.data.target as HTMLElement)
      if (htmlString ) {
        console.log('htmlString')
      }
    },
    type: EVENTTYPES.CLICK
  })
  addReplaceHandler({
    callback: res => {
      const target = res.data.originEvent.target
      const scrollTop = target.scrollTop
      console.log('scrollTop',scrollTop,target.tagName)
      const blockElements = document.getElementsByClassName('mto-scroll-b') // 获取区块元素
      const nestBlockElement = document.getElementsByClassName('mto-scroll-c') // 获取第二层嵌套的滚动元素
      // 区块
      const blockElementPos = Array.from(blockElements).map((item:any)=> {
        return {
          text: item.dataset['scrollB'],
          rect: item.getBoundingClientRect()
        }
      })
      // 内部滚动元素位置展示
      const nestBlockElementPos = Array.from(nestBlockElement).map((item:any)=> {
        return {
          text: item.dataset['scrollC'],
          rect: item.getBoundingClientRect()
        }
      })
      handleEvents.handleScroll({
        scrollTop, // 滚动高度
        container:target.tagName, // 滚动容器
        html:htmlElementAsString(target),
        blockElementPos, // 区块元素位置
        nestBlockElementPos, // 内部滚动元素位置展示
      })
      let docHeight = getWindowHeight()
      if(scrollTop / docHeight >= 0.5) {
        console.log('阅读过半')
      }
    },
    type: EVENTTYPES.SCROLL,
    classList: ['.content']
  })

  addReplaceHandler({
    callback: res => {
      handleEvents.handleHistory(res)
    },
    type: EVENTTYPES.HISTORY
  })
}