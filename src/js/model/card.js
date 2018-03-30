import {Logger} from "../utils/logger/logger";
import {LOG_LEVELS} from "../utils/logger/log-level";
import {config} from "../../conf";

export class Card {
  constructor(name, description, baseCost, behaviours, image) {
    this.log = Logger.getLogger('Card', LOG_LEVELS.DEBUG, config.getLogContainer());

    this.name = name;
    this.description = description;
    this.baseCost = baseCost;
    this.behaviours = behaviours;
    this.image = image;

    this.log.debug(`new card "${name}" created`);
  }

  toString() {
    return `(${this.baseCost}) ${this.name}`;
  }
}