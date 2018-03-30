import {AbstractState} from "./abstract-state";
import {Player} from "../model/player";
import {Enemy} from "../model/enemy";

export class WinState extends AbstractState {
  constructor(app) {
    super('Win state', app);
  }

  enterState() {
    this.log.info('Win screen');
    this.c = this.parent.canvas;
    this.ctx = this.parent.context;

    this.keyDownHandler = this.onKeyDown.bind(this);
    document.addEventListener('keydown', this.keyDownHandler);
    this.draw()
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);

    this.ctx.fillStyle = '#2c9a49';
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = 'center';
    this.ctx.font = '18px monospace';
    this.ctx.fillText('You win ! :)', this.c.width / 2, this.c.height / 2);
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '12px monospace';
    this.ctx.fillText('(Press space to go back to the menu)', this.c.width / 2, this.c.height / 2 + 25);

    this.ctx.restore();
  }

  onKeyDown(e) {
    // end turn
    if (e.code === 'Space') {
      this.parent.transition(this.parent.homeState);
    }
  }

  exitState() {
    this.keyDownHandler && document.removeEventListener('keydown', this.keyDownHandler);
    this.keyDownHandler = undefined;
  }
}
