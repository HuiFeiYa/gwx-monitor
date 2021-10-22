import {
    clickReplace,
    scrollReplace,
    historyReplace,
    hashReplace,
    xhrReplace,
    fetchReplace,
    errorReplace,
} from "./replaceHandle";
import { EVENTTYPES } from "shared/constant";
import { subscribeEvent } from "../core/subscribe";

/**
 * 通过 addReplaceHandler 将指定类型的事件存储在 handlers 中
 * @param hanlder
 * @returns
 */
export function addReplaceHandler(hanlder: ReplaceHandler) {
    // 先判断该类型事件是否已经替换
    if (!subscribeEvent(hanlder)) return;
    // 替换原生事件，
    // 将 triggerHanlders 触发指定类型事件，在 replace 事件中触发指定类型事件。
    replace(hanlder.type, {
        classList: hanlder.classList ? hanlder.classList : [],
    });
}

interface ReplaceOptions {
    classList?: string[];
}

function replace(type: EVENTTYPES, options: ReplaceOptions) {
    let scrollTargetList: Element[] = [];
    const { classList } = options;
    if (classList) {
        classList.forEach((key: string) => {
            scrollTargetList.push(
                ...Array.from(document.querySelectorAll(key))
            );
        });
    }
    switch (type) {
        case EVENTTYPES.XHR:
            xhrReplace();
            break;
        case EVENTTYPES.FETCH:
            fetchReplace();
            break;
        case EVENTTYPES.CLICK:
            clickReplace();
            break;
        case EVENTTYPES.SCROLL:
            scrollReplace([document.body as Element].concat(scrollTargetList));
            break;
        case EVENTTYPES.HISTORY:
            historyReplace();
            break;
        case EVENTTYPES.HASHCHANGE:
            hashReplace();
            break;
        case EVENTTYPES.ERROR:
            errorReplace();
            break;
    }
}
