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

  // 修复加载时执行变形动画
  const TRANSITION_CLASS_NAME = 'transition';
  let
    eFace = document.querySelector('.face')
    , eMouthLeft = eFace.querySelector('.mouth-wrap .left')
    , eMouthRight = eFace.querySelector('.mouth-wrap .right')
    , aFaceReds = Array.prototype.slice.call(eFace.querySelectorAll('.face-red'))
  ;

  setTimeout(() => [
    eFace,
    eMouthLeft,
    eMouthRight,
    ...aFaceReds
  ].forEach(el => el.classList.add(TRANSITION_CLASS_NAME)), 5e2);
}, false);
