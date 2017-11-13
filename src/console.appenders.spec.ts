import { ConsoleAppender } from './console.appender';
import { Level } from './const';

describe('ConsoleAppenders', () => {
  let appender: ConsoleAppender;

  beforeEach(() => {
    appender = new ConsoleAppender();
  });

  it('should log DEBUG level message using console.log without prefix', () => {
    spyOn(console, 'log');
    appender.log(Level.DEBUG, 'Hello World');
    expect(console.log).toBeCalledWith('Hello World');
  });

  it('should prefix trace log message with [TRACE]', () => {
    spyOn(console, 'log');
    appender.log(Level.TRACE, 'Hello World');
    expect(console.log).toBeCalledWith('[TRACE]', 'Hello World');
  });

  it('should use console.info', () => {
    spyOn(console, 'info');
    appender.log(Level.INFO, 'Hello World');
    expect(console.info).toBeCalledWith('Hello World');
  });

  it('should use console.warn', () => {
    spyOn(console, 'warn');
    appender.log(Level.WARN, 'Hello World');
    expect(console.warn).toBeCalledWith('Hello World');
  });

  it('should use console.error', () => {
    spyOn(console, 'error');
    appender.log(Level.ERROR, 'Hello World');
    expect(console.error).toBeCalledWith('Hello World');
  });

  it('should use console.error with [EXCEPTION] label', () => {
    spyOn(console, 'error');
    appender.log(Level.EXCEPTION, 'Hello World');
    expect(console.error).toBeCalledWith('[EXCEPTION]', 'Hello World');
  });
});
