import san from 'san';

import './todo.scss';

import NewTodo from './NewTodo.component';

export default san.defineComponent({
  components: {
    'new-todo': NewTodo,
  },

  template: `
  <section class="todoapp">
    <new-todo value="{= newTodo =}"></new-todo>
  </section>
  `,

  initData() {
    return {
      newTodo: ''
    };
  },

  inited() {
  },

});

