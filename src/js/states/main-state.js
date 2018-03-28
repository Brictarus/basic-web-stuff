import {AbstractState} from "./abstract-state";
import {Player} from "../model/player";
import {Enemy} from "../model/enemy";

export class MainState extends AbstractState {
  constructor(app) {
    super('Main state', app);
  }

  enterState() {
    this.log.info('Main screen');
    this.c = this.parent.canvas;
    this.ctx = this.parent.context;
    this.catalog = this.parent.cardCatalog;
    this.p = new Player('Bobby', this.catalog);
    this.p.initFight();
    this.p.initTurn();
    this.enemies = [
        new Enemy('Slime', 12, [this.catalog.getSafe('strike')])
    ];
    requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(this.loop.bind(this));
  }

  update() {

  }

  draw() {
    this.ctx.save();
    this.ctx.fillStyle = '#CCC';
    this.ctx.fillRect(0, 0, this.c.width, this.c.height);

    this.p.draw(this.ctx, this.c);
    this.enemies.forEach((e, idx) => e.draw(idx, this.ctx, this.c));

    this.ctx.restore();
  }

  exitState() {
  }

}
