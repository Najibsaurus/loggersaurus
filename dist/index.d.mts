import { a as LoggerConfig, L as LogData } from './types-D_HhJ4CL.mjs';
export { F as FormattedLog, b as LogLevel } from './types-D_HhJ4CL.mjs';

declare class Logger {
    private service;
    constructor(config?: LoggerConfig);
    private log;
    info(data: LogData): void;
    warn(data: LogData): void;
    error(data: LogData): void;
    debug(data: LogData): void;
}
declare const logger: Logger;

export { LogData, Logger, LoggerConfig, logger };
