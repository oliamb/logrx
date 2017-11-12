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
    mapFirstDefinedValue(this.config, 'appenders', (appenders: IAppender[]) => {
      appenders.map(appender => appender.log(Level.ERROR, message, ...optionalParams));
    });
  }

  public log(message?: any, ...optionalParams: any[]): void {
    mapFirstDefinedValue(this.config, 'appenders', (appenders: IAppender[]) => {
      appenders.map(appender => appender.log(Level.DEBUG, message, ...optionalParams));
    });
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
