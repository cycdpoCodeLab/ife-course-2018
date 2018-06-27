import san from 'san';

import './formItem.scss';

export default san.defineComponent({
  template: `
  <div
    class="form-item-wrapper"
    style="{{ label === '' && labelPosition !== 'top' ? 'margin-left: ' + labelWidth + ';' : '' }}">
    <label
      s-if="label"
      class="{{ require ? 'require' : '' }}"
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

    // 赋值require
    let
      _rules = this.data.get('rules')
      , _isRequire = this.data.get('require')
      , _hasRequiredInRule = false      // rule中是否存在'required'属性
    ;

    for (let i = 0, len = _rules.length; i < len; i++) {
      if (_hasRequiredInRule) {
        break;
      }

      for (let oRuleKey in _rules[i]) {
        if (!_rules[i].hasOwnProperty(oRuleKey)) {
          continue;
        }

        if (oRuleKey === 'required') {
          _hasRequiredInRule = true;
          // 把rule中的required值赋给data的require
          this.data.set('require', _rules[i][oRuleKey]);
          break;
        }
      }
    }

    // data中require为真但rule中没有required规则
    // 添加一条规则
    if (!_hasRequiredInRule && _isRequire) {
      _rules.unshift({
        required: _isRequire,
      });

      this.data.set('rules', _rules);
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

    'date-picker-inited'(arg) {
      let datePickerComponent = arg.target;

      // 传给form组件
      this.dispatch('date-picker-inited', {
        prop: this.data.get('prop'),
        rules: this.data.get('rules'),
        error: datePickerComponent.error.bind(datePickerComponent),
        reset: datePickerComponent.reset.bind(datePickerComponent),
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