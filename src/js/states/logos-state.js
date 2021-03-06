import {AbstractState} from "./abstract-state";

import logo1 from '../../assets/trollface-meme.png';
import {Tween} from "../utils/tween/tween";

const LOGO_ANIMATION_DURATION = 4500;

export class LogosState extends AbstractState {
  constructor(app) {
    super('Logos state', app);
  }

  enterState() {
    this.log.info('Logo screen');

    const logo = this.activeLogo = {};
    logo.image = new Image();
    logo.image.src = logo1;
    logo.opacity = 0;
    logo.x = 72;
    logo.y = -50;

    this.draw();

    const yLogoTween = new Tween({
      duration: LOGO_ANIMATION_DURATION * 0.44,
      targetObj: logo,
      targetProp: 'y',
      to: 72
    });
    const opacityUpTween = new Tween({
      duration: LOGO_ANIMATION_DURATION * 0.55,
      targetObj: logo,
      targetProp: 'opacity',
      to: 1
    });
    const opacityDownTween = new Tween({
      duration: LOGO_ANIMATION_DURATION * 0.22,
      targetObj: logo,
      targetProp: 'opacity',
      to: 0,
      onComplete: () => this.ended = true
    });
    this.tweens = [
      yLogoTween,
      opacityUpTween.chain(opacityDownTween)
    ];
    this.tweens.forEach(t => t.start());

    this.refreshHandler = setInterval(() => this.update(), 1000 / 60);
  }

  update() {
    this.tweens.forEach(t => t.update());
    this.draw();
    if (this.ended) {
      this.timeout();
    }
  }

  draw() {
    const ctx = this.parent.context;
    const canvas = this.parent.canvas;
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = this.activeLogo.opacity;
    ctx.drawImage(this.activeLogo.image, this.activeLogo.x, this.activeLogo.y);
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