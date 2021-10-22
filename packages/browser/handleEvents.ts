import transportData from "core/transportData";
import breadcrumb, { BREADCRUMB_TYPES } from "core/breadcrumb";
import { ReportDataType } from "core/index";
// 针对不同事件类型进行数据上报
const HandleEvents = {
    handleHttp(data) {
        breadcrumb.push({
            type: BREADCRUMB_TYPES.HTTP,
            data,
        });
        transportData.send({
            type: ReportDataType.TRACK,
            data,
        });
    },
    // 记录点击事件数据
    handleClick(data: any) {
        breadcrumb.push({
            type: BREADCRUMB_TYPES.CLICK,
            data,
        });
        transportData.send({
            type: ReportDataType.TRACK,
            data,
        });
    },
    handleScroll(data: any) {
        breadcrumb.push({
            type: BREADCRUMB_TYPES.SCROLL,
            data,
        });
        transportData.send({
            type: ReportDataType.TRACK,
            data,
        });
    },
    handleError(data: any) {
        const info = {
            errorArgsList: data,
        };
        breadcrumb.push({
            type: BREADCRUMB_TYPES.ERROR,
            data: info,
        });
        transportData.send({
            type: ReportDataType.ERROR,
            data: info,
        });
    },
    handleHistory(data: any) {
        // 处理 history 路由变化
        let info = {
            type: BREADCRUMB_TYPES.HISTORY,
            category: breadcrumb.getCategory(BREADCRUMB_TYPES.HISTORY),
            data,
        };
        breadcrumb.push(info);
        transportData.send({
            type: ReportDataType.TRACK,
            data: info,
        });
    },
    handleHashChange(data: any) {
        let info = {
            type: BREADCRUMB_TYPES.HASH_CHANGE,
            category: breadcrumb.getCategory(BREADCRUMB_TYPES.HASH_CHANGE),
            data,
        };
        breadcrumb.push(info);
        transportData.send({
            type: ReportDataType.TRACK,
            data: info,
        });
    },
    handleLog(data) {
        breadcrumb.push({
            type: BREADCRUMB_TYPES.LOG,
            data,
        });
        transportData.send({
            type: ReportDataType.TRACK,
            data,
        });
    },
    handleUnhandleRejection() {},
};
export default HandleEvents;
