import { Level } from './const';
import { IAppender } from './types';

/**
 * Logger is the public interface to log new messages.
 *
 * It supports a subset of the standard Console interface.
 */
export interface IConsole {
  debug(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
  exception(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  log(message?: any, ...optionalParams: any[]): void;
  trace(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
}

/**
 * A logger is loosely associated to a {LoggerConfig} throught its name.
 * It provides the API to log new messages.
 */
export interface ILogger extends IConsole {
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
