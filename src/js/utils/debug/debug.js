import {Autoscroller} from "../autoscroller";

const template = '' +
    '<button class="show-debug">Debug panel</button>' +
    '<div class="button-group">' +
    '    <button class="hide-debug">hide panel</button>' +
    '    <label for="scroll-to-bottom-log">autoscroll<input type="checkbox" id="scroll-to-bottom-log"/></label>' +
    '</div>' +
    '<div id="logs-container"></div>';

function initAutoscrollLogCheckbox(autoscrollLogKey, autoscrollLogCheckbox) {
  let initValue = JSON.parse(localStorage.getItem(autoscrollLogKey));
  initValue = (initValue !== null && typeof(initValue) === "boolean") ? initValue : true;
  autoscrollLogCheckbox.checked = initValue;
}

export function initDebug () {
  const autoscrollLogKey = 'debug-log-autoscroll';
  const panelVisibleKey = 'debug-panel-visible';

  const showDebugPanel = JSON.parse(localStorage.getItem(panelVisibleKey)) || false;

  const debugDiv = document.createElement('div');
  debugDiv.id = 'debug';
  if (!showDebugPanel) {
    debugDiv.classList.add('hidden');
  }
  debugDiv.innerHTML = template;
  document.body.appendChild(debugDiv);

  const debugRoot = document.getElementById('debug');
  const logsContainer = document.getElementById('logs-container');
  const autoscrollLogCheckbox = document.getElementById('scroll-to-bottom-log');
  autoscrollLogCheckbox.addEventListener('change', () => {
    const value = autoscrollLogCheckbox.checked;
    localStorage.setItem(autoscrollLogKey, value.toString());
  });
  initAutoscrollLogCheckbox(autoscrollLogKey, autoscrollLogCheckbox);
  new Autoscroller(logsContainer, 10, autoscrollLogCheckbox);

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
}