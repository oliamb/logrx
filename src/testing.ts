import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Level } from './const';
import { RootLoggerConfigImpl } from './root-logger-config';
import { IAppender, IConsole, ILogger, ILoggerConfig } from './types';

export type IFactory = (config: Observable<ILoggerConfig>) => ILogger;

export const createSpyObj = <T>(baseName: string, methodNames: Array<keyof T>): T => {
  const obj: any = {};

  for (const method of methodNames) {
    obj[method] = jest.fn();
  }

  return obj;
};

export function behaveLikeAConsole(factory: IFactory) {
  behavesLikeALoggingMethod(factory, 'log');
  behavesLikeALoggingMethod(factory, 'error');
  behavesLikeALoggingMethod(factory, 'debug');
  behavesLikeALoggingMethod(factory, 'trace');
  behavesLikeALoggingMethod(factory, 'info');
  behavesLikeALoggingMethod(factory, 'warn');
  behavesLikeALoggingMethod(factory, 'exception');
}

function behavesLikeALoggingMethodContext(factory: IFactory, methodName: keyof IConsole) {
  const appender = createSpyObj<IAppender>('appender', ['log']);
  const config = {
    appenders: [appender],
    level: Level.ALL,
    name: `behavesLikeALoggingMethod.${methodName}`,
    parent: new RootLoggerConfigImpl(Level.ERROR, []),
  };
  const logger = factory(new BehaviorSubject(config).asObservable());
  return {
    appender,
    logger,
  };
}

export function behavesLikeALoggingMethod(factory: IFactory, methodName: keyof IConsole) {
  const expectedLevel: { [lvl: string]: Level } = {
    debug: Level.DEBUG,
    error: Level.ERROR,
    exception: Level.EXCEPTION,
    info: Level.INFO,
    log: Level.DEBUG,
    trace: Level.TRACE,
    warn: Level.WARN,
  };
  describe(`${methodName}() behaves like a logging method`, () => {
    it('calls appender with a single parameters', () => {
      const { logger, appender } = behavesLikeALoggingMethodContext(factory, methodName);
      logger[methodName]('message');
    });

    it('calls appender with multiple parameters', () => {
      const { logger, appender } = behavesLikeALoggingMethodContext(factory, methodName);
      logger[methodName]('message', 'a', 'b', 'c');
    });

    it('calls appender with various parameter types', () => {
      const { logger, appender } = behavesLikeALoggingMethodContext(factory, methodName);
      logger[methodName]('message', 1, [2, 3], { 4: 5 });
    });

    it('calls once', () => {
      const { logger, appender } = behavesLikeALoggingMethodContext(factory, methodName);
      logger[methodName]('message');
      expect(appender.log).toHaveBeenCalledTimes(1);
    });

    it(`use log level ${expectedLevel[methodName]}`, () => {
      const { logger, appender } = behavesLikeALoggingMethodContext(factory, methodName);
      logger[methodName]('message');
      expect(appender.log).toHaveBeenCalledWith(expectedLevel[methodName], 'message');
    });
  });
}
