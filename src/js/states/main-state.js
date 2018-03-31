import {AbstractState} from "./abstract-state";
import {Player} from "../model/player";
import {Enemy} from "../model/enemy";

export const TurnStatusEnum = {
  NO_ONE: 0,
  PLAYER_TURN: 1,
  ENEMIES_TURN: 2
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
    this.stop = false;
    this.p = new Player('Bobby', this.catalog);
    this.p.initFight();
    this.p.initTurn();
    this.turnState = TurnStatusEnum.PLAYER_TURN;
    this.enemies = [
      new Enemy('Slime', 12, [this.catalog.getSafe('strike'), this.catalog.getSafe('defense')])
    ];

    this.keyDownHandler = this.onKeyDown.bind(this);
    document.addEventListener('keydown', this.keyDownHandler);

    requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    this.update();
    this.draw();
    if (this.stop) {
      this.parent.transition(this.parent[this.win ? 'winState' : 'gameOverState']);
    } else {
      requestAnimationFrame(this.loop.bind(this));
    }
  }

  update() {
    if (this.p.dead) {
      this.stop = true;
      this.win = false;
      return;
    }
    if (this.areAllEnemiesDead()) {
      this.stop = true;
      this.win = true;
      return;
    }
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
    this.enemies.filter((e => !e.dead)).forEach((e, idx) => {
      e.draw(idx, this.ctx, this.c)
    });

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
    console.log(e);
    // end turn
    if (this.turnState !== TurnStatusEnum.PLAYER_TURN) {
      return;
    }
    if (e.code === 'KeyE') {
      this.endTurnPressed = true;
      return;
    }
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(e.key) !== -1) {
      const cardIndex = parseInt(e.key, 0);
      this.p.playCard(cardIndex, this);
    }
  }

  endPlayerTurn() {
    this.p.endTurn();
    this.turnState = TurnStatusEnum.ENEMIES_TURN;
    setTimeout(() => {
      this.enemies.forEach(e => {
        if (!e.dead) {
          e.initTurn();
          e.playTurn(this);
          e.endTurn();
        }
      });
      this.turnState = TurnStatusEnum.PLAYER_TURN;
      this.p.initTurn();
    }, 500);
  }

  areAllEnemiesDead() {
    return this.enemies.every(e => e.dead);
  }

  exitState() {
    this.keyDownHandler && document.removeEventListener('keydown', this.keyDownHandler);
    this.keyDownHandler = undefined;
  }
}
