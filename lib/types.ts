import { Level } from './const';
import { IAppender } from './types';

/**
 * Logger is the public interface to log new messages.
 *
 * It supports a subset of the standard Console interface.
 */
export interface IConsole {
  error(message?: any, ...optionalParams: any[]): void;
  log(message?: any, ...optionalParams: any[]): void;
  //   assert(test?: boolean, message?: string, ...optionalParams: any[]): void;
  //   clear(): void;
  //   count(countTitle?: string): void;
  //   debug(message?: any, ...optionalParams: any[]): void;
  //   dir(value?: any, ...optionalParams: any[]): void;
  //   dirxml(value: any): void;
  //   exception(message?: string, ...optionalParams: any[]): void;
  //   group(groupTitle?: string, ...optionalParams: any[]): void;
  //   groupCollapsed(groupTitle?: string, ...optionalParams: any[]): void;
  //   groupEnd(): void;
  //   info(message?: any, ...optionalParams: any[]): void;
  //   profile(reportName?: string): void;
  //   profileEnd(): void;
  //   select(element: Element): void;
  //   table(...data: any[]): void;
  //   time(timerName?: string): void;
  //   timeEnd(timerName?: string): void;
  //   trace(message?: any, ...optionalParams: any[]): void;
  //   warn(message?: any, ...optionalParams: any[]): void;
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
