import { L as LogData } from './types-D_HhJ4CL.mjs';

type ClientLoggerConfig = {
    endpoint?: string;
};
declare function createClientLogger(config?: ClientLoggerConfig): {
    info: (data: LogData) => void;
    warn: (data: LogData) => void;
    error: (data: LogData) => void;
};
declare const clientLogger: {
    info: (data: LogData) => void;
    warn: (data: LogData) => void;
    error: (data: LogData) => void;
};

export { clientLogger, createClientLogger };
