import {Logger} from "./utils/logger";
import {LOG_LEVELS} from "./utils/log-level";

const log = Logger.getLogger(null, LOG_LEVELS.DEBUG, document.getElementById('content'));

window.addEventListener('load', () => {
  for (let i = 0; i < 2; i++) {
    log[i % 2 === 0 ? 'warn' : 'error']('test');
  }
  for (let i = 0; i < 6; i++) {
    log[i % 2 === 0 ? 'debug' : 'info']('test');
  }
});
