import { getLogger } from '.';

describe('behaviour', () => {
  it('should log a simple message with the console', () => {
    spyOn(console, 'log');
    const logger = getLogger('pix4d');
    // tslint:disable-next-line:no-console
    logger.log('Hello World');
    expect(console.log).toHaveBeenCalledWith('Hello World');
  });
});
