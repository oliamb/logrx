import { BehaviorSubject } from 'rxjs';
import { Level } from './const';
import { DefaultLoggerImpl } from './logger';
import { RootLoggerConfigImpl } from './root-logger-config';
import { behaveLikeAConsole, IFactory } from './testing';

describe('DefaultLoggerImpl', () => {
  behavesLikeALogger(loggerConfig$ => new DefaultLoggerImpl(loggerConfig$));
});

export function behavesLikeALogger(factory: IFactory) {
  describe('behaves like a logger', () => {
    behaveLikeAConsole(factory);

    it('should have a name', () => {
      const aLogger = factory(new BehaviorSubject(new RootLoggerConfigImpl(Level.ERROR, [])));
      expect(aLogger.name).toBeDefined();
    });
  });
}
