import { BehaviorSubject, Observable } from 'rxjs';
import { Level } from './const';
import { RootLoggerConfigImpl } from './root-logger-config';
import { IAppender, IConsole, ILazyConsole, ILogger, ILoggerConfig } from './types';

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
  behavesLikeALazyLoggingMethod(factory, 'logc');
  behavesLikeALoggingMethod(factory, 'error');
  behavesLikeALazyLoggingMethod(factory, 'errorc');
  behavesLikeALoggingMethod(factory, 'debug');
  behavesLikeALazyLoggingMethod(factory, 'debugc');
  behavesLikeALoggingMethod(factory, 'trace');
  behavesLikeALazyLoggingMethod(factory, 'tracec');
  behavesLikeALoggingMethod(factory, 'info');
  behavesLikeALazyLoggingMethod(factory, 'infoc');
  behavesLikeALoggingMethod(factory, 'warn');
  behavesLikeALazyLoggingMethod(factory, 'warnc');
  behavesLikeALoggingMethod(factory, 'exception');
  behavesLikeALazyLoggingMethod(factory, 'exceptionc');
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

function behavesLikeALazyLoggingMethodContext(factory: IFactory, methodName: keyof ILazyConsole) {
  const appender = createSpyObj<IAppender>('appender', ['log']);
  const config = {
    appenders: [appender],
    level: Level.ALL,
    name: `behavesLikeALazyLoggingMethod.${methodName}`,
    parent: new RootLoggerConfigImpl(Level.ERROR, []),
  };
  const logger = factory(new BehaviorSubject(config).asObservable());
  return {
    appender,
    logger,
  };
}

export function behavesLikeALazyLoggingMethod(factory: IFactory, methodName: keyof ILazyConsole) {
  const expectedLevel: { [lvl: string]: Level } = {
    debugc: Level.DEBUG,
    errorc: Level.ERROR,
    exceptionc: Level.EXCEPTION,
    infoc: Level.INFO,
    logc: Level.DEBUG,
    tracec: Level.TRACE,
    warnc: Level.WARN,
  };
  describe(`${methodName}() behaves like a logging method`, () => {
    it('calls appender with a single parameters', () => {
      const { logger, appender } = behavesLikeALazyLoggingMethodContext(factory, methodName);
      logger[methodName](() => 'message');
    });

    it('calls once', () => {
      const { logger, appender } = behavesLikeALazyLoggingMethodContext(factory, methodName);
      logger[methodName](() => 'message');
      expect(appender.log).toHaveBeenCalledTimes(1);
    });

    it(`use log level ${expectedLevel[methodName]}`, () => {
      const { logger, appender } = behavesLikeALazyLoggingMethodContext(factory, methodName);
      logger[methodName](() => 'message');
      expect(appender.log).toHaveBeenCalledWith(expectedLevel[methodName], 'message');
    });
  });
}
