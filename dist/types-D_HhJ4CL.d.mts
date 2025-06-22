declare enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG"
}
type LogData = {
    action: string;
    details?: unknown;
};
type LoggerConfig = {
    service?: string;
};
type FormattedLog = {
    timestamp: string;
    level: LogLevel;
    service: string;
    action: string;
    details?: unknown;
};

export { type FormattedLog as F, type LogData as L, type LoggerConfig as a, LogLevel as b };
