export interface IMetrics {
    name: string;
    value: any;
}
export interface IMetricsObj {
    [prop: string]: IMetrics;
}
export interface IReportHandler {
    (metrics: IMetrics | IMetricsObj): void;
}
export interface IReportData {
    sectionId: string;
    appId?: string;
    version?: string;
    data: IMetrics | IMetricsObj;
    timestamp: number;
}
export interface IConfig {
    appId: string;
    version: string;
    reportCallback: Function;
    reportUri?: string;
    immediately?: boolean;
    customPaintMetrics?: string;
    logFpsCount?: number;
}
