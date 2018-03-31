import {Dude} from "./dude";

export class Enemy extends Dude {
  constructor(name, maxHp, strats) {
    super(name, maxHp);
    this.strats = strats;
    this.currStratIdx = 0;
  }

  draw(index, ctx, canvas) {
    ctx.save();
    ctx.textBaseline = 'top';
    ctx.textAlign = 'right';
    ctx.font = '12px monospace';

    ctx.fillStyle = '#000';
    ctx.fillText(`#${index} ${this.name}`, canvas.width, index * 50);

    ctx.fillStyle = 'red';
    ctx.fillText(this.hp + '/' + this.maxHp + ' HP', canvas.width, index * 50 + 15);

    ctx.fillStyle = '#777';
    ctx.fillText(this.block + ' DEF', canvas.width, index * 70 + 30);

    ctx.restore();
  }

  playTurn(parent) {
    if (this.strats && this.strats.length > 0) {
      const strat = this.strats[this.currStratIdx];
      this.currStratIdx = (this.currStratIdx + 1) % this.strats.length;

      this.playCard(strat, parent);
    }
  }

  playCard(strat, parent) {
    const targets = this.getTargetsForCard(strat, [parent.p]);
    strat.behaviours.forEach((b) => {
      targets.forEach((target) => {
        b.fn(target);
      });
    });
  }
}
