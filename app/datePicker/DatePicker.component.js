import san from 'san';

import './dataPicker.scss';

import SelectorBoxComponent from './SelectorBox.component';

export default san.defineComponent({
  components: {
    'selector-box': SelectorBoxComponent,
  },

  template: `
  <div class="data-picker-wrapper" on-click="stopPropagation($event)">
    <div
      class="input{{ isBoxShow ? ' box-show' : ''}}"
      on-click="toggle"
    >
      <span class="{{ value ? '' : 'unchecked'}}">{{ value ? value : '选择日期' }}</span>
      <span class="delete-btn" s-if="value" on-click="handleDelete($event)"></span>
    </div>
    
    <selector-box
      s-if="isBoxShow"
      s-transition="trans.selectorBox"
    >
    </selector-box>
  </div>
  `,

  initData() {
    return {
      date: '',
      todayTime: 0,
      value: '',
      isBoxShow: false,
    };
  },

  inited() {
    // 模拟blur
    document.body.addEventListener('click', () => this.data.set('isBoxShow', false));
  },

  stopPropagation(e) {
    e.stopPropagation();
  },

  handleDelete(e) {
    e.stopPropagation();
    this.data.set('value', '');
  },

  trans: {
    selectorBox: {
      enter: function (el, done) {
        el.classList.add('before-enter');

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
  },

  toggle() {
    this.data.set('isBoxShow', !this.data.get('isBoxShow'));
  },
});