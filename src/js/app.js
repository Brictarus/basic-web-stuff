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

    this.rootElement = rootElement;

    this.initState = new InitState(this);
    this.logosState = new LogosState(this);
    this.homeState = new HomeState(this);

    this.transition(this.initState);
  }

  transition(newState) {
    log.debug('Going to a new state : ', newState.name);
    if (this.state) {
      this.state.exitState();
    }
    this.state = newState;
    newState.enterState(this);
    log.debug('New state : ', newState.name);
  }
}