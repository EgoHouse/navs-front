/**
 * Conditional logger utility
 * Console statements are removed in production builds
 */

const isDev = import.meta.env.DEV;
const isLoggingEnabled = import.meta.env.VITE_ENABLE_LOGGING === 'true';

type LogLevel = 'log' | 'warn' | 'error' | 'info' | 'debug';

const createLogger = (level: LogLevel) => {
  return (...args: any[]) => {
    if (isDev && isLoggingEnabled) {
      console[level](...args);
    }
  };
};

export const logger = {
  log: createLogger('log'),
  warn: createLogger('warn'),
  error: createLogger('error'),
  info: createLogger('info'),
  debug: createLogger('debug'),
};
