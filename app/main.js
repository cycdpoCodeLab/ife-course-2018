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
  let eFace = document.querySelector('.face');
  setTimeout(() => eFace.classList.add('transition'), 5e2);
}, false);
