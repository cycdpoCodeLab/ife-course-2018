import san from 'san';

export default san.defineComponent({
  template: `
    <div class="child">
      <label>{{ childLabel }}</label>
      <input type="text" value="{= value =}"/>
      <button on-click="submit">{{ buttonText }}</button>
    </div>
  `,

  initData() {
    return {
      value: '',
      childLabel: '子组件：',
      buttonText: '通知父组件',
    };
  },

  /**
   * 生命周期：初始化完成
   * 保证初始值正确
   */
  inited(){
    this.data.set('value', '');
  },

  submit() {
    // 向组件树的上层派发消息
    this.dispatch('sendMessageToParent', this.data.get('value'));
  }
});

