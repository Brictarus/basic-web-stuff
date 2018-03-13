export class Autoscroller {
  constructor(scrollContainer, refreshDelay = 10, checkbox = null) {
    this._container = scrollContainer;
    this._enabled = checkbox ? checkbox.checked : true;
    this._refreshDelay = refreshDelay;
    this._intervalHandler = null;

    if (checkbox) {
      checkbox.addEventListener('change', () => this.autoscrollLogs(checkbox.checked));
    }
    this.autoscrollLogs(this._enabled);
  }

  autoscrollLogs(enable) {
    if (this._intervalHandler !== null) {
      clearInterval(this._intervalHandler);
    }
    if (enable) {
      this._intervalHandler = setInterval(() => {
        this._container.scrollTop = this._container.scrollHeight;
      }, this._refreshDelay);
    }
    this._enabled = enable;
  }
}