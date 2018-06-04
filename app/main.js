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

import SanInputCompoment from './san-input/SanInput.compoment';
import SanCheckboxCompoment from './san-checkbox/SanCheckbox.compoment';

// 定义Component
let MyApp = san.defineComponent({
  components: {
    'san-input': SanInputCompoment,
    'san-checkbox': SanCheckboxCompoment,
  },
  template: `
    <div class="root">
      <h2>输入框</h2>
      <san-input
        placeholder="请输入用户名"
        value="{= nameValue =}"
      />
      
      <san-input
        type="password"
        placeholder="请输入密码"
        value="{= passwordValue =}"
      />
      
      <san-input
        on-blur="handleEmail"
        placeholder="请输入邮箱"
        value="{= emailValue =}"
        promptText="{{ promptEmail }}"
      />
      
      <san-input
        on-blur="handlePhone"
        placeholder="请输入手机号"
        value="{= phoneValue =}"
        errorText="{{ errorPhone }}"
      />
      
      <san-input
        disabled
        placeholder="禁用"
      />
      
      <h2>复选框</h2>
      <san-checkbox>选项1</san-checkbox>
      <san-checkbox checked>选项2</san-checkbox>
      <san-checkbox indeterminate>选项3</san-checkbox>
      <san-checkbox disabled>无效</san-checkbox>
      <san-checkbox checked disabled>必选</san-checkbox>
      <san-checkbox indeterminate disabled>必选部分</san-checkbox>
    </div>
  `,

  initData() {
    return {
      nameValue: undefined,
      passwordValue: undefined,
      emailValue: undefined,
      phoneValue: undefined,
      promptEmail: undefined,
      errorPhone: undefined,
    };
  },

  handleEmail() {
    let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;

    if (reg.test(this.data.get('emailValue'))) {
      this.data.set('promptEmail', undefined);
    } else {
      this.data.set('promptEmail', '请输入正确的电子邮箱');
    }
  },

  handlePhone() {
    let reg = /^((1[3-9][0-9])+\d{8})$/;

    if (reg.test(this.data.get('phoneValue'))) {
      this.data.set('errorPhone', undefined);
    } else {
      this.data.set('errorPhone', '手机号格式错误');
    }
  },
});

new MyApp().attach(document.body);

