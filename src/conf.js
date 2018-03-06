import {LOG_LEVELS} from "./js/utils/log-level";

export const config = {
  loggers: {
    '*': LOG_LEVELS.INFO,
    'app': LOG_LEVELS.WARN
  }
};