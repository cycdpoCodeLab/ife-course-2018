import san from 'san';

import './button.scss';

export default san.defineComponent({


  template: `
  <button class="button">
    <slot></slot>
  </button>
  `,

  initData() {
    return {};
  },
});