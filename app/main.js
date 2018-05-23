// global css
import './theme/main.scss';

if (DEVELOPMENT) {
  console.log('Development Mode');
}

if (PRODUCTION) {
  console.log('Production Mode');
}

// web page init
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');

  let
    eText = document.querySelector('.text')
    , eButton = document.querySelector('.button')
  ;

  const ACTIVE_CLASS_NAME = 'active';

  eButton.addEventListener('click', () => {
    if (eText.classList.contains(ACTIVE_CLASS_NAME)) {
      eText.classList.remove(ACTIVE_CLASS_NAME);
      return;
    }

    eText.classList.add(ACTIVE_CLASS_NAME);
  });

}, false);
