import { Logger } from './logger';
import { getLogger } from './log-manager';

describe('getLogger', () => {
  it('retrieves a logger', () => {
    const logger: Logger = getLogger('test');
    expect(logger).toBeDefined();
  });

  it('should have name = "one"', () => {
    const logger: Logger = getLogger('test');
    expect(logger.name).toBe('test');
  });

  it('should retrieve the same logger when called twice', () => {
    expect(getLogger('one')).toBe(getLogger('one'));
  });
});
