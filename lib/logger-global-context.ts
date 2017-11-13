import { LoggerContext } from './logger-context';

export const globalContext = new LoggerContext();

/**
 * getLogger from the global context.
 *
 * In most cases, the logger context is issued from the app configuration
 * files so the context can be considered a Singleton.
 */
export const getLogger = globalContext.getLogger;

/**
 * add an appender to the global context.
 */
export const addAppenderFactory = globalContext.addAppenderFactory;

/**
 * configure the global context.
 */
export const configure = globalContext.configure;
