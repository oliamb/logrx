import { Console, Logger } from './logger';

class FakeConsole implements Console {
  log(message?: any, ...optionalParams: any[]): void {}
  error(message?: any, ...optionalParams: any[]): void {}
}

class FakeLogger implements Logger {
  name = 'FakeLogger';
  log(message?: any, ...optionalParams: any[]): void {}
  error(message?: any, ...optionalParams: any[]): void {}
}

describe('Console', () => {
  behaveLikeAConsole(new FakeConsole());
});

describe('Logger interface', () => {
  behavesLikeALogger(new FakeLogger());
});

export function behavesLikeALogger(aLogger: Logger) {
  describe('behaves like a logger', () => {
    behaveLikeAConsole(aLogger);

    it('should have a name', () => {
      expect(aLogger.name).toBeDefined();
    });
  });
}

export function behaveLikeAConsole(aConsole: Console) {
  describe('its log method', () => {
    behavesLikeALoggingMethod(aConsole, 'log');
    behavesLikeALoggingMethod(aConsole, 'error');
  });
}

export function behavesLikeALoggingMethod(aConsole: Console, methodName: keyof Console) {
  describe('behaves like a logging method', () => {
    it('supports a log function', () => {
      aConsole[methodName]('message');
    });

    it('supports a log function with multiple parameters', () => {
      aConsole[methodName]('message', 'a', 'b', 'c');
    });

    it('supports a log function with various parameter types', () => {
      aConsole[methodName]('message', 1, [2, 3], { 4: 5 });
    });
  });
}
