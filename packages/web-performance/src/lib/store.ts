import { metricsName } from "../constants/index";
import { IMetrics, IReportHandler, IMetricsObj } from "../types/index";
/**
 * 记录性能指标参数
 */
export default class metricsStore {
    state: Map<metricsName | string, IMetrics>;
    report: IReportHandler;
    constructor(report: IReportHandler) {
        this.state = new Map<metricsName | string, IMetrics>();
        this.report = report;
    }
    set(key: metricsName | string, value: IMetrics) {
        return this.state.set(key, value);
    }
    get(key: metricsName | string) {
        return this.state.get(key);
    }
    has(key: metricsName | string) {
        return this.state.has(key);
    }
    clear() {
        this.state.clear();
    }
    getValues(): IMetricsObj {
        return Array.from(this.state).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
    }
}
