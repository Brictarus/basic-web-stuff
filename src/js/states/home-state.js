import {AbstractState} from "./abstract-state";
import {Logger} from "../utils/logger/logger";
import {LOG_LEVELS} from "../utils/logger/log-level";
import {config} from "../../conf";

let log;

export class HomeState extends AbstractState {
  constructor(app) {
    super('Home state', app);
    log = Logger.getLogger('state', LOG_LEVELS.DEBUG, config.getLogContainer());
  }

  enterState() {
    log.info('Welcome on the home screen');

    this.options = [
      {label: 'Play !', key: 1, keyCode: 97},
      {label: 'Config', key: 2, keyCode: 98},
      {label: 'Stats', key: 3, keyCode: 99}
    ];
    this.selectedOptionIndex = 0;

    this._choiceKeyCodesMap = this.options.reduce((prev, curr) => {
      prev[curr.keyCode] = curr;
      return prev;
    }, {});

    this.keyDownHandler = this.onKeyDown.bind(this);
    document.addEventListener('keydown', this.keyDownHandler);
    this.draw();
  }

  focusNextOption() {
    if (++this.selectedOptionIndex >= this.options.length) {
      this.selectedOptionIndex = 0;
    }
    this.draw();
  }

  focusPreviousOption() {
    if (--this.selectedOptionIndex < 0) {
      this.selectedOptionIndex = this.options.length - 1;
    }
    this.draw();
  }

  draw() {
    const ctx = this.parent.context;
    const canvas = this.parent.canvas;

    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff1493';
    ctx.textBaseline = 'top';
    ctx.font = '56px monospace';
    const {width: titleWidth} = ctx.measureText('HOME');
    ctx.fillText('HOME', 400 / 2 - titleWidth / 2, 80, 400);
    ctx.font = '12px monospace';
    ctx.translate(0, 200);
    this.drawOptions();
    ctx.restore();
  }

  drawOptions() {
    log.info('Choose an entry :');
    const ctx = this.parent.context;
    this.options.forEach((item, index) => {
      const displayedText = '[' + item.key + '] ' + item.label;
      if (index === this.selectedOptionIndex) {
        ctx.fillStyle = '#00bf2f';
        ctx.fillText('->', 20, index * 20, 400);
        log.info('->', displayedText);
      } else {
        ctx.fillStyle = '#ff1493';
        log.info('__', displayedText);
      }
      ctx.fillText(displayedText, 40, index * 20, 400);
    });
  }

  onKeyDown(e) {
    const selectedOption = this._choiceKeyCodesMap[e.which];
    if (selectedOption) {
      this.chooseOption(selectedOption);
    } else {
      switch (e.which) {
          // UP key
        case 38:
          this.focusPreviousOption();
          break;
          // DOWN key
        case 40:
          this.focusNextOption();
          break;
          // ENTER key
        case 13:
          this.chooseOption(this.options[this.selectedOptionIndex]);
          break;
        default:
      }
    }
  }

  exitState() {
    this.keyDownHandler && document.removeEventListener('keydown', this.keyDownHandler);
    this.keyDownHandler = undefined;
  }

  chooseOption(option) {
    log.warn('You have chosen : ', option.label);
    this.parent.transition(this.parent.mainState);
  }
}