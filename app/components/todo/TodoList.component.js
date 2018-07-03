import san from 'san';

import './todoList.scss';

import TodoListItem from './TodoListItem.component';

export default san.defineComponent({
  components: {
    'todo-list-item': TodoListItem,
  },

  template: `
  <section class="main">
    <button 
      class="toggle-all{{ isAllChecked ? ' all-checked' : ''}}"
      on-click="toggleAll"></button>
    <ul class="todo-list">
      <todo-list-item 
        s-for="item in showList"
        item="{{ item }}"/>
    </ul>
  </section>
  `,

  initData() {
    return {
      showList: [],
      isAllChecked: false,
    };
  },

  inited() {
  },

  toggleAll() {
    this.dispatch('toggle-all-todo');
  }
});

