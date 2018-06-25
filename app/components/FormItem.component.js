import san from 'san';

import './formItem.scss';

export default san.defineComponent({
  template: `
  <div
    class="form-item-wrapper"
    style="{{ label === '' && labelPosition !== 'top' ? 'margin-left: ' + labelWidth + ';' : '' }}">
    <label
      s-if="label"
      style="{{ labelWidth ? 'width: ' + labelWidth + ';' : ''}}"
    >{{ label }}</label>
    
    <slot></slot>
  </div>
  `,

  initData() {
    return {
      rules: [],
      prop: '',
      helpText: '',
      require: false,
      label: '',
      labelWidth: '',
      labelPosition: '',
    };
  },

  inited() {
    // 保证prop不为空
    if (!this.data.get('prop')) {
      this.data.set('prop', this.id);
    }

    // 传给form组件
    this.dispatch('form-item-inited');
  },

  messages: {
    'input-inited'(arg) {
      let inputComponent = arg.target;
      // 初始化 input data
      inputComponent.data.set('helpText', this.data.get('helpText'));

      // 传给form组件
      this.dispatch('input-inited', {
        prop: this.data.get('prop'),
        rules: this.data.get('rules'),
        error: inputComponent.error.bind(inputComponent),
        reset: inputComponent.reset.bind(inputComponent),
      });
    },

    'input-validate'() {
      // 传给form组件
      this.dispatch('input-validate', {
        prop: this.data.get('prop')
      });
    },
  },

});