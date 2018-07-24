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

// components
import Mock from './Mock';
import ListWrapperComponent from './components/ListWrapper.component';

// 定义Component
let MyApp = san.defineComponent({
  components: {
    'list-wrapper': ListWrapperComponent,
  },

  template: `
  <div class="root">
    <h1 class="title">{{ hello }}</h1>
    <list-wrapper dataArray="{{ aData }}" listState="{{ listState }}">
      <li slot="item">{{ title }}</li>
      <div slot="loading" class="loading">loading...</div>
    </list-wrapper>
  </div>
  `,

  initData() {
    return {
      aData: [],
      listState: {
        updating: false,
      }
    };
  },

  messages: {
    'scrolled'() {
      console.log('scrolled');
      this.data.set('listState.updating', true);
      this.mock.update()
        .then(data => {
          this.data.set('aData', [...data]);
          this.data.set('listState.updating', false);
        });
    }
  },

  inited() {
    // 模拟数据
    this.mock = new Mock();
    this.mock.init();

    this.data.set('aData', this.mock.data);
  },
});

new MyApp({
  data: {
    hello: 'Infinite Scroller'
  }
}).attach(document.body);

