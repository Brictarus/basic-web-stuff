import {Logger} from "./utils/logger";

const log = Logger.getLogger();

window.addEventListener('load', () => {
  for (let i = 0; i < 2; i++) {
    log[i % 2 === 0 ? 'warn' : 'error']('test');
  }
  for (let i = 0; i < 6; i++) {
    log[i % 2 === 0 ? 'debug' : 'info']('test');
  }
});
