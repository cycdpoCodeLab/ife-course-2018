import san from 'san';

export default san.defineComponent({
  components: {},

  template: `
  <header class="header">
    <input 
      class="new-todo" 
      placeholder="What needs to be done?"
      autofocus 
      value="{= value =}"
      on-keydown="handleNewTodoKeydown($event)"/>
  </header>
  `,

  initData() {
    return {
      value: ''
    };
  },

  inited() {
  },

  handleNewTodoKeydown(e) {
    if (e.keyCode !== 13) {
      return;
    }

    let _value = this.data.get('value');

    if (!_value) {
      return;
    }

    console.log('增加一条记录: ', _value);
    this.dispatch('new-todo-item');
  },
});

