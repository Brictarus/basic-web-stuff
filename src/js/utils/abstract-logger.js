import {LOG_LEVELS, LogLevel} from './log-level';

export class AbstractLogger {
  constructor() {
    this.logLevel = LOG_LEVELS.INFO;
  }

  debug(...args) {
    this._log(args, LOG_LEVELS.DEBUG);
  }

  info(...args) {
    this._log(args, LOG_LEVELS.INFO);
  }

  warn(...args) {
    this._log(args, LOG_LEVELS.WARN);
  }

  error(...args) {
    this._log(args, LOG_LEVELS.ERROR);
  }

  processTags(texts, ...tags) {
    if (this.loggerName) {
      tags.push(this.loggerName);
    }
    let tagged = tags.map(t => `[${t}]`);
    tagged.reverse().forEach((t => texts.splice(0, 0, t)));
  }

  _log(args, logLevel) {
    if (this.logLevel.isGreaterOrEquals(logLevel)) {
      this.processTags(args, logLevel.tag, AbstractLogger.getDateTime());
      const color = AbstractLogger.colors[logLevel.code] || AbstractLogger.colors.DEFAULT;
      this.__log(args, color);
    }
  }

  __log() {
    throw new Error('Must be implemented by subclasses');
  }

  static getDateTime() {
    return (new Date()).toLocaleTimeString();
  }

  setLogLevel(logLevel) {
    if (!logLevel instanceof LogLevel) {
      throw new Error('logLevel should be a level from LOG_LEVELS enum');
    }
    this.logLevel = logLevel;
  }
}

AbstractLogger.colors = {
  DEFAULT: '#5281ff',
  DEBUG: '#9c9c9c',
  INFO: '#fff',
  WARN: '#c67f3b',
  ERROR: '#9c0006'
};
