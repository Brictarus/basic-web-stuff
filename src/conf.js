import {LOG_LEVELS} from "./js/utils/log-level";

export const config = {
  loggers: {
    '*': LOG_LEVELS.DEBUG,
    'app': LOG_LEVELS.DEBUG
  },
  getLogContainer: () => {
    return document.getElementById('logs-container')
  }
};