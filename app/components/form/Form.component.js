import san from 'san';

import './form.scss';

import Schema from 'async-validator';

export default san.defineComponent({
  components: {},

  template: `
  <form class="form-wrapper {{ labelPosition }}">
    <slot></slot>
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

  validateField(field, callback) {
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

      if (callback) {
        callback(errors);
      }
    });
  },

  validate(callback) {
    let
      _rules = this.data.get('rules')
      , _formModel = this.data.get('formModel')
      , _errorFuncs = this.data.get('errorFuncs')
      , _validator = new Schema(_rules)
    ;

    _validator.validate(_formModel, (errors, fields) => {

      if (callback) {
        callback(!errors);
      }

      for (let field in _rules) {
        if (!_rules.hasOwnProperty(field)) {
          continue;
        }

        if (fields && fields.hasOwnProperty(field)) {
          _errorFuncs[field](fields[field]);
          continue;
        }

        _errorFuncs[field]();
      }
    });
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

