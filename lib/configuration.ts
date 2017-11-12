import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { map } from 'rxjs/operators/map';
import { Level, ROOT_LOGGER_NAME } from './const';
import { DefaultLoggerConfigImpl } from './logger-config';
import { getLogger } from './logger-global-context';
import { RootLoggerConfigImpl } from './root-logger-config';
import { IAppender, ILoggerConfig } from './types';

/**
 * A mutable configuration model.
 */
export class Configuration {
  private loggerConfigs$: BehaviorSubject<{
    [name: string]: { appenders?: IAppender[] };
  }> = new BehaviorSubject({});
  public addLoggerAppender(loggerName: string, appender: IAppender) {
    const partialConfig = this.loggerConfigs$.value[name];
    const appenders = partialConfig && partialConfig.appenders;
    this.loggerConfigs$.next({
      ...this.loggerConfigs$.value,
      [name]: {
        appenders: appenders ? [...appenders, appender] : [appender],
      },
    });
  }

  public getLoggerConfig$(name: string): Observable<ILoggerConfig> {
    if (name === ROOT_LOGGER_NAME) {
      return this.getRootLoggerConfig$();
    }
    return this.getRootLoggerConfig$().pipe(
      combineLatest(this.loggerConfigs$.pipe(map(config => config[name]))),
      map(([root, config]) => new DefaultLoggerConfigImpl(name, root)),
    );
  }

  private getRootLoggerConfig$ = () => {
    return this.loggerConfigs$.pipe(
      map(configs => {
        const config = configs[name];
        return new RootLoggerConfigImpl(Level.ALL, config.appenders);
      }),
    );
  };
}
