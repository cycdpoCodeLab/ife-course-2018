import san from 'san';
import Schema from 'async-validator';


import './input.scss';

export default san.defineComponent({
  components: {},

  template: `
  <div class="input-wrapper">
    <input 
      type="text"
      autocomplete="off"
      placeholder="{{ helpText }}"
      value="{= value =}"
      on-blur="handleBlur"
    />
    
    <div 
    s-if="isError"
    class="error-text"
    >{{ errorText }}</div>
  </div>
  `,

  initData() {
    return {
      value: '',
      rules: [],
      prop: '',
      helpText: '',
      isError: false,
      errorText: ''
    };
  },

  inited() {
    // 赋值labelWidth
    let formItemComponent = this.parentComponent;
    this.data.set('rules', formItemComponent.data.get('rules'));
    this.data.set('prop', formItemComponent.data.get('prop'));
    this.data.set('helpText', formItemComponent.data.get('helpText'));

    // 初始化 _validator
    this._validator = new Schema({
      value: formItemComponent.data.get('rules')
    });
  },

  handleBlur() {
    console.log('blur');

    let _value = this.data.get('value');

    // 验证
    this._validator.validate({
      value: _value
    }, (errors, fields) => {
      if (errors) {
        console.log(errors);
      }
      // validation passed
    });
  },

});