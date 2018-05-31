// global css
import './theme/main.scss';

// 引入san
import san from 'san';

// 引入array-findIndex polyfill
import 'array-findIndex.polyfill';

if (DEVELOPMENT) {
  console.log('Development Mode');
}

if (PRODUCTION) {
  console.log('Production Mode');
}


// 定义Component
let MyApp = san.defineComponent({
  template: `
    <div class="root">
      <!-- 添加按钮 -->
      <button class="add-btn" on-click="add">{{ addBtnTitle }}</button>
      
      <!-- 表格 -->
      <table class="table">
        <tr>
          <th>{{ tableColumnTitleName }}</th>
          <th>{{ tableColumnTitleState }}</th>
          <th>{{ tableColumnTitleAction }}</th>
        </tr>
        
        <!-- 循环体 -->
        <tr s-for="personState in stateList">
          <td>{{ personState.name }}</td>
          
          <template s-if="personState.state === 0">
            <td>{{ stateUnreviewed }}</td>
            <td>
              <button on-click="review(personState)">{{ actionReview }}</button>
            </td>
          </template>
          
          <template s-else-if="personState.state === 1">
            <td>{{ statePass }}</td>
            <td>
              <button on-click="delete(personState)">{{ actionDelete }}</button>
            </td>
          </template>
          
          <template s-else-if="personState.state === -1">
            <td>{{ stateFail }}</td>
            <td>
              <button on-click="delete(personState)">{{ actionDelete }}</button>
            </td>
          </template>
          
          <template s-else>
            <td></td>
            <td></td>
          </template>
        </tr>
      
      </table>
    </div>
  `,

  initData: function () {
    return {
      // id 防止重名设定的唯一性标志
      // state 0为未审核 1为合格 -1为不合格
      stateList: [{
        id: 1,
        name: '张三',
        state: 1,
      }, {
        id: 2,
        name: '李四',
        state: -1,
      }, {
        id: 3,
        name: '王五',
        state: 0,
      }, {
        id: 4,
        name: '赵六',
        state: 0,
      }, {
        id: 5,
        name: '孙七',
        state: 0,
      }],

      nextId: 6,  // 添加记录后自增值
    };
  },

  /**
   * 添加一条记录
   */
  add: function () {
    console.log(this);

    let
      _nextId = this.data.get('nextId')
      , _nameStr = prompt('请输入姓名', '')
    ;

    // 姓名验证
    let regName = /^[\u4e00-\u9fa5]{2,4}$/;
    if (!regName.test(_nameStr)) {
      alert('请输入正确的姓名(2~4位中文字符)');
      return;
    }

    this.data.push('stateList', {
      id: _nextId++,
      name: _nameStr,
      state: 0,
    });
    this.data.set('nextId', _nextId);
  },

  /**
   * 删除一条记录
   * @param stateObj
   */
  delete: function (stateObj) {
    console.log(stateObj);
    let _index = this.getIndex(stateObj);
    this.data.removeAt('stateList', _index);
  },

  /**
   * 审核
   * @param stateObj
   */
  review: function (stateObj) {
    let
      _index = this.getIndex(stateObj)
      , _newState = 1
    ;

    this.data.set('stateList[' + _index + '].state', _newState);
  },

  getIndex: function (stateObj) {
    return this.data
      .get('stateList')
      .findIndex(state => state.id === stateObj.id);
  }
});

let myApp = new MyApp({
  data: {
    addBtnTitle: '添加',
    tableColumnTitleName: '姓名',
    tableColumnTitleState: '审核状态',
    tableColumnTitleAction: '操作',

    stateUnreviewed: '未审核',
    statePass: '合格',
    stateFail: '不合格',

    actionReview: '审核',
    actionDelete: '删除',
  }
});

myApp.attach(document.body);

