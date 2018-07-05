// global css
import './theme/main.scss';

// 引入san
import san from 'san';
import './store';

if (DEVELOPMENT) {
  console.log('Development Mode');
}

if (PRODUCTION) {
  console.log('Production Mode');
}

import TodoComponent from './components/todo/Todo.component';
import EditTodoItemComponent from './components/todo/EditTodoItem.component';

import {router} from "san-router";

// 定义Component
let MyApp = san.defineComponent({
  components: {
    'ui-todo': TodoComponent,
  },

  template: `
  <div class="root">
    <h1 class="title">{{ title }}</h1>
  </div>
  `
});

new MyApp({
  data: {
    title: 'todos'
  }
}).attach(document.body);

router.add({
  rule: '/',
  Component: TodoComponent,
  target: '.root'
});

router.add({
  rule: '/type/:type',
  Component: TodoComponent,
  target: '.root'
});

router.add({
  rule: '/add',
  Component: EditTodoItemComponent,
  target: '.root'
});

router.add({
  rule: '/edit/:id',
  Component: EditTodoItemComponent,
  target: '.root'
});

router.start();

