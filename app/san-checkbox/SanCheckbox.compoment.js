import san from 'san';

import './sanCheckbox.scss';

export default san.defineComponent({
  template: `
  <template class="san-checkbox{{checked ? ' checked' : ''}}{{indeterminate ? ' indeterminate' : ''}}{{disabled ? ' disabled' : ''}}">
    <span class="icon"></span>
    <input
      type="checkbox"
      checked="{= checked =}"
      indeterminate="{{ indeterminate }}"
      disabled="{{ disabled }}"
      on-change="handleChange($event)"
    />
    <slot></slot>
  </template>
  `,

  initData() {
    return {
      checked: false,
      value: undefined,
      trueValue: undefined,
      falseValue: undefined,
      disabled: false,
      indeterminate: false,
    };
  },
  handleChange(e) {
    this.data.set('indeterminate', false);

    let
      trueValue = this.data.get('trueValue')
      , falseValue = this.data.get('falseValue')
      , checked = this.data.get('checked')
      , _value
    ;

    if (checked) {
      _value = trueValue ? trueValue : true;
    } else {
      _value = falseValue ? falseValue : false;
    }

    this.data.set('value', _value);

    this.fire('change', e);
  },
});