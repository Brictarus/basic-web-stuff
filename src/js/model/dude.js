import {LOG_LEVELS} from "../utils/logger/log-level";
import {config} from "../../conf";
import {Logger} from "../utils/logger/logger";

export class Dude {
  constructor(name, maxHp) {
    this.log = Logger.getLogger('Dude', LOG_LEVELS.DEBUG, config.getLogContainer());

    this.name = name;
    this.maxHp = maxHp;
    this.hp = maxHp;
    this.dead = false;
    this.block = 0;
    this.hidden = false;
  }

  addDefense(amount) {
    this.block += amount;
  }

  takeDamage(amount) {
    let damageToTake = amount;
    const tempBlock = this.block;
    this.block = Math.max(0, this.block - amount);
    damageToTake -= tempBlock;

    this.hp -= damageToTake;
    if (this.hp <= 0) {
      this.dead = true;
    }
  }

  heal(amount) {
    this.hp = Math.min(this.maxHp, this.hp + amount);
  }

  hide() {
    this.hidden = true;
  }

  unhide() {
    this.hidden = false;
  }

  initTurn() {
    this.block = 0;
  }
}