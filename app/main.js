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

import TaskMenuComponent from './task-menu/TaskMenu.component';
import TaskCardComponent from './task-card/TaskCard.component';

// 定义Component
let MyApp = san.defineComponent({
  components: {
    'task-menu': TaskMenuComponent,
    'task-card': TaskCardComponent,
  },
  template: `
    <div class="root">
      <!-- 标题 -->
      <task-menu title="{{ title }}"></task-menu>
      
      <!-- 任务卡片 -->
      <task-card tasks="{{ tasks }}" headerColor="{{ headerColor }}" s-ref="tasks"></task-card>
    </div>
  `
});

let myApp = new MyApp({
  data: {
    title: '任务栏',

    tasks: [{
      header: 'task1',
      title: 'slot',
      content: 'xxxxxx',
      time: '2018-01-01',
    }, {
      header: 'task2',
      title: 'slot',
      content: 'xxxxxx',
      time: '2018-01-01',
    }, {
      header: 'task3',
      title: 'slot',
      content: 'xxxxxx',
      time: '2018-01-01',
    }, {
      header: 'task4',
      title: 'slot',
      content: 'xxxxxx',
      time: '2018-01-01',
    }, {
      header: 'task5',
      title: 'slot',
      content: 'xxxxxx',
      time: '2018-01-01',
    }, {
      header: 'task6',
      title: 'slot',
      content: 'xxxxxx',
      time: '2018-01-01',
    }],

    headerColor: {
      task1: 'black',
      task2: 'blue',
      task3: 'green',
      task4: 'darkred',
      task5: 'purple',
      task6: 'red',
    }
  }
});

myApp.attach(document.body);

