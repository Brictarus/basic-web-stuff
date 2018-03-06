import {AbstractState} from "./abstract-state";

export class InitState extends AbstractState {
  constructor(app) {
    super('Initial state', app);
  }

  enterState() {
    this.parent.transition(this.parent.logosState);
  }
}