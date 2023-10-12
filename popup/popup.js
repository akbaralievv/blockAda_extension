import {
  getRulesEnabledState,
  enableRulesForCurrentPage,
  disableRulesForCurrentPage,
} from '../scripts/background.js';

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
        16: '../assets/images/logo-off_16.png',
        48: '../assets/images/logo-off_32.png',
        128: '../assets/images/logo-off_64.png',
      },
    });
  } else {
    text.innerHTML = 'Enabled';
    wrapperPopup.classList.remove('disabled');
    chrome.action.setIcon({
      path: {
        16: '../assets/images/logo_16.png',
        48: '../assets/images/logo_32.png',
        128: '../assets/images/logo_64.png',
      },
    });
  }
}

button.addEventListener('click', async () => {
  const isEnabled = await getRulesEnabledState();
  if (isEnabled) {
    await disableRulesForCurrentPage();
  } else {
    await enableRulesForCurrentPage();
  }

  updateButtonState();
});

updateButtonState();
