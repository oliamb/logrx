import { Level } from './const';

const LEVEL_STRINGS = ['ALL', 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'EXCEPTION'];

export class ConsoleAppender {
  public log(level: Level, ...message: any[]) {
    // tslint:disable-next-line:no-console
    console.log(`[${LEVEL_STRINGS[level]}] ${message.join(' ')}`);
  }
}
