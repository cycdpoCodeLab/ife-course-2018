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
    <button on-click="toggle">TOGGLE</button>
    <span s-if="show" s-transition="trans.opacity">
      Transition Layer
    </span>
  </div>
  `,

  initData() {
    return {
      show: true
    };
  },

  toggle() {
    this.data.set('show', !this.data.get('show'));
  },

  trans: {
    opacity: {
      enter: function (el, done) {
        el.classList.add('before-enter');

        // 将任务放入下一个列队，防止样式渲染异常
        setTimeout(() => {
          el.classList.add('enter');
          el.classList.remove('before-enter');
        }, 0);

        el.addEventListener('transitionend', () => {
          el.classList.remove('enter');
          done();
        });
      },

      leave: function (el, done) {
        el.classList.add('before-leave');

        // 将任务放入下一个列队，防止样式渲染异常
        setTimeout(() => {
          el.classList.add('leave');
          el.classList.remove('before-leave');
        }, 0);

        el.addEventListener('transitionend', () => {
          el.classList.remove('leave');
          done();
        });
      }
    }
  }
});

new MyApp().attach(document.body);

