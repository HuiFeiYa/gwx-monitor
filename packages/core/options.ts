import transportData from "./transportData";
//import { validateOption } from "utils/helpers"
export class Options {
    beforeAppAjaxSend: Function = () => {};
    enableTraceId: Boolean;
    filterXhrUrlRegExp!: RegExp;
    includeHttpUrlTraceIdRegExp!: RegExp;
    traceIdFieldName = "Trace-Id";
    throttleDelayTime = 200;
    maxDuplicateCount = 2;
    // wx-mini
    appOnLaunch: Function = () => {};
    appOnShow: Function = () => {};
    onPageNotFound: Function = () => {};
    appOnHide: Function = () => {};
    pageOnUnload: Function = () => {};
    pageOnShow: Function = () => {};
    pageOnHide: Function = () => {};
    onShareAppMessage: Function = () => {};
    onShareTimeline: Function = () => {};
    onTabItemTap: Function = () => {};
    // need return opitons，so defaul value is undefined
    wxNavigateToMiniProgram!: Function;
    triggerWxEvent: Function = () => {};

    constructor() {
        this.enableTraceId = false;
    }
    bindOptions(options: InitOptions = {}): void {
        const { throttleDelayTime } = options;
        throttleDelayTime && (this.throttleDelayTime = throttleDelayTime);
    }
}
export default new Options();

export function initOptions(options: InitOptions) {
    transportData.bindOptions(options);
}
