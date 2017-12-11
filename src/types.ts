import { Level } from './const';
import { IAppender } from './types';

export type loggingFunc = (message?: any, ...optionalParams: any[]) => void;
export type lazyLoggingFunc = (callback: () => any) => void;

/**
 * Logger is the public interface to log new messages.
 *
 * It supports a subset of the standard Console interface.
 */
export interface IConsole {
  debug: loggingFunc;
  error: loggingFunc;
  exception: loggingFunc;
  log: loggingFunc;
  info: loggingFunc;
  trace: loggingFunc;
  warn: loggingFunc;
}

export interface ILazyConsole {
  debugc: lazyLoggingFunc;
  errorc: lazyLoggingFunc;
  exceptionc: lazyLoggingFunc;
  logc: lazyLoggingFunc;
  infoc: lazyLoggingFunc;
  tracec: lazyLoggingFunc;
  warnc: lazyLoggingFunc;
}

/**
 * A logger is loosely associated to a {LoggerConfig} throught its name.
 * It provides the API to log new messages.
 */
export interface ILogger extends IConsole, ILazyConsole {
  readonly name: string;
}

/**
 * A logger configuration.
 *
 * @param parent value must be defined for every config excepted for the root logger
 */
export interface ILoggerConfig {
  readonly name: string;
  readonly parent: ILoggerConfig | null;
  readonly level?: Level;
  readonly appenders?: IAppender[];
}

export interface IAppender {
  log(level: Level, ...message: any[]): void;
}

export type AppenderFactory = () => IAppender;

export interface IConfigDescriptor {
  readonly name: string;
  readonly appenders?: string[];
  readonly level?: Level;
}
