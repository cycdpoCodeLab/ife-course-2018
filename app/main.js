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

// 定义Component
let MyApp = san.defineComponent({
  template: `
    <section id="root">
      <!-- 输入框 -->
      <div class="input-wrapper">
        <input type="text" class="input" name="{{ nameTitle }}" placeholder="{{ nameTitle }}" value="{= name =}">
        <input type="text" class="input" name="{{ ageTitle }}" placeholder="{{ ageTitle }}" value="{= age =}">
        <input type="text" class="input" name="{{ desTitle }}" placeholder="{{ desTitle }}" value="{= des =}">
      </div>
      
      <!-- 移除信息按钮 -->
      <button class="remove-info-btn" on-click="removeInfo">{{ removeInfoTitle }}</button>
      
      <!-- 信息显示区 -->
      <div class="info-wrapper">
        <p>姓名: {{ name }}</p>
        <p>年龄: {{ age }}</p>
        <p>简介: {{ des }}</p>
      </div>
    </section>
  `,

  removeInfo: function() {
    console.log(this);
    this.data.set('name', '');
    this.data.set('age', '');
    this.data.set('des', '');
  }

  // initData: function () {
  //   return {
  //     name: '',
  //     age: '',
  //     des: '',
  //   };
  // },
});

let myApp = new MyApp({
  data: {
    nameTitle: '姓名',
    ageTitle: '年龄',
    desTitle: '简介',
    removeInfoTitle: '移除信息',
  }
});

myApp.attach(document.body);

