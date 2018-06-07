// global css
import './theme/main.scss';

// 引入san-mui扩展面板 ExpansionPanel
import ExpansionPanel from 'san-mui/lib/ExpansionPanel';
import './expansionPanel.css';

// 引入san
import san from 'san';

if (DEVELOPMENT) {
  console.log('Development Mode');
}

if (PRODUCTION) {
  console.log('Production Mode');
}

// 定义Component
let ObservedComponent = san.defineComponent({
  template: `
    <p>
      <slot></slot>
    </p>
  `,

  compiled() {
    console.log('组件视图模板编译完成');
  },
  inited() {
    console.log('组件实例初始化完成');
  },
  created() {
    console.log('组件元素创建完成');
  },
  attached() {
    console.log('组件已被附加到页面中');
  },
  detached() {
    console.log('组件从页面中移除');
  },
  disposed() {
    console.log('组件卸载完成');
  },
});

let MyApp = san.defineComponent({
  components: {
    'x-panel': ExpansionPanel,
    'observed-component': ObservedComponent
  },

  template: `
  <div class="root">
    <button class="my-button" on-click="toggle">toggle</button>
    
    <x-panel s-if="show" title="{{ title }}" description="{{ description }}">
      <observed-component>{{ details }}</observed-component>
      <p>{{ explanation }}</p>
    </x-panel>
  </div>
  `,

  initData() {
    return {
      show: true,
    };
  },

  toggle() {
    this.data.set('show', !this.data.get('show'));
  },


});

let myApp = new MyApp({
  data: {
    title: 'Hello!',
    description: 'des',
    details: 'Congratulations, you have discovered a new world.',
    explanation: '扩展面板里的详情内容区域在该组件生成时被初始化。显示隐藏详情时只是变更样式，不对内部子组件进行添加或删除，即显示隐藏详情时，无法触发内部子组件的生命周期。'
  }
});

myApp.attach(document.body);

