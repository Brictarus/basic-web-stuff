import {AbstractState} from "./abstract-state";
import cardsData from '../../cards.json';
import {CardCatalog} from '../model/card-catalog';

export class InitState extends AbstractState {
  constructor(app) {
    super('Initial state', app);
  }

  enterState() {
    this.log.info('Init screen');
    this.draw();
    const cardCatalog = this.parent.cardCatalog = new CardCatalog();
    cardCatalog.build(cardsData);
    console.log(cardCatalog);
    this.parent.transition(this.parent.logosState);
  }

  draw() {
    const canvas = this.parent.canvas;
    canvas.height = canvas.width = 400;

    const ctx = this.parent.context;
    ctx.save();
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, 400, 400);
    ctx.fillStyle = '#ff1493';
    ctx.textBaseline = 'top';
    ctx.font = '12px monospace';
    ctx.fillText('Initializing app...', 0, 0, 400);
    ctx.restore();
  }
}