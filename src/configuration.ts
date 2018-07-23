import { BehaviorSubject, Observable } from 'rxjs';
import { combineLatest, map, tap } from 'rxjs/operators';
import { Level, ROOT_LOGGER_NAME } from './const';
import { DefaultLoggerConfigImpl } from './logger-config';
import { RootLoggerConfigImpl } from './root-logger-config';
import { IAppender, ILoggerConfig } from './types';

/**
 * A mutable configuration model.
 */
export class Configuration {
  private loggerConfigs$: BehaviorSubject<{
    [name: string]: { appenders?: IAppender[]; level?: Level };
  }> = new BehaviorSubject({});

  public addLoggerAppender = (loggerName: string, appender: IAppender) => {
    if (!appender) {
      return;
    }
    const loggerConfig = this.loggerConfigs$.value[loggerName];
    const appenders = loggerConfig && loggerConfig.appenders;
    this.loggerConfigs$.next({
      ...this.loggerConfigs$.value,
      [loggerName]: {
        ...loggerConfig,
        appenders: appenders ? [...appenders, appender] : [appender],
      },
    });
  };

  public setLoggerLevel = (loggerName: string, level: Level | undefined) => {
    const loggerConfig = this.loggerConfigs$.value[loggerName];
    const appenders = loggerConfig && loggerConfig.appenders;
    this.loggerConfigs$.next({
      ...this.loggerConfigs$.value,
      [loggerName]: {
        ...loggerConfig,
        level,
      },
    });
  };

  public getLoggerConfig$(name: string): Observable<ILoggerConfig> {
    if (name === ROOT_LOGGER_NAME) {
      return this.getRootLoggerConfig$();
    }
    return this.getRootLoggerConfig$().pipe(
      combineLatest(this.loggerConfigs$.pipe(map(configs => configs && configs[name]))),
      // TODO: add level from config
      map(([root, config]) => {
        return new DefaultLoggerConfigImpl(
          name,
          root,
          config && config.level,
          config && config.appenders,
        );
      }),
    );
  }

  private getRootLoggerConfig$ = () => {
    return this.loggerConfigs$.pipe(
      map(configs => {
        const config = configs && configs[ROOT_LOGGER_NAME];
        return new RootLoggerConfigImpl(
          (config && config.level) || Level.OFF,
          (config && config.appenders) || [],
        );
      }),
    );
  };
}
