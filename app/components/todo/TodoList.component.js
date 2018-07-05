import san from 'san';

import './todoList.scss';

import TodoListItem from './TodoListItem.component';
import {
  Link
} from 'san-router';

export default san.defineComponent({
  components: {
    'todo-list-item': TodoListItem,
    'router-link': Link,
  },

  template: `
  <section class="main">
    <button 
      class="toggle-all{{ isAllChecked ? ' all-checked' : ''}}"
      on-click="toggleAll"></button>
    
    <router-link 
      to="/add"
      class="add-todo"/>
    
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

