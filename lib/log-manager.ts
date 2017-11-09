import { DefaultLoggerImpl, Logger } from './logger';

const LOGGERS: { [name: string]: Logger } = {};

/**
 * Retrieve a logger with the given name.
 * @param name
 */
export function getLogger(name: string): Logger {
  let logger = LOGGERS[name];
  if (!logger) {
    logger = LOGGERS[name] = new DefaultLoggerImpl(name);
  }
  return logger;
}
