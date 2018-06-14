// global css
import './theme/main.scss';

// 引入san
import san from 'san';
import DatePickerComponent from './datePicker/DatePicker.component'

if (DEVELOPMENT) {
  console.log('Development Mode');
}

if (PRODUCTION) {
  console.log('Production Mode');
}

// 定义Component
let MyApp = san.defineComponent({
  components: {
    'data-picker': DatePickerComponent
  },
  template: `
  <div class="root">
    <p>{{ explain }}</p>
    <h2>{{ title }}</h2>
    <data-picker
      value="{{ date }}"
      disabledPattern="{{ disabledPattern }}"
    ></data-picker>
  </div>
  `,

  initData() {
    return {
      date: '',                          // 选择的日期，形式为'YYYY-MM-DD'
      disabledPattern: /-01|-13|-25$/    // 禁止日期的正则，当前禁用每月1号13号25号
    };
  },
});

let myApp = new MyApp({
  data: {
    title: '日历组件',
    explain: '此处留白'
  }
});

myApp.attach(document.body);

