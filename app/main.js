// global css
import './theme/main.scss';

// 引入san
import san from 'san';
import CsacaderComponent from './cascader/Csacader.component'

if (DEVELOPMENT) {
  console.log('Development Mode');
}

if (PRODUCTION) {
  console.log('Production Mode');
}

// 定义Component
let MyApp = san.defineComponent({
  components: {
    'el-csacader': CsacaderComponent
  },
  template: `
  <div class="root">
    <el-csacader
      options="{{ options }}"
      selectedOptions="{= selectedOptions =}"
    ></el-csacader>
  </div>
  `,

  initData() {
    return {
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],

      selectedOptions: [],
    };
  },

  handleChange(value) {
    console.log(value);
  }
});

let myApp = new MyApp({
  data: {}
});

myApp.attach(document.body);

