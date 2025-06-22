export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
}

export type LogData = {
  action: string;
  details?: unknown;
};

export type LoggerConfig = {
  service?: string;
};

export type FormattedLog = {
  timestamp: string;
  level: LogLevel;
  service: string;
  action: string;
  details?: unknown;
};
