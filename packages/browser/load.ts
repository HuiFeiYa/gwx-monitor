import { addReplaceHandler } from "./replace";
import { htmlElementAsString } from "utils/browser";
export function setupReplace():void {
  addReplaceHandler({
    callback: (data) => {
      const htmlString = htmlElementAsString(data.data.activeElement as HTMLElement)
      if (htmlString) {
        console.log('htmlString')
      }
    },
    type: EVENTTYPES.DOM
  })
}