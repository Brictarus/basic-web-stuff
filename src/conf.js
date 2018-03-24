import {LOG_LEVELS} from "./js/utils/logger/log-level";

export const config = {
  loggers: {
    '*': LOG_LEVELS.DEBUG,
    'app': LOG_LEVELS.DEBUG
  },
  getLogContainer: () => {
    return document.getElementById('logs-container')
  }
};