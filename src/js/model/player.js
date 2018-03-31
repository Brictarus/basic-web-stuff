import {shuffleArray} from "../utils/types";
import {Dude} from "./dude";

const cardWidth = 68;
const cardHeight = 100;

const MAX_HEALTH = 25;
const START_HAND_SIZE = 4;

export class Player extends Dude {
  constructor(name, catalog) {
    super(name, MAX_HEALTH);

    this.maxHandSize = 10;
    this.deck = [];
    this._initDeck(10, catalog);
  }

  _initDeck(cardsCount, catalog) {
    for (let i = 0; i < cardsCount; i++) {
      const index = Math.floor(Math.random() * catalog.size);
      this.deck.push(catalog.at(index));
    }
  }

  initFight() {
    this.pDeck = this.deck.slice();
    this.hand = [];
    this.discardPile = [];
    shuffleArray(this.pDeck);
  }

  initTurn() {
    super.initTurn();
    this.drawCards(START_HAND_SIZE);
    this.mana = 3;
  }

  endTurn() {
    while (this.hand.length > 0) {
      const card = this.hand.pop();
      this.discardPile.push(card);
    }
  }

  drawCards(count) {
    for (let i = 0; i < count; i++) {
      if (this.handIsFull()) {
        this.log.info('Player hand is full');
        break;
      }
      if (this.pDeck.length === 0) {
        this.refillDeck();
      }
      if (this.pDeck.length === 0) {
        this.log.info('No more card available');
        break;
      }
      const drawnCard = this.pDeck.shift();
      this.hand.push(drawnCard);
    }
  }

  handIsFull() {
    return this.hand.length >= this.maxHandSize;
  }

  refillDeck() {
    this.pDeck = shuffleArray(this.discardPile);
    this.discardPile = [];
  }

  draw(ctx, canvas) {
    this.drawHUD(ctx);
    this.drawHand(ctx, canvas);
    this.drawCardStores(ctx, canvas);
  }

  drawHUD(ctx) {
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.textBaseline = 'top';
    ctx.font = '12px monospace';
    ctx.fillText(this.hp + '/' + this.maxHp + ' HP', 0, 0);
    ctx.fillStyle = '#0037ff';
    ctx.fillText(this.mana + ' AP', 0, 15);
    ctx.fillStyle = '#777';
    ctx.fillText(this.block + ' DEF', 0, 30);
    ctx.restore();
  }

  drawHand(ctx, canvas) {
    ctx.save();
    let x = 10, y = 150;
    this.hand.forEach((card, idx) => {
      if (x + cardWidth > canvas.width - 10) {
        x = 10;
        y += cardHeight + 10;
      }
      this.drawCard(card, ctx, x, y, idx);
      x += (cardWidth + 10);
    });
    ctx.restore();
  }

  canPlayCard(card) {
    return this.mana >= card.baseCost;
  }

  playCard(cardIndex, parent) {
    const card = this.hand[cardIndex];
    if (!card) {
      return;
    }
    if (!this.canPlayCard(card)) {
      this.log.info(`Not enough AP to play card "${card}"`);
      return;
    }
    this.mana -= card.baseCost;
    this.log.info(card);

    const targets = this.getTargetsForCard(card, parent.enemies);

    card.behaviours.forEach((b) => {
      targets.forEach((target) => {
        b.fn(target);
      });
    });

    this.hand.splice(cardIndex, 1);

    this.discardPile.push(card);
  }

  drawCard(card, ctx, x, y, idx) {
    ctx.save();
    ctx.font = '12px monospace';
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, cardWidth, cardHeight);
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#000';
    ctx.fillText(card.baseCost.toString(), x, y);
    ctx.fillText(card.name, x + 10, y);

    ctx.textAlign = 'center';
    ctx.fillText(`Key [${idx}]`, x + cardWidth / 2, y + cardHeight / 2);

    ctx.restore();
  }

  drawCardStores(ctx, canvas) {
    this.drawDeck(ctx, canvas);
    this.drawDiscardPile(ctx, canvas);
  }

  drawDeck(ctx, canvas) {
    ctx.save();
    ctx.font = '12px monospace';
    ctx.fillStyle = '#00bf2f';
    ctx.fillRect(0, canvas.height - 30, 30, 30);
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText(this.pDeck.length.toString(), 15, canvas.height - 15);
    ctx.restore();
  }

  drawDiscardPile(ctx, canvas) {
    ctx.save();
    ctx.font = '12px monospace';
    ctx.fillStyle = '#787878';
    ctx.fillRect(canvas.width - 30, canvas.height - 30, 30, 30);
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText(this.discardPile.length.toString(), canvas.width - 15, canvas.height - 15);
    ctx.restore();
  }
}
