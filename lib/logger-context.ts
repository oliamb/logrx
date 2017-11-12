import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { Subject } from 'rxjs/Subject';
import { Configuration } from './configuration';
import { ConsoleAppender } from './console.appender';
import { Level, ROOT_LOGGER_NAME } from './const';
import { DefaultLoggerImpl } from './logger';
import { DefaultLoggerConfigImpl } from './logger-config';
import { RootLoggerConfigImpl } from './root-logger-config';
import { ILogger, ILoggerConfig } from './types';

export class LoggerContext {
  private loggers: { [name: string]: ILogger } = {};

  private configuration: Configuration = new Configuration();

  constructor() {
    this.configuration.addLoggerAppender(ROOT_LOGGER_NAME, new ConsoleAppender());
  }

  /**
   * Retrieve a logger with the given name.
   * @param name
   */
  public getLogger = (name: string): ILogger => {
    let logger = this.loggers[name];
    if (!logger) {
      logger = this.loggers[name] = new DefaultLoggerImpl(
        this.configuration.getLoggerConfig$(name),
      );
    }
    return logger;
  };

  public get rootLogger() {
    return this.getLogger(ROOT_LOGGER_NAME);
  }
}
