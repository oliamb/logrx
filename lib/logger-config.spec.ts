import { Level } from './const';
import { DefaultLoggerConfigImpl } from './logger-config';
import { RootLoggerConfigImpl } from './root-logger-config';
import { ILoggerConfig } from './types';

describe('DefaultLoggerConfigImpl', () => {
  it('should be named test', () =>
    expect(new DefaultLoggerConfigImpl('test', new RootLoggerConfigImpl()).name).toBe('test'));

  it('should have a parent', () => {
    const parent: ILoggerConfig = new RootLoggerConfigImpl();
    const child: ILoggerConfig = new DefaultLoggerConfigImpl('test.me', parent);
    expect(child.parent).toBe(parent);
  });

  it('should have a default level of ERROR', () =>
    expect(new DefaultLoggerConfigImpl('test', new RootLoggerConfigImpl()).level).toBe(
      Level.ERROR,
    ));

  it('should inherit its level from the parent', () => {
    const parent: ILoggerConfig = new RootLoggerConfigImpl(Level.DEBUG);
    const child: ILoggerConfig = new DefaultLoggerConfigImpl('test.me', parent);
    expect(child.level).toBe(Level.DEBUG);
  });

  it('should use current level if any', () => {
    const parent: ILoggerConfig = new RootLoggerConfigImpl(Level.DEBUG);
    const child: ILoggerConfig = new DefaultLoggerConfigImpl('test.me', parent, Level.INFO);
    expect(child.level).toBe(Level.INFO);
  });
});

describe('RootLoggerConfig', () => {
  it('should have a default level of ERROR', () =>
    expect(new RootLoggerConfigImpl().level).toBe(Level.ERROR));
});
