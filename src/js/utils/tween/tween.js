export class Tween {
  /**
   *
   * @param options
   * @param {number} options.duration duration in milliseconds
   * @param {function} [options.func] interpolation function. If not provided, linear interpolation will be used.
   * @param {Object} options.targetObj parent object of the modified property
   * @param {string} options.targetProp name of the property to be modified in options.targetObj
   * @param {number} [options.from] initial value when starting tween. If not provided, use the value of the property at start.
   * @param {number} options.to target value
   * @param {function} [options.onComplete] handler to be called when tween is completed
   *
   */
  constructor(options) {
    const opts = options || {};
    opts.func = typeof(opts.func) === 'function' ? opts.func :
        (typeof(opts.func) === 'string' ? EASING[opts.func] : EASING.linear);
    this._checkParams(opts);
    /**
     * @property duration
     * @type number
     * Duration of the tween
     */
    this.duration = opts.duration;
    /**
     * @property func
     * @type function (number,number,number):number
     * Function called for interpolating value
     */
    this.func = opts.func;
    /**
     * Target object to alter on update call
     */
    this.targetObj = opts.targetObj;
    /**
     * property to modify when update method is called
     */
    this.targetProp = opts.targetProp;
    this.from = opts.from;
    this.to = opts.to;
    /**
     * boolean that indicates if the Tween is running
     */
    this.running = false;
    this.ended = false;

    this._onComplete = opts.onComplete;
  }

  start() {
    if (this.from === undefined || this.from === null) {
      this.from = this.targetObj[this.targetProp];
    }
    this._start = Date.now();
    this.running = true;
    this.update();
    return this;
  }

  update() {
    if (!this.running) {
      if (this.ended && this.nextTween) {
        this.nextTween.update();
      }
      return;
    }
    const currTime = Date.now();
    const progress = Math.min((currTime - this._start) / this.duration, 1);
    this._applyFunc(progress);
    if (progress === 1) {
      this.running = false;
      this.ended = true;
      this._onComplete && this._onComplete(this.targetObj);
      this.nextTween && this.nextTween.start();
    }
  }

  chain(tween) {
    this.nextTween = tween;
    return this;
  }

  /**
   *
   * @param opts
   * @private
   */
  _checkParams(opts) {
    if (!opts.duration) {
      throw new Error('duration is required');
    }
    if (!opts.func) {
      throw new Error('func is required');
    }
    if (!opts.targetObj || typeof(opts.targetObj) !== 'object') {
      throw new Error('targetObj is required and must be an object');
    }
    if (!opts.targetProp || typeof(opts.targetProp) !== 'string') {
      throw new Error('targetProp is required and must be a string');
    }
  }

  /**
   * @param progress
   * @private
   */
  _applyFunc(progress) {
    this.targetObj[this.targetProp] = EASING.linear(this.from, this.to, progress);
    // console.log(progress, ' : ', this.targetObj[this.targetProp]);
  }
}

export const EASING = {
  linear: (b, c, p) => b + (c - b) * p
};
