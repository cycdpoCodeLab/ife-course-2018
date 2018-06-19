import san from 'san';

import './formItem.scss';

export default san.defineComponent({
  components: {},

  template: `
  <div class="form-item-wrapper">
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
    };
  },

  inited() {
    // 赋值labelWidth
    let formComponent = this.parentComponent;
    if (formComponent.tagName === 'form') {
      this.data.set('labelWidth', formComponent.data.get('labelWidth'));
      this.data.set('labelPosition', formComponent.data.get('labelPosition'));
    }
  },

});