import { addReplaceHandler } from "./replace";
import { htmlElementAsString, getWindowHeight } from "utils/browser";
import { EVENTTYPES  } from "shared/constant";
export function setupReplace():void {
  addReplaceHandler({
    callback: (res) => {
      const htmlString = htmlElementAsString(res.data.target as HTMLElement)
      if (htmlString ) {
        console.log('htmlString')
      }
    },
    type: EVENTTYPES.CLICK
  })
  addReplaceHandler({
    callback: res => {
      const scrollTop = res.data.target.scrollTop
      console.log('scrollTop',scrollTop)
      let docHeight = getWindowHeight()
      if(scrollTop / docHeight >= 0.5) {
        console.log('阅读过半')
      }
    },
    type: EVENTTYPES.SCROLL
  })
}