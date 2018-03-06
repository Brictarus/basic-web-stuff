import {AbstractState} from "./abstract-state";
import {Logger} from "../utils/logger";
import {LOG_LEVELS} from "../utils/log-level";


const KEYS = {
  '1': 97,
  '2': 98,
  '3': 99
};

let log;

export class HomeState extends AbstractState {
  constructor(app) {
    super('Home state', app);
    log = Logger.getLogger('state', LOG_LEVELS.DEBUG, app.rootElement);
  }

  enterState() {
    log.info('Welcome on the home screen');
    log.info('Choose an entry :');
    log.error('->  [1] Play !');
    log.error('->  [2] Config');
    log.error('->  [3] Stats');

    this.keyDownHandler = this.onKeyDown.bind(this);
    document.addEventListener('keydown', this.keyDownHandler)
  }

  onKeyDown(e) {
    const keyCodes = Object.values(KEYS);
    if (keyCodes.indexOf(e.which) !== -1) {
      log.warn('You have chosen : ', Object.keys(KEYS).find((k) => KEYS[k] === e.which));
      this.exitState();
    }
  }

  exitState() {
    this.keyDownHandler && document.removeEventListener('keydown', this.keyDownHandler)
    this.keyDownHandler = undefined;
  }
}