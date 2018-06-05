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

// 定义Component
let MyApp = san.defineComponent({
  components: {
    'task-menu': TaskMenuComponent
  },
  template: `
    <div class="root">
      <!-- 标题 -->
      <task-menu title="{{ title }}"></task-menu>
      
      <!-- 任务卡片 -->
      <section class="task-card-wrapper">
      
      </section>
    </div>
  `
});

let myApp = new MyApp({
  data: {
    title: '任务栏'
  }
});

myApp.attach(document.body);

