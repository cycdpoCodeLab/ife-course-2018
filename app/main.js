// global css
import './theme/main.scss';

// 引入san
import san from 'san';

if (DEVELOPMENT) {
  console.log('Development Mode');
}

if (PRODUCTION) {
  console.log('Production Mode');
}

// 定义Component
let MyApp = san.defineComponent({
  template: `<h1 class="title">{{ hello }}</h1>`
});

let myApp = new MyApp({
  data: {
    hello: 'Hello World!'
  }
});

myApp.attach(document.body);

