declare enum ReportDataType {
    TRACK = 0,
    ERROR = 1,
}
interface ReportData {
    type: ReportDataType;
    data: any;
}
