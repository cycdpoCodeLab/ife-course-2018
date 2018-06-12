import san from 'san';

import './csacader.scss';

import UlSelectorComponent from './UlSelector.component';

export default san.defineComponent({
  components: {
    'ul-selector': UlSelectorComponent
  },
  template: `
  <div class="csacader-wrapper">
    <div
      class="input{{ isBoxShow ? ' box-show' : ''}}"
      on-click="toggle"
    >
      <span>{{ value ? value : '请选择' }}</span>
    </div>
    
    <div
      s-if="isBoxShow"
      s-transition="trans.selectorBox"
      class="selector-box"
    >
      <ul-selector options="{{ options }}" selectedOptions="{{ selectedOptions }}" value="{{ selectedOptions[0] }}"></ul-selector>
    </div>
  </div>
  `,

  initData() {
    return {
      options: [],
      selectedOptions: [],
      value: '',
      isBoxShow: false,
    };
  },

  messages: {
    'UI:final_selected': function (arg) {
      let
        _selectedOptions = arg.value
        , _option = this.data.get('options')
      ;

      // 把value数组映射成label数组
      let _aSelectedLabel = _selectedOptions.map(sValue => {
        let _target = _option.filter(obj => obj.value === sValue)[0];
        _option = _target.children;
        return _target.label;
      });

      this.data.set('selectedOptions', _selectedOptions);
      this.data.set('value', _aSelectedLabel.join(' > '));
      this.data.set('isBoxShow', false);
      console.log(this.data.get('value'));
    }
  },

  trans: {
    selectorBox: {
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
  },

  toggle() {
    this.data.set('isBoxShow', !this.data.get('isBoxShow'));
  },
});