import {AbstractState} from "./abstract-state";

import logo1 from '../../assets/trollface-meme.png';
import {config} from "../../conf";

export class LogosState extends AbstractState {
  constructor(app) {
    super('Logos state', app);
  }

  enterState() {
    let image = new Image();
    image.src = logo1;
    image.style.opacity = 0;
    config.getLogContainer().appendChild(image);
    this.log.info('Logo screen');
    this.refreshHandler = setInterval(() => {
      image.style.opacity = Number(image.style.opacity) + 0.01;
      if (image.style.opacity >= 1) {
        this.timeout();
      }
    }, 1000 / 60);
  }

  timeout() {
    this.parent.transition(this.parent.homeState);
  }

  exitState() {
    this.refreshHandler && clearInterval(this.refreshHandler);
  }
}