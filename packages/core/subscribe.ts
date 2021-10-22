import { nativeTryCatch } from "utils/exception";
import logger from "utils/logger";
import { getFlag, setFlag } from "utils/index";
import { EVENTTYPES } from "shared/constant";
import { ReplaceCallback, Handlers } from "./constant";
// 收集所有类型事件，每个事件类型是一个数组
const handlers: Handlers = {};
export function getDataType(data: any) {
    return Object.prototype.toString.call(data).slice(8, -1);
}
export function isArray(data: any): data is ReplaceCallback[] {
    return getDataType(data) === "Array";
}
// 对指定类型事件进行订阅
export function subscribeEvent(handler: ReplaceHandler): boolean {
    if (!handler || getFlag(handler.type)) return false;
    setFlag(handler.type, true);
    handlers[handler.type] = handlers[handler.type] || [];
    handlers[handler.type]?.push(handler.callback);
    return true;
}

/**
 * 触发对应事件类型的所有事件
 * @param type
 * @param data
 * @returns
 */
export function triggerHandlers(type: EVENTTYPES, data: any) {
    // 如果类型不存在于 handlers 中结束
    if (!type || !handlers[type]) return;
    handlers[type]?.forEach((callback) => {
        nativeTryCatch(
            () => {
                callback(data);
            },
            (e) => {
                logger.error(
                    `重写事件triggerHandlers的回调函数发生错误\nType:${type}\nName:${callback.name}\nError:${e}`
                );
            }
        );
    });
}
