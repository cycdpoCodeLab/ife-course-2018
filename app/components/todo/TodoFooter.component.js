import san from 'san';

import './todoFooter.scss';

export default san.defineComponent({
  components: {},

  template: `
    <footer class="footer">
      <span class="items-count">{{ todoList | leftCount }}</span>
      <button s-if="{{ completedCount }}"
        class="clear-completed"
        on-click="clearCompleted">Clear completed</button>
      
      <div class="filters-wrapper">
        <a href="javascript:;"
          class="{{ type === 'all' ? 'selected' : ''}}"
          on-click="typeChange('all')">All</a>
        <a href="javascript:;"
          class="{{ type === 'active' ? 'selected' : ''}}"
          on-click="typeChange('active')">Active</a>
        <a href="javascript:;"
          class="{{ type === 'completed' ? 'selected' : ''}}"
          on-click="typeChange('completed')">Completed</a>
      </div>
    </footer>
  `,

  initData() {
    return {
      todoList: [],
      type: '',
      completedCount: 0
    };
  },

  inited() {
  },
  filters: {
    leftCount(todoList) {
      let _leftCount = todoList.length - this.data.get('completedCount');
      if (_leftCount === 1) {
        return _leftCount + ' item left';
      }

      return _leftCount + ' items left';
    },
  },

  computed: {
    completedCount() {
      return this.data.get('todoList').filter(item => item.completed).length;
    }
  },

  typeChange(type) {
    this.data.set('type', type);
  },

  clearCompleted() {
    this.dispatch('clear-completed-todo');
  },
});

