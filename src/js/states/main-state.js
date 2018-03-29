import {AbstractState} from "./abstract-state";
import {Player} from "../model/player";
import {Enemy} from "../model/enemy";

export const TurnStatusEnum = {
  NO_ONE: 0,
  PLAYER_TURN: 1,
  ENNEMIES_TURN: 2
};

export class MainState extends AbstractState {
  constructor(app) {
    super('Main state', app);
    this.turnState = TurnStatusEnum.NO_ONE;
  }

  enterState() {
    this.log.info('Main screen');
    this.c = this.parent.canvas;
    this.ctx = this.parent.context;
    this.catalog = this.parent.cardCatalog;
    this.p = new Player('Bobby', this.catalog);
    this.p.initFight();
    this.p.initTurn();
    this.turnState = TurnStatusEnum.PLAYER_TURN;
    this.enemies = [
        new Enemy('Slime', 12, [this.catalog.getSafe('strike')])
    ];

    this.keyDownHandler = this.onKeyDown.bind(this);
    document.addEventListener('keydown', this.keyDownHandler);

    requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(this.loop.bind(this));
  }

  update() {
    if (this.endTurnPressed) {
      this.endTurnPressed = false;
      this.endPlayerTurn();
    }
  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = '#CCC';
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);

    this.p.draw(this.ctx, this.c);
    this.enemies.forEach((e, idx) => e.draw(idx, this.ctx, this.c));

    if (this.turnState === TurnStatusEnum.PLAYER_TURN) {
      this.drawEndTurnButton();
    }

    this.ctx.restore();
  }

  drawEndTurnButton() {
    const ctx = this.ctx;

    ctx.save();

    ctx.fillStyle = '#ff650a';
    ctx.fillRect(this.c.width / 2 - 40, this.c.height - 30, 80, 30);

    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = '12px monospace';
    ctx.fillText('[E]nd turn', this.c.width / 2, this.c.height - 15);

    ctx.restore();
  }

  onKeyDown(e) {
    console.log(e.which);
    // end turn
    if (e.which === 69 && this.turnState === TurnStatusEnum.PLAYER_TURN) {
      this.endTurnPressed = true
    }
  }

  endPlayerTurn() {
    this.turnState = TurnStatusEnum.ENNEMIES_TURN;
    setTimeout(() => {
      this.enemies.forEach(e => e.playTurn(this))
      this.turnState = TurnStatusEnum.PLAYER_TURN;
    }, 1000);

  }

  exitState() {
    this.keyDownHandler && document.removeEventListener('keydown', this.keyDownHandler);
    this.keyDownHandler = undefined;
  }
}
