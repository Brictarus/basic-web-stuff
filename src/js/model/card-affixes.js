import {isPositiveInteger} from "../utils/types";

export class CardAffix {
  constructor(fn, message, checkFn, ...values) {
    this.fn = fn;
    this.message = message;
    this.values = values;
    checkFn && checkFn(...values);
  }

  static buildAffix(affixArray) {
    const affixName = affixArray.shift();
    const affixBase = CardAffixes[affixName];
    if (!affixBase) {
      throw new Error('Unknown affix name : ' + affixName);
    }

    return affixBase(...affixArray);
  }
}

const dealDamageSingle = (amount) => {
  new CardAffix(
      (target) => {
        target.takeDamage(amount);
      },
      'Deals %d damages to target enemy',
      (amount) => isPositiveInteger(amount),
      amount
  )
};
const dealDamageMultiple = (amount) => {
  new CardAffix(
      (targets) => {
        targets.forEach(t => t.takeDamage(amount));
      },
      'Deals %d damages to all enemies',
      (amount) => isPositiveInteger(amount),
      amount
  )
};
const heal = (amount) => {
  return new CardAffix(
      (target) => {
        target.heal(amount);
      },
      'Heals %d HP',
      (amount) => isPositiveInteger(amount),
      amount
  )
};
const defense = (amount) => {
  return new CardAffix(
      (target) => {
        target.addDefense(amount);
      },
      'Blocks %d damages',
      (amount) => isPositiveInteger(amount),
      amount
  )
};
const hide = () => {
  return new CardAffix(
      (target) => {
        target.hide();
      },
      'Hide from enemies',
      null
  )
};

export const CardAffixes = {
  dealDamageSingle,
  dealDamageMultiple,
  heal,
  defense,
  hide
};