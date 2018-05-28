// global css
import './theme/main.scss';

import lottie from 'lottie-web';

// 生成的动画json
import * as headerAnimation from 'headerAnimation.json';

if (DEVELOPMENT) {
  console.log('Development Mode');
}

if (PRODUCTION) {
  console.log('Production Mode');
}

// web page init
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');

  // 加载svg动画
  lottie.loadAnimation({
    container: document.querySelector('.header'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: headerAnimation
  });

}, false);
