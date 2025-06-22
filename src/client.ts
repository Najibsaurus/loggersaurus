"use client";

import type { LogData } from "./types";
import { LogLevel } from "./types";

type ClientLoggerConfig = {
  endpoint?: string;
};

function createClientLogger(config: ClientLoggerConfig = {}) {
  const endpoint = config.endpoint || "/api/log";

  const sendLog = (level: LogLevel, data: LogData) => {
    const payload = JSON.stringify({ level, ...data });

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, payload);
    } else {
      fetch(endpoint, {
        method: "POST",
        body: payload,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(console.error);
    }
  };

  return {
    info: (data: LogData) => sendLog(LogLevel.INFO, data),
    warn: (data: LogData) => sendLog(LogLevel.WARN, data),
    error: (data: LogData) => sendLog(LogLevel.ERROR, data),
  };
}

export const clientLogger = createClientLogger();
export { createClientLogger };
