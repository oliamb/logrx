import { ConsoleAppender } from './console.appender';
import { Level, ROOT_LOGGER_NAME } from './const';
import { LoggerContext } from './logger-context';

/**
 * Define a global context that can be accessed through static methods.
 *
 * Logger is often used globally within the application. This use case
 * has been made easier by the publication of a global context that you
 * can use with sensible default.
 *
 * The globalContext is provided with a root logger configured to
 * log the `DEBUG` level and using an console appender. This way
 * you can replicate by default what happens with console.log.
 *
 * Every new context should define its appenders properly.
 */
export const globalContext = new LoggerContext();
globalContext.addAppenderFactory('console', () => new ConsoleAppender());
globalContext.configure({ name: ROOT_LOGGER_NAME, appenders: ['console'], level: Level.DEBUG });

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
