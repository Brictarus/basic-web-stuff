import {Logger} from "./utils/logger";
import {LOG_LEVELS} from "./utils/log-level";
import {InitState} from "./states/init-state";
import {LogosState} from "./states/logos-state";
import {HomeState} from "./states/home-state";
import {config} from "../conf";

let log;

export class App {
  constructor(rootElement) {
    log = Logger.getLogger('app', LOG_LEVELS.DEBUG, config.getLogContainer());
    log.debug('Creating app...');

    this.canvas = rootElement;
    this.context = this.canvas.getContext('2d');

    this.initState = new InitState(this);
    this.logosState = new LogosState(this);
    this.homeState = new HomeState(this);

    this.transition(this.initState);
  }

  transition(newState) {
    if (this.state) {
      log.debug('Exiting state : ', this.state.name);
      this.state.exitState();
    }
    this.state = newState;
    if (newState) {
      log.debug('Entering a new state : ', newState.name);
      newState.enterState(this);
    } else {
      log.info('FSM exited ');
    }
  }
}