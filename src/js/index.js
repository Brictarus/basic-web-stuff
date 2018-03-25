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
    const autoscrollLogKey = 'debug-log-autoscroll';
    const panelVisibleKey = 'debug-panel-visible';
    const debugRoot = document.getElementById('debug');
    const logsContainer = document.getElementById('logs-container');
    const autoscrollLogCheckbox = document.getElementById('scroll-to-bottom-log');
    autoscrollLogCheckbox.addEventListener('change', () => {
      const value = autoscrollLogCheckbox.checked;
      localStorage.setItem(autoscrollLogKey, value.toString());
    });
    initAutoscrollLogCheckbox(autoscrollLogKey, autoscrollLogCheckbox);
    new Autoscroller(logsContainer, 10, autoscrollLogCheckbox);

    const showDebugPanel = JSON.parse(localStorage.getItem(panelVisibleKey)) || false;
    if (showDebugPanel) {
      debugRoot.classList.remove('hidden');
    }

    document.addEventListener('keydown', (e) => {
      if (e.which === 222) {
        debugRoot.classList.toggle('hidden');
      }
    });

    document.querySelector('.hide-debug').addEventListener('click', () => {
      debugRoot.classList.add('hidden');
      localStorage.setItem(panelVisibleKey, JSON.stringify(false));
    });
    document.querySelector('.show-debug').addEventListener('click', () => {
      debugRoot.classList.remove('hidden');
      localStorage.setItem(panelVisibleKey, JSON.stringify(true));
    });
  };

  Logger.setConfig(config.loggers);
  new App(document.querySelector('#main canvas'));

  initDebug();
});
