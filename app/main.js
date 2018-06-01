// global css
import './theme/main.scss';

// 引入san
import san from 'san';

// 引入component
import HigherParentComponent from './HigherParent.component';

if (DEVELOPMENT) {
  console.log('Development Mode');
}

if (PRODUCTION) {
  console.log('Production Mode');
}


// 定义Component
let MyApp = san.defineComponent({
  components: {
    'higher-parent': HigherParentComponent
  },
  template: `
  <div class="root">
    <higher-parent></higher-parent>
  </div>
  `,
});

let myApp = new MyApp();

myApp.attach(document.body);

