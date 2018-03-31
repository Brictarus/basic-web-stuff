import {LOG_LEVELS} from "../utils/logger/log-level";
import {config} from "../../conf";
import {Logger} from "../utils/logger/logger";
import {CardTarget} from "./card";

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

  /**
   * block = 6
   * amount = 5
   * => block = 1
   *
   * block = 5
   * amount = 6
   * => block = 0
   * => hp -= 1
   * @param amount
   */
  takeDamage(damageToTake) {
    const tempBlock = this.block - damageToTake;
    if (tempBlock < 0) {
      this.hp += tempBlock;
      this.block = 0;
    } else {
      this.block = tempBlock;
    }

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

  endTurn() {
  }

  getTargetsForCard(card, enemies) {
    if (card.target === CardTarget.SELF) {
      return [this];
    } else if (card.target === CardTarget.SINGLE_ENEMY) {
      return [enemies[0]];
    } else if (card.target === CardTarget.MULTIPLE_ENEMIES) {
      return enemies;
    } else {
      const error = `Unsupported target type for now : "${card.target}"`;
      this.log.error(error);
      throw new Error(error);
    }
  }
}