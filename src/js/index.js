import {App} from "./app";
import {config} from "../conf";
import {Logger} from "./utils/logger/logger";

import '../styles/main.scss';
import {initDebug} from "./utils/debug/debug";

window.addEventListener('load', () => {
  initDebug();

  Logger.setConfig(config.loggers);
  new App(document.querySelector('#main canvas'));
});
