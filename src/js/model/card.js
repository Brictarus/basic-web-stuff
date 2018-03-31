import {Logger} from "../utils/logger/logger";
import {LOG_LEVELS} from "../utils/logger/log-level";
import {config} from "../../conf";

export const CardTarget = {
  SELF: 'self',
  SINGLE_ENEMY: 'enemy',
  MULTIPLE_ENEMIES: 'enemies'
};

export class Card {
  constructor(name, description, baseCost, behaviours, target, image) {
    this.log = Logger.getLogger('Card', LOG_LEVELS.DEBUG, config.getLogContainer());

    this.name = name;
    this.description = description;
    this.baseCost = baseCost;
    this.behaviours = behaviours;
    if (Object.values(CardTarget).indexOf(target) === -1) {
      const error = `Card "${name}" has an unknown target type : "${target}"`;
      this.log.error(error);
      throw new Error(error);
    }
    this.target = target;
    this.image = image;

    this.log.debug(`new card "${name}" created`);
  }

  toString() {
    return `(${this.baseCost}) ${this.name}`;
  }
}