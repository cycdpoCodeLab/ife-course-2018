// global css
import './theme/main.scss';

import lottie from 'lottie-web';

// 生成的动画json
import * as headerAnimation from 'headerAnimation.json';
import * as hoverAnimation from 'hoverAnimation.json';

if (DEVELOPMENT) {
  console.log('Development Mode');
}

if (PRODUCTION) {
  console.log('Production Mode');
}

// web page init
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');

  // 加载头部svg动画
  lottie.loadAnimation({
    container: document.querySelector('.header'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: headerAnimation
  });

  let eCard = document.querySelector('.card');

  // 加载卡片svg动画
  let cardHoverAnimation = lottie.loadAnimation({
    container: eCard.querySelector('.pattern'),
    renderer: 'svg',
    loop: false,
    prerender: true,
    autoplay: false,
    animationData: hoverAnimation
  });

  eCard.addEventListener('mouseenter', () => cardHoverAnimation.play());
  eCard.addEventListener('mouseleave', () => cardHoverAnimation.stop());

}, false);
