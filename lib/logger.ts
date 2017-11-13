import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Configuration } from './configuration';
import { Level } from './const';
import { IAppender, ILogger, ILoggerConfig } from './types';

export class DefaultLoggerImpl implements ILogger {
  private config: ILoggerConfig;

  get name() {
    return this.config && this.config.name;
  }

  constructor(loggerConfig$: Observable<ILoggerConfig>) {
    loggerConfig$.subscribe(config => {
      this.config = config;
    });
  }

  public error(message?: any, ...optionalParams: any[]): void {
    logWith(this.config, Level.ERROR, message, ...optionalParams);
  }

  public log(message?: any, ...optionalParams: any[]): void {
    logWith(this.config, Level.DEBUG, message, ...optionalParams);
  }

  public debug(message?: any, ...optionalParams: any[]): void {
    logWith(this.config, Level.DEBUG, message, ...optionalParams);
  }

  public exception(message?: string | undefined, ...optionalParams: any[]): void {
    logWith(this.config, Level.EXCEPTION, message, ...optionalParams);
  }

  public info(message?: any, ...optionalParams: any[]): void {
    logWith(this.config, Level.INFO, message, ...optionalParams);
  }

  public trace(message?: any, ...optionalParams: any[]): void {
    logWith(this.config, Level.TRACE, message, ...optionalParams);
  }

  public warn(message?: any, ...optionalParams: any[]): void {
    logWith(this.config, Level.WARN, message, ...optionalParams);
  }
}

function mapFirstDefinedValue<K extends keyof ILoggerConfig, R>(
  config: ILoggerConfig | null,
  key: K,
  fn: (fn: ILoggerConfig[K]) => R,
): R | void {
  if (!config) {
    return;
  }
  if (config[key] === undefined) {
    return mapFirstDefinedValue(config.parent, key, fn);
  }
  return fn(config[key]);
}

function logWith(
  config: ILoggerConfig | null,
  level: Level,
  message?: any,
  // conflict with a prettier issue.
  // tslint:disable-next-line:trailing-comma
  ...optionalParams: any[]
): void {
  mapFirstDefinedValue(config, 'level', (configLevel: Level) => {
    if (level >= configLevel) {
      mapFirstDefinedValue(config, 'appenders', (appenders: IAppender[]) => {
        appenders.map(appender => appender.log(level, message, ...optionalParams));
      });
    }
  });
}
