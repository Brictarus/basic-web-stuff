import {App} from "./app";
import {config} from "../conf";
import {Logger} from "./utils/logger";

window.addEventListener('load', () => {
  Logger.setConfig(config.loggers);

  new App(document.getElementById('content'));
});
