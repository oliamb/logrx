import { addAppenderFactory, configure, getLogger } from '.';
import { ConsoleAppender } from './console.appender';
import { Level } from './const';
import { IAppender } from './types';

describe('behaviour', () => {
  it('should log a simple message with the console', () => {
    spyOn(console, 'log');
    const logger = getLogger('test');
    logger.log('Hello World');
    expect(console.log).toHaveBeenCalledWith('Hello World');
  });

  it('should accept custom appenders', () => {
    const log = jasmine.createSpy('log');

    addAppenderFactory('custom', (): IAppender => {
      return { log };
    });

    configure({
      appenders: ['custom'],
      level: Level.ALL,
      name: 'test',
    });

    const logger = getLogger('test');
    logger.log('Hello World');
    expect(log).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith(Level.DEBUG, 'Hello World');
  });
});

it('should customize log level', () => {
  spyOn(console, 'log');
  configure({
    appenders: ['console'],
    level: Level.ERROR,
    name: 'test',
  });
  const logger = getLogger('test');

  logger.log('Hello World');
  expect(console.log).toHaveBeenCalledTimes(0);

  spyOn(console, 'error');
  logger.error('Hello Error');
  expect(console.log).toHaveBeenCalledTimes(0);
  expect(console.error).toHaveBeenCalledTimes(1);
});
