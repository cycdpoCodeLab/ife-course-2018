import san from 'san';

// 引入子组件
import ChildComponent from './Child.component';

export default san.defineComponent({
  components: {
    'child': ChildComponent
  },
  template: `
    <template>
      <child value="{{ value }}"></child>
      <div class="parent{{ isChanged ? ' changed' : '' }}">
        <span>{{ parentLabel }}</span>
        <input type="text" value="{= value =}" on-input="input">
      </div>
    </template>
  `,

  initData() {
    return {
      parentLabel: '我是父组件：',
      value: '静静的等待用户输入',
      isChanged: false,
    };
  },

  // 声明组件要处理的消息
  messages: {
    'sendMessageToParent': function (arg) {
      let value = arg.value;
      this.data.set('value', value);
      this.data.set('isChanged', true);

      // 继续向组件树的上层派发消息
      this.dispatch('sendMessageToHigherParent', this.data.get('value'));
    }
  },

  /**
   * 生命周期：初始化完成
   * 保证初始值正确
   */
  inited() {
    this.data.set('value', '静静的等待用户输入');
  },

  /**
   * 输入时同时向组件树的上层派发消息
   */
  input() {
    this.dispatch('sendMessageToHigherParent', this.data.get('value'));
  },
});

