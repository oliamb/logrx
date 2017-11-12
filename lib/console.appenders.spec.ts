import { ConsoleAppender } from './console.appender';
import { Level } from './const';

describe('ConsoleAppenders', () => {
  let appender: ConsoleAppender;

  beforeEach(() => {
    spyOn(console, 'log');
    appender = new ConsoleAppender();
  });

  it('should log standard log message', () => {
    appender.log(Level.DEBUG, 'Hello World');
    expect(console.log).toBeCalledWith('[DEBUG] Hello World');
  });
});
