import { getRulesEnabledState, enableRules, disableRules } from '../scripts/background.js';

const wrapperPopup = document.querySelector('.wrapper');
const button = document.getElementById('btn-on');
const text = document.querySelector('.text-content');

async function updateButtonState() {
  const isEnabled = await getRulesEnabledState();
  if (!isEnabled) {
    text.innerHTML = 'Disabled';
    wrapperPopup.classList.add('disabled');
    chrome.action.setIcon({
      path: {
        16: '../assets/images/logo-off.png',
        48: '../assets/images/logo-off.png',
        128: '../assets/images/logo-off.png',
      },
    });
  } else {
    text.innerHTML = 'Enabled';
    wrapperPopup.classList.remove('disabled');
    chrome.action.setIcon({
      path: {
        16: '../assets/images/logo.png',
        48: '../assets/images/logo.png',
        128: '../assets/images/logo.png',
      },
    });
  }
}

button.addEventListener('click', async () => {
  const isEnabled = await getRulesEnabledState();
  if (isEnabled) {
    await disableRules();
  } else {
    await enableRules();
  }

  updateButtonState();
});

updateButtonState();
