import {AbstractState} from "./abstract-state";

import logo1 from '../../assets/trollface-meme.png';
import {LOG_LEVELS} from "../utils/log-level";
import {Logger} from "../utils/logger";

let log;

export class LogosState extends AbstractState {
  constructor(app) {
    super('Logos state', app);
    log = Logger.getLogger('state', LOG_LEVELS.DEBUG, app.rootElement);
  }

  enterState() {
    let image = new Image();
    image.src = logo1;
    image.style.opacity = 0;
    this.parent.rootElement.appendChild(image);
    log.info('Logo screen');
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