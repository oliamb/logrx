import { Level } from './const';
import { IAppender, ILoggerConfig } from './types';

export class DefaultLoggerConfigImpl implements ILoggerConfig {
  private internalLevel?: Level;

  constructor(
    public readonly name: string,
    public readonly parent: ILoggerConfig,
    level?: Level,
    public readonly appenders?: IAppender[],
  ) {
    this.internalLevel = level;
  }

  get level() {
    return this.internalLevel || this.parent.level;
  }
}
