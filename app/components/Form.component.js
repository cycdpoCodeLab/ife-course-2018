import san from 'san';

import './form.scss';

export default san.defineComponent({
  components: {
  },

  template: `
  <form class="form-wrapper">
    <slot></slot>
  </form>
  `,

  initData() {
    return {
      labelWidth: '100px',
      rules: [],
      labelPosition: 'left',
    };
  },
});

