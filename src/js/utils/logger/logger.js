import {AbstractLogger} from "./abstract-logger";

/**
 * DOM logger class
 */
export class Logger extends AbstractLogger {
  /**
   *
   * @param {LogLevel} logLevel
   * @param {string} loggerName
   * @param {HTMLElement} node
   */
  constructor(logLevel, loggerName, node) {
    super();
    if (!(node instanceof HTMLElement)) {
      throw new Error('node should be a valid HTML DOM Element');
    }
    this.rootDomElement = node;
    this.loggerName = loggerName;
    if (logLevel) {
      this.setLogLevel(logLevel);
    }
  }

  __log(args, color) {
    this._newLine(args, color);
  }

  _newLine(texts, color) {
    let node = document.createElement('p');
    if (color) {
      node.style.color = color;
    }
    node.textContent = texts.join(' ');
    this.rootDomElement.appendChild(node);
    return node;
  }

  static getLogger(loggerName, logLevel, node) {
    loggerName = loggerName || '';
    if (Logger._loggers.hasOwnProperty(loggerName)) {
      return Logger._loggers[loggerName];
    }
    if (this.config) {
      const loggerConfig = this.config[loggerName || '*'];
      if (loggerConfig) {
        logLevel = loggerConfig;
      }
    }
    let logger = new Logger(logLevel, loggerName, node);
    Logger._loggers[loggerName] = logger;
    return logger;
  }

  static setConfig(config) {
    this.config = config;
  }
}

Logger._loggers = {};
