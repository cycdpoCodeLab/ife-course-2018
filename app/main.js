// 这个js只是用来打包scss，没有其他用处

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
}, false);
