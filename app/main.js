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

import Form from './components/form/Form.component';
import FormItem from './components/form-item/FormItem.component';
import Input from './components/input/Input.component';
import Button from './components/button/Button.component';
import DatePicker from './components/date-picker/DatePicker.component'

// 定义Component
let MyApp = san.defineComponent({
  components: {
    'ui-button': Button,
    'ui-form': Form,
    'ui-form-item': FormItem,
    'ui-input': Input,
    'date-picker': DatePicker,
  },

  template: `
  <div class="root">
    <ui-form
      formModel="{= formModel =}"
      labelPosition="left"
      labelWidth="110px"
      s-ref="formModel">
      
      <ui-form-item
        rules="{{ ruleMobile }}"
        prop="mobile"
        helpText="请输入手机号码"
        label="手机号码">
        <ui-input
          value="{= formModel.mobile =}"
        ></ui-input>
      </ui-form-item>
      
      <ui-form-item
        rules="{{ ruleAddress }}"
        prop="address"
        helpText="请输入地址"
        label="地址">
        <ui-input
          value="{= formModel.address =}"
        ></ui-input>
      </ui-form-item>
      
      <ui-form-item
        prop="userName"
        require="{{ true }}"
        helpText="输入姓名与身份证保持一致"
        label="姓名">
        <ui-input
          value="{= formModel.userName =}"
        ></ui-input>
      </ui-form-item>
            
      <ui-form-item
        rules="{{ ruleIdCard }}"
        prop="idCard"
        helpText="根据国家相关规定，需要您输入身份证号码"
        label="身份证号码">
        <ui-input
          value="{= formModel.idCard =}"
        ></ui-input>
      </ui-form-item>
            
      <ui-form-item
        prop="birthday"
        label="生日">
        <date-picker
          type="date"
          value="{= formModel.birthday =}"
        ></date-picker>
      </ui-form-item>
      
      <ui-form-item
        prop="leaveRange"
        label="请假时间">
        <date-picker
          type="date-range"
          valueRange="{= formModel.leaveRange =}"
        ></date-picker>
      </ui-form-item>
      
      <ui-form-item>
        <ui-button on-click="submitForm('formModel')">提交</ui-button>
        <ui-button on-click="resetForm('formModel')">重置</ui-button>
      </ui-form-item>
    </ui-form>
    
    <hr/>
    <p>{{ formStatus }}</p>
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
        address: '',
        birthday: '',
        leaveRange: []
      },
      formStatus: '',
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
          required: true,
          message: '必选',
          type: 'string'
        },
        {
          validator: idCardValidate
        }
      ]
    };
  },

  submitForm(formName) {
    this.data.set('formStatus', 'validating');

    this.ref(formName).validate(valid => {
      if (valid) {
        this.data.set('formStatus', 'validateEnd: success');
      } else {
        this.data.set('formStatus', 'validateEnd: fail');
      }
      console.log(this.data.get(formName));
    });
  },

  resetForm(formName) {
    this.data.set('formStatus', '');
    this.ref(formName).resetFields();
  },
});

new MyApp().attach(document.body);

