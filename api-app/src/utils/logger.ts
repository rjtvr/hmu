import pino from "pino";

/**
 * Custom logger configuration for better formatting
 */
export const createLogger = () => {
  if (process.env.NODE_ENV === "development") {
    return pino({
      level: process.env.LOG_LEVEL || "info",
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
          ignore: "pid,hostname,reqId",
          messageFormat: "[{level}] {msg}",
          singleLine: true,
          hideObject: false,
          customPrettifiers: {
            time: (timestamp: string) => `🕐 ${timestamp}`,
            level: (level: string) => {
              const levels: Record<string, string> = {
                '10': '🔍 TRACE',
                '20': '🐛 DEBUG', 
                '30': 'ℹ️  INFO',
                '40': '⚠️  WARN',
                '50': '❌ ERROR',
                '60': '💀 FATAL'
              };
              return levels[level] || `📝 ${level}`;
            }
          }
        }
      }
    });
  }

  return pino({
    level: process.env.LOG_LEVEL || "info",
    formatters: {
      level: (label: string) => ({ level: label.toUpperCase() })
    }
  });
};

