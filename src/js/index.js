import {App} from "./app";
import {config} from "../conf";
import {Logger} from "./utils/logger/logger";

import '../styles/main.scss';
import {Autoscroller} from "./utils/autoscroller";

window.addEventListener('load', () => {
  const initAutoscrollLogCheckbox = function (autoscrollLogKey, autoscrollLogCheckbox) {
    let initValue = JSON.parse(localStorage.getItem(autoscrollLogKey));
    initValue = (initValue !== null && typeof(initValue) === "boolean") ? initValue : true;
    autoscrollLogCheckbox.checked = initValue;
  };

  const initDebug = function () {
    const autoscrollLogKey = 'logs-autoscroll';
    const debugRoot = document.getElementById('debug');
    const logsContainer = document.getElementById('logs-container');
    const autoscrollLogCheckbox = document.getElementById('scroll-to-bottom-log');
    autoscrollLogCheckbox.addEventListener('change', () => {
      const value = autoscrollLogCheckbox.checked;
      localStorage.setItem(autoscrollLogKey, value.toString());
    });
    initAutoscrollLogCheckbox(autoscrollLogKey, autoscrollLogCheckbox);
    new Autoscroller(logsContainer, 10, autoscrollLogCheckbox);

    document.addEventListener('keydown', (e) => {
      if (e.which === 222) {
        debugRoot.classList.toggle('hidden');
      }
    })
  };

  Logger.setConfig(config.loggers);
  new App(document.querySelector('#main canvas'));

  initDebug();
});
