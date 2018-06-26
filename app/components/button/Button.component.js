import san from 'san';

import './button.scss';

export default san.defineComponent({
  template: `
  <button 
    type="button" 
    class="button"
    on-click="handleClick">
    <slot></slot>
  </button>
  `,

  handleClick() {
    this.fire('click');
  },
});

