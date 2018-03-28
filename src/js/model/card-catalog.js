import {Card} from "./card";
import {CardAffix} from "./card-affixes";
import {Logger} from "../utils/logger/logger";
import {LOG_LEVELS} from "../utils/logger/log-level";
import {config} from "../../conf";

export class CardCatalog extends Map{
  constructor() {
    super();
    this.log = Logger.getLogger('CardCatalog', LOG_LEVELS.DEBUG, config.getLogContainer());
    this._array = [];
  }

  build(data) {

    data.forEach(d => {
      const behaviours = d.affixes.map(b => CardAffix.buildAffix(b));
      const card = new Card(d.name, d.summary, d.mana, behaviours);
      this.set(d.key, card);
      this._array.push(card);
    });
  }

  getSafe(key) {
    if (!this.has(key)) {
      throw new Error(`Unknown card : ${key}`);
    }
    return this.get(key);
  }

  at(index) {
    return this._array[index];
  }
}
