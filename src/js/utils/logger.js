const NOT_IMPLEMENTED = new Error('Not Implemented');

class AbstractLogger {
  debug() {
    throw NOT_IMPLEMENTED;
  }

  info() {
    throw NOT_IMPLEMENTED;
  }

  warn() {
    throw NOT_IMPLEMENTED;
  }

  processTags(texts, ...tags) {
    if (this.loggerName) {
      tags.push(this.loggerName);
    }
    let tagged = tags.map(t => `[${t}]`);
    tagged.reverse().forEach((t => texts.splice(0, 0, t)));
  };

  static getDateTime() {
    return (new Date()).toLocaleTimeString();
  }
}

export class Logger extends AbstractLogger {
  constructor(loggerName) {
    super();
    this.loggerName = loggerName;
  }

  debug(...args) {
    this.processTags(args, 'DEBUG', Logger.getDateTime());
    Logger.newLine(args, Logger.debugColor);
  }

  info(...args) {
    this.processTags(args, 'INFO ', Logger.getDateTime());
    Logger.newLine(args, Logger.infoColor);
  }

  warn(...args) {
    this.processTags(args, 'WARN ', Logger.getDateTime());
    Logger.newLine(args, Logger.warnColor);
  }

  error(...args) {
    this.processTags(args, 'ERROR', Logger.getDateTime());
    Logger.newLine(args, Logger.errorColor);
  }

  static newLine(texts, color) {
    let node = document.createElement('p');
    node.style.color = color || Logger.debugColor;
    node.textContent = texts.join(' ');
    Logger.rootDomElement.appendChild(node);
    return node;
  }

  static getLogger(loggerName) {
    loggerName = loggerName || '';
    if (Logger._loggers.hasOwnProperty(loggerName)) {
      return Logger._loggers[loggerName];
    }
    let logger = new Logger(loggerName);
    Logger._loggers[loggerName] = logger;
    return logger;
  }
}
Logger._loggers = {};

Logger.debugColor = '#9c9c9c';
Logger.infoColor = '#fff';
Logger.warnColor = '#c67f3b';
Logger.errorColor = '#9c0006';
Logger.rootDomElement = document.getElementById('content');
