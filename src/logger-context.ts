import { Configuration } from './configuration';
import { ROOT_LOGGER_NAME } from './const';
import { DefaultLoggerImpl } from './logger';
import { AppenderFactory, IConfigDescriptor, ILogger } from './types';

export class LoggerContext {
  private appenderFactories: { [name: string]: AppenderFactory } = {};
  private loggers: { [name: string]: ILogger } = {};

  private configuration: Configuration = new Configuration();

  public addAppenderFactory = (name: string, factory: AppenderFactory): void => {
    if (!factory) {
      // TODO: should we log something here?
      return;
    }
    this.appenderFactories[name] = factory;
  };

  public configure = (...descriptors: IConfigDescriptor[]) => {
    for (const desc of descriptors) {
      if (desc.appenders) {
        for (const appenderName of desc.appenders) {
          const factory = this.appenderFactories[appenderName];
          if (factory) {
            this.configuration.addLoggerAppender(desc.name, factory());
          }
        }
      }
      this.configuration.setLoggerLevel(desc.name, desc.level);
    }
  };

  /**
   * Retrieve a logger with the given name.
   *
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
