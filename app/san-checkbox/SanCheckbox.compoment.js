import san from 'san';

import './sanCheckbox.scss';

export default san.defineComponent({
  template: `
  <template class="san-checkbox">
    <input 
      type="checkbox"
      checked="{= checked =}"
      value="{{ value }}"
      trueValue="{{ trueValue }}"
      falseValue="{{ falseValue }}"
      indeterminate="{{ indeterminate }}"
      disabled="{{ disabled }}"
      on-change="handleChange($event)"
    />
    <slot></slot>
  </template>
  `,

  initData() {

    // let _value = undefined;

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
    this.fire('change', e);
  },
});