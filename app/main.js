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
  template: `
  <div class="root">
      <div class="block" style="background: {{ isBlock1Changed ? 'red' : 'blue'}};"></div>
      <button id="changeButton1" on-click="toggle('isBlock1Changed')">通过style方式改变</button>
      
      <div class="block{{ isBlock2Changed ? ' changed' : '' }}"></div>
      <button id="changeButton2" on-click="toggle('isBlock2Changed')">通过class方式改变</button>
  </div>
  `,

  initData: function () {
    return {
      isBlock1Changed: false,
      isBlock2Changed: false
    };
  },

  /**
   * 切换状态
   * @param stateName
   */
  toggle: function (stateName) {
    this.data.set(stateName, !this.data.get(stateName));
  },
});

let myApp = new MyApp();

myApp.attach(document.body);

