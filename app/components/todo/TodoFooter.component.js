import san from 'san';

import './todoFooter.scss';

import {
  Link
} from 'san-router';

export default san.defineComponent({
  components: {
    'router-link': Link
  },

  template: `
    <footer class="footer">
      <span class="items-count">{{ todoList | leftCount }}</span>
      <button s-if="{{ completedCount }}"
        class="clear-completed"
        on-click="clearCompleted">Clear completed</button>
      
      <div class="filters-wrapper">
        <router-link
          to="/all"
          class="{{ type === 'all' ? 'selected' : ''}}"
        >All</router-link>
        <router-link
          to="/active"
          class="{{ type === 'active' ? 'selected' : ''}}"
        >Active</router-link>
        <router-link
          to="/completed"
          class="{{ type === 'completed' ? 'selected' : ''}}"
        >Completed</router-link>
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

  clearCompleted() {
    this.dispatch('clear-completed-todo');
  },
});

