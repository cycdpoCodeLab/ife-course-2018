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

import Form from './components/Form.component';
import FormItem from './components/FormItem.component';
import Input from './components/Input.component';
import Button from './components/Button.component';

// 定义Component
let MyApp = san.defineComponent({
  components: {
    'ui-button': Button,
    'ui-form': Form,
    'ui-form-item': FormItem,
    'ui-input': Input
  },

  template: `
  <div class="root">
    <ui-form
      formModel="{= formModel =}"
      s-ref="formModel">
      
      <ui-form-item
        rules="{{ ruleMobile }}"
        prop="mobile"
        helpText="请输入手机号码"
        label="手机号码">
        <ui-input value="{= formModel.mobile =}"></ui-input>
      </ui-form-item>
      
      <ui-form-item
        rules="{{ ruleAddress }}"
        prop="address"
        helpText="请输入地址"
        label="地址">
        <ui-input value="{= formModel.address =}"></ui-input>
      </ui-form-item>
      
      <ui-form-item
        prop="userName"
        require="{{ true }}"
        helpText="输入姓名与身份证保持一致"
        label="姓名">
        <ui-input value="{= formModel.userName =}"></ui-input>
      </ui-form-item>
            
      <ui-form-item
        rules="{{ ruleIdCard }}"
        prop="idCard"
        helpText="根据国家相关规定，需要您输入身份证号码"
        label="身份证号码">
        <ui-input value="{= formModel.idCard =}"></ui-input>
      </ui-form-item>
      
      <ui-form-item>
        <ui-button on-click="submitForm('formModel')">提交</ui-button>
        <ui-button on-click="resetForm('formModel')">重置</ui-button>
      </ui-form-item>
    
    </ui-form>
  </div>
  `,

  initData() {
    const idCardValidate = (rule, value, callback) => {
      if (value) {
        // 异步、远程验证
        let userName = this.data.get('formModel.userName');
        console.log({
          userName,
          idCard: value
        });

        // 将用户名和身份证号码作为参数发送异步请求，到服务端验证
        setTimeout(() => {
          if (Math.random() > 0.5) {
            callback([new Error('您输入的身份信息不匹配')]);
          } else {
            callback([]);
          }
        }, 1000);
      }
      else {
        setTimeout(() => callback(['请输入身份证号码']), 1000);
      }
    };

    return {
      formModel: {
        mobile: '',
        userName: '',
        idCard: '',
        address: ''
      },
      ruleMobile: [
        {
          type: 'string',
          required: true,
          message: '请输入手机号码'
        },
        {
          validator(rule, value, callback) {
            if (value) {
              if (!/^[1][34578][0-9]{9}$/.test(value)) {
                callback([new Error('请输入正确的手机号码!')]);
              }
              else {
                callback([]);
              }
            }
            else {
              callback([new Error('请输入手机号码!')]);
            }
          }
        }
      ],
      ruleAddress: [
        {
          required: true,
          message: '必选',
          type: 'string'
        },
        {
          min: 6,
          message: '用户名需不少于6个字符'
        },
        {
          max: 20,
          message: '用户名需不超过20个字符'
        }
      ],
      ruleIdCard: [
        {
          type: 'string',
          require: true
        },
        {
          validator: idCardValidate
        }
      ]
    };
  },

  submitForm(formName) {
    let _formModel = this.data.get(formName);

    // todo
    console.log(_formModel);

    // this.data.set('formStatus', 'validating');

    // this.ref(formName).validate(valid => {
    //   this.data.set('formStatus', 'validateEnd');
    //   if (valid) {
    //     // 验证成功 do someThing
    //     alert('验证成功');
    //   } else {
    //     // 验证失败 do someThing
    //     console.log('验证失败');
    //   }
    // });
  },

  resetForm(formName) {
    this.data.set('formStatus', '');
    this.ref(formName).resetFields();
  },
});

new MyApp().attach(document.body);

