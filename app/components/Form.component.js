import san from 'san';

import './form.scss';

import Schema from 'async-validator';

export default san.defineComponent({
  components: {},

  template: `
  <form class="form-wrapper">
    <slot var-labelWidth="labelWidth" var-labelPosition="labelPosition"></slot>
  </form>
  `,

  initData() {
    return {
      labelWidth: '100px',
      labelPosition: 'left',
      formModel: {},

      rules: {},
      errorFuncs: {},
      resetFuncs: {}
    };
  },

  inited() {
    console.log(this.data.get('formModel'));
  },

  messages: {
    'form-item-inited'(arg) {
      let _formItemComponent = arg.target;

      // 赋值input组件验证方法和重置方法
      _formItemComponent.data.set('labelWidth', this.data.get('labelWidth'));
      _formItemComponent.data.set('labelPosition', this.data.get('labelPosition'));
    },

    'input-inited'(arg) {
      let _value = arg.value;

      // 赋值input组件错误显示方法和重置方法
      this.data.set('rules.' + _value.prop, _value.rules);
      this.data.set('errorFuncs.' + _value.prop, _value.error);
      this.data.set('resetFuncs.' + _value.prop, _value.reset);
    },

    'input-validate'(arg) {
      this.validateField(arg.value.prop);
    },
  },

  validateField(field) {
    if (!this.data.get('formModel').hasOwnProperty(field)) {
      throw new Error('can\'t find field: ' + field);
    }

    let
      _rules = this.data.get('rules.' + field)
      , _value = this.data.get('formModel.' + field)
      , _validator = new Schema({[field]: _rules})
    ;

    console.log(field, _value);

    _validator.validate({
      [field]: _value
    }, errors => {
      this.data.get('errorFuncs.' + field)(errors);
    });
  },

  validate(callback) {
    // todo
  },

  resetFields() {
    let _resetFuncs = this.data.get('resetFuncs');
    for (let _key in _resetFuncs) {
      if (_resetFuncs.hasOwnProperty(_key)) {
        _resetFuncs[_key]();
      }
    }
  },
});

