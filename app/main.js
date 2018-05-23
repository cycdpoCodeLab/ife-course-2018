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

  // 点击按钮时变更eText的样式
  eButton.addEventListener('click', () => eText.classList.toggle(ACTIVE_CLASS_NAME));
}, false);
