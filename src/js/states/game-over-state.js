import {AbstractState} from "./abstract-state";

export const TurnStatusEnum = {
  NO_ONE: 0,
  PLAYER_TURN: 1,
  ENEMIES_TURN: 2
};

export class GameOverState extends AbstractState {
  constructor(app) {
    super('Game Over state', app);
    this.turnState = TurnStatusEnum.NO_ONE;
  }

  enterState() {
    this.log.info('Game Over screen');
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

    this.ctx.fillStyle = '#a00';
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = 'center';
    this.ctx.font = '18px monospace';
    this.ctx.fillText('You lose ! :(', this.c.width / 2, this.c.height / 2);
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
