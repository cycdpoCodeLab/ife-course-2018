// global css
import './theme/main.scss';

// 引入san
import san from 'san';
import {
  transition
} from 'san-transition';

if (DEVELOPMENT) {
  console.log('Development Mode');
}

if (PRODUCTION) {
  console.log('Production Mode');
}

// 类目列表
let myList = [{
  title: '条目1',
  details: '条目1详情',
}, {
  title: '条目2',
  details: '条目2详情',
}, {
  title: '条目3',
  details: '条目3详情',
}, {
  title: '条目4',
  details: '条目4详情',
}];

// 定义Component
let MyApp = san.defineComponent({
  template: `
  <ul class="root">
    <!--条目列表-->
    <li 
      s-for="item, index in list" 
      s-transition="hook('list', 300)" 
      on-click="clickList(item)" 
      data-index="{{ index }}"
    >{{ item.title }}</li>
    
    <!-- 条目详情 -->
    <div 
      class="details" 
      s-if="isDetailsShow" 
      s-transition="hook('details')"
      on-click="clickDetails" 
    >{{ details }}</div>
  </ul>
  `,

  initData() {
    return {
      list: [...myList],
      isDetailsShow: false,
      details: '',
    };
  },

  /**
   * 点击条目
   * @param item
   */
  clickList: function (item) {
    // 移除list中对象
    if (this.data.get('list').length !== 0) {
      this.data.splice('list', [0, this.data.get('list').length]);
    }

    // 第四个条目消失动画开始时间 300ms * 3 = 900ms
    // 过渡动画时间 500ms
    // 总共1400ms
    setTimeout(() => {
      this.data.set('details', item.details);
      this.data.set('isDetailsShow', true);
    }, 1.4e3);
  },

  /**
   * 点击详情，重新显示条目
   */
  clickDetails: function () {
    this.data.set('isDetailsShow', false);

    // 详情消失过渡动画时间 500ms
    // list回到初始值
    setTimeout(() => this.data.splice('list', [0, myList.length, ...myList]), 5e2);
  },

  hook: transition
});

new MyApp().attach(document.body);

