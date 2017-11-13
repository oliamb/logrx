import { Configuration } from './configuration';
import { ConsoleAppender } from './console.appender';
import { ROOT_LOGGER_NAME } from './const';

describe('Configuration', () => {
  let config: Configuration;
  beforeEach(() => {
    config = new Configuration();
  });

  describe('addLoggerAppender', () => {
    it('should add an appender to a given logger', () => {
      config.addLoggerAppender('test', new ConsoleAppender());
      config
        .getLoggerConfig$('test')
        .subscribe(v => expect(v.appenders).toEqual([new ConsoleAppender()]));
    });
  });
});
