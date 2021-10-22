const PREFIX = "MITO Logger";
export class Logger {
    private _console: Console = {} as Console;
    constructor() {
        const logType = ["log", "debug", "info", "warn", "error", "assert"];
        logType.forEach((level) => {
            this._console[level] = window.console[level];
        });
    }
    error(...args: any[]) {
        this._console.error(`${PREFIX}[Error]:`, ...args);
    }
    log(...args: any[]) {
        this._console.log(`${PREFIX}[Log]:`, ...args);
    }
}
const logger = new Logger();
export default logger;
