import san from 'san';

import './taskMenu.scss';

export default san.defineComponent({
  template: `
  <template class="task-menu">
    <h2 s-if="title">{{ title }}</h2>
    <h2 s-else>
      <slot name="title"></slot>
      <slot></slot>
    </h2>
  </template>
  `,

  initData() {
    return {
      title: ''
    };
  },
});