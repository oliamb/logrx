import { Level, ROOT_LOGGER_NAME } from './const';
import { IAppender, ILoggerConfig } from './types';

export class RootLoggerConfigImpl implements ILoggerConfig {
  public readonly name = ROOT_LOGGER_NAME;
  public readonly parent = null;
  constructor(public readonly level: Level, public readonly appenders: IAppender[]) {
    // nothing
  }
}
