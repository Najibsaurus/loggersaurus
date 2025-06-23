import type { LoggerConfig, LogData, FormattedLog } from "./types";
import { LogLevel } from "./types";

export * from "./types";

class Logger {
  private service: string;

  constructor(config: LoggerConfig = {}) {
    this.service = config.service || "next-app";
  }

  private log(level: LogLevel, data: LogData): void {
    const formattedLog: FormattedLog = {
      timestamp: new Date().toISOString(),
      level,
      service: this.service,
      action: data.action,
      details: data.details,
    };

    if (process.env.NODE_ENV === "production") {
      console.log(`[${formattedLog.level}] - ${JSON.stringify(formattedLog)}`);
    } else {
      const colorMap = {
        [LogLevel.INFO]: "\x1b[34m", // Blue
        [LogLevel.WARN]: "\x1b[33m", // Yellow
        [LogLevel.ERROR]: "\x1b[31m", // Red
        [LogLevel.DEBUG]: "\x1b[35m", // Magenta
        reset: "\x1b[0m",
      };
      const color = colorMap[level] || colorMap.reset;
      console.log(
        `${color}[${formattedLog.level}]` +
          `${colorMap.reset} - ${formattedLog.action}`,
        formattedLog
      );
    }
  }

  info(data: LogData) {
    this.log(LogLevel.INFO, data);
  }
  warn(data: LogData) {
    this.log(LogLevel.WARN, data);
  }
  error(data: LogData) {
    this.log(LogLevel.ERROR, data);
  }
  debug(data: LogData) {
    this.log(LogLevel.DEBUG, data);
  }
}

export const logger = new Logger({ service: process.env.NEXT_PUBLIC_APP_NAME });
export { Logger };
