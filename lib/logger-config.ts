import { Level } from './const';
import { ILoggerConfig } from './types';

export class DefaultLoggerConfigImpl implements ILoggerConfig {
  public readonly level?: Level;
  public appenders = undefined;

  constructor(public readonly name: string, public readonly parent: ILoggerConfig, level?: Level) {
    this.level = level || parent.level;
  }
}
