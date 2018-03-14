import {AbstractState} from "./abstract-state";

import logo1 from '../../assets/trollface-meme.png';

export class LogosState extends AbstractState {
  constructor(app) {
    super('Logos state', app);
  }

  enterState() {
    this.log.info('Logo screen');

    this.image = new Image();
    this.image.src = logo1;
    this.logoOpacity = 0;
    this.yLogo = -200;
    this.opacityStep = 0.01;

    this.draw();

    this.refreshHandler = setInterval(() => this.update(), 1000 / 60);
  }

  update() {
    const verticalAxisStep = 2;

    this.logoOpacity += this.opacityStep;
    this.draw();
    this.yLogo += verticalAxisStep;
    if (this.logoOpacity >= 1) {
      this.opacityStep = -this.opacityStep;
    }
    else if (this.logoOpacity < 0) {
      this.timeout();
    }
  }

  draw() {
    const ctx = this.parent.context;
    const canvas = this.parent.canvas;
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = this.logoOpacity;
    const xImage = 72;
    ctx.drawImage(this.image, xImage, this.yLogo);
    ctx.restore();
  }

  timeout() {
    const ctx = this.parent.context;
    const canvas = this.parent.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.parent.transition(this.parent.homeState);
  }

  exitState() {
    this.refreshHandler && clearInterval(this.refreshHandler);
  }
}