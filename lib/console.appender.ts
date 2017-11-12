import { Level } from './const';

const LEVEL_STRINGS = ['ALL', 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'EXCEPTION'];

function getLevel(lvl: Level) {
  return `[${LEVEL_STRINGS[lvl]}]`;
}

export class ConsoleAppender {
  public log(level: Level, ...message: any[]) {
    // tslint:disable:no-console
    switch (level) {
      case Level.TRACE:
        console.log(getLevel(level), ...message);
        break;
      case Level.INFO:
        console.info ? console.info(...message) : console.log(getLevel(level), ...message);
        break;
      case Level.WARN:
        console.warn ? console.warn(...message) : console.log(getLevel(level), ...message);
        break;
      case Level.ERROR:
        console.error ? console.error(...message) : console.log(getLevel(level), ...message);
        break;
      case Level.EXCEPTION:
        console.exception
          ? console.exception(...message)
          : console.error
            ? console.error(getLevel(level), ...message)
            : console.log(getLevel(level), ...message);
        break;
      default:
        console.log(...message);
    }
    // tslint:enable:no-console
  }
}
