import { LoggerContext } from './logger-context';
import { getLogger, globalContext } from './logger-global-context';
import { ILogger } from './types';

describe('LoggerContext', () => {
  describe('getLogger', () => {
    let context: LoggerContext;
    beforeEach(() => {
      context = new LoggerContext();
    });

    it('retrieves a logger', () => {
      const logger: ILogger = context.getLogger('test');
      expect(logger).toBeDefined();
    });

    it('should have name = "one"', () => {
      const logger: ILogger = context.getLogger('test');
      expect(logger.name).toBe('test');
    });

    it('should retrieve the same logger when called twice', () => {
      expect(context.getLogger('one')).toBe(context.getLogger('one'));
    });
  });
});

describe('getLogger', () => {
  it('should the function from one of the logger context', () => {
    expect(getLogger).toBe(globalContext.getLogger);
  });

  it('should retrieve the same logger when called twice', () => {
    expect(getLogger('one')).toBe(getLogger('one'));
  });
});
