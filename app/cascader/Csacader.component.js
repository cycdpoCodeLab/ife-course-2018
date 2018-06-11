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
      <span>{{ value }}</span>
    </div>
    
    <div
      s-if="isBoxShow"
      class="selector-box"
    >
      <ul-selector options="{{ options }}" selectedOptions="{{ selectedOptions }}"></ul-selector>
    </div>
  </div>
  `,

  initData() {
    return {
      options: [],
      selectedOptions: [],
      value: '请选择',
      isBoxShow: false,
    };
  },

  messages: {
    'UI:final_selected': function (arg) {
      let
        _selectedOptions = arg.value
        , _option = this.data.get('options')

        // 把value数组映射成label数组
        , _aSelectedLabel = _selectedOptions.map(sValue => {
          let _target = _option.filter(obj => obj.value === sValue)[0];
          _option = _target.children;
          return _target.label;
        })
      ;

      this.data.set('selectedOptions', _selectedOptions);
      this.data.set('value', _aSelectedLabel.join(' > '));
      this.data.set('isBoxShow', false);
      console.log(this.data.get('selectedOptions'));
    }
  },

  toggle() {
    this.data.set('isBoxShow', !this.data.get('isBoxShow'));
  },
});