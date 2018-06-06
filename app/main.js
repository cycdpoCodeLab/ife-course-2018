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
        el.classList.add('enter');

        el.addEventListener('transitionend', ()=>{
          console.log('done');
          done();
        });
      },

      leave: function (el, done) {
        el.classList.remove('enter');

        el.addEventListener('transitionend', ()=>{
          console.log('done');
          done();
        });
      }
    }
  }
});

new MyApp().attach(document.body);

