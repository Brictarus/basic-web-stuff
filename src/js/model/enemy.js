import {Dude} from "./dude";

export class Enemy extends Dude {
  constructor(name, maxHp, strats) {
    super(name, maxHp);
    this.strats = strats;
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

    ctx.restore();
  }
}