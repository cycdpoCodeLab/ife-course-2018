import san from 'san';

import './todoFooter.scss';

export default san.defineComponent({
  components: {},

  template: `
    <footer class="footer">
      <span class="items-count">{{ todoList | leftCount }}</span>
    </footer>
  `,

  initData() {
    return {
      todoList: [],
      type: 'all'
    };
  },

  inited() {
  },

  filters: {
    leftCount(todoList) {
      let _leftCount = todoList.filter(item => !item.completed).length;
      if (_leftCount === 1) {
        return _leftCount + ' item left';
      }

      return _leftCount + ' items left';
    }
  }

});

