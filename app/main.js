// global css
import './theme/main.scss';

// 引入san
import san, {
  DataTypes
} from 'san';

if (DEVELOPMENT) {
  console.log('Development Mode');
}

if (PRODUCTION) {
  console.log('Production Mode');
}

// 定义Component
let MyApp = san.defineComponent({
  template: `
    <section class="root">
      <!-- 输入框 -->
      <div class="input-wrapper">
        <input type="text" name="{{ nameTitle }}" placeholder="{{ nameTitle }}" maxlength="6" value="{= person.name =}">
        <input type="number" name="{{ ageTitle }}" placeholder="{{ ageTitle }}" maxlength="3" value="{= stringAge =}" min="1" max="200" step="1" on-input="setAge">
        <input type="text" name="{{ desTitle }}" placeholder="{{ desTitle }}" maxlength="12" value="{= person.des =}">
      </div>
      
      <!-- 移除信息按钮 -->
      <button class="remove-info-btn" on-click="removeInfo">{{ removeInfoTitle }}</button>
      
      <!-- 信息显示区 -->
      <div class="info-wrapper">
        <p>
          <span>姓名: </span>
          <span>{{ person.name }}</span>
        </p>
        <p>
          <span>年龄: </span>
          <span>{{ person.age }}</span>
        </p>
        <p>
          <span>简介: </span>
          <span>{{ person.des }}</span>
        </p>
      </div>
    </section>
  `,

  initData: function () {
    return {
      person: {
        name: '',
        age: undefined,
        des: ''
      },
      stringAge: '',   // 多设一个中间变量，储存年龄的字符串形式
    };
  },

  dataTypes: {
    person: DataTypes.shape({
      name: DataTypes.string,
      age: DataTypes.number,
      des: DataTypes.string
    }),
    stringAge: DataTypes.string,
  },

  /**
   * setAge 单独设置年龄
   */
  setAge: function () {
    let
      _ageValue = this.data.get('stringAge')
      , _realAge = undefined
    ;
    console.log(_ageValue);
    console.log(isNaN(_ageValue));

    // input value 为空 或 为NaN
    if (_ageValue === '' || isNaN(_ageValue)) {
      console.log('空');
      this.data.set('person.age', _realAge);
      this.data.set('stringAge', '');
      return;
    }

    // 模拟maxlength="3"
    if (_ageValue.length > 3) {
      console.log('length > 3');
      _ageValue = _ageValue.slice(0, 3);
    }

    _realAge = Number(_ageValue);

    this.data.set('person.age', _realAge);
    this.data.set('stringAge', '' + _realAge);
  },

  /**
   * removeInfo 清空信息
   */
  removeInfo: function () {
    this.data.set('person.name', '');
    this.data.set('stringAge', '');
    this.data.set('person.age', undefined);
    this.data.set('person.des', '');
  }
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

