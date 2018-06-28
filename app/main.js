// global css
import './theme/main.scss';

// 引入san
import san from 'san';

if (DEVELOPMENT) {
  console.log('Development Mode');
}

if (PRODUCTION) {
  console.log('Production Mode');
}

import TodoComponent from './components/todo/Todo.component';

// 定义Component
let MyApp = san.defineComponent({
  components: {
    'ui-todo': TodoComponent,
  },

  template: `
  <div class="root">
    <h1 class="title">{{ title }}</h1>
    <ui-todo></ui-todo>
  </div>
  `
});

let myApp = new MyApp({
  data: {
    title: 'todos'
  }
});

myApp.attach(document.body);

