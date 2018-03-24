import {Logger} from "../utils/logger/logger";
import {LOG_LEVELS} from "../utils/logger/log-level";
import {config} from "../../conf";

export class AbstractState {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;

    this.log = Logger.getLogger('state', LOG_LEVELS.DEBUG, config.getLogContainer());
  }

  enterState() {

  }

  exitState() {

  }
}