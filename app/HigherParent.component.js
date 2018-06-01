import san from 'san';

// 引入子组件
import ParentComponent from './Parent.component';

export default san.defineComponent({
  components: {
    'parent': ParentComponent
  },
  template: `
  <template>
    <parent value="{{ value }}"></parent>
    <div class="higherParent{{ isChanged ? ' changed' : '' }}">
      <span>{{ higherParentLabel }}</span>
       <input type="text" value="{= value =}">
    </div>
  </template>
  `,

  initData() {
    return {
      higherParentLabel: '我是更高层父组件：',
      value: '我也静静的等待用户输入',
      isChanged: false,
    };
  },

  messages: {
    'sendMessageToHigherParent': function (arg) {
      let value = arg.value;
      this.data.set('value', value);
      this.data.set('isChanged', true);
    }
  }
});

