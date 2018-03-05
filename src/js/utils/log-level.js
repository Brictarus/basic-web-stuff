const LOG_LEVEL_TAG_LENGTH = 5;

export class LogLevel {
  constructor(prio, code) {
    if (typeof(prio) !== 'number') {
      throw new Error('prio must be defined and must be a number');
    }
    if (typeof(code) !== 'string' || code.length === 0) {
      throw new Error('code must be defined and must not be empty');
    }
    this.priority = prio;
    this.code = code;
    this.tag = code;
    while (this.tag.length < LOG_LEVEL_TAG_LENGTH) {
      this.tag += ' ';
    }
  }

  isGreaterOrEquals(otherLevel) {
    return this.priority >= otherLevel.priority;
  }
}

export const LOG_LEVELS = {
  ERROR: new LogLevel(0, 'ERROR'),
  WARN: new LogLevel(1, 'WARN'),
  INFO: new LogLevel(2, 'INFO'),
  DEBUG: new LogLevel(3, 'DEBUG')
};