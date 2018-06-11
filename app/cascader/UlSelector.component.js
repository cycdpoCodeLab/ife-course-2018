import san from 'san';

export default san.defineComponent({
  components: {
    'ui-self': 'self'
  },

  template: `
  <div class="selector-wrapper">
    <ul class="selector">
      <li
      class="{{ option.children ? 'has-children' : ''}}"
      s-for="option in options"
      on-click="handleClick(option)"
      >{{ option.label }}</li>
    </ul>
    
    <ui-self 
      s-if="hasChildren" 
      options="{{ childrenOptions }}" 
      selectedOptions="{{ childrenSelectedOptions }}"
    ></ui-self>
  </div>
  `,

  initData() {
    return {
      options: [],
      selectedOptions: [],
      value: '',
      hasChildren: false,
      childrenOptions: [],
      childrenSelectedOptions: [],
    };
  },

  handleClick(option) {
    this.data.set('value', option.value);

    // 先移除原先子组件，确保子组件为最新内容
    this.data.set('hasChildren', false);

    setTimeout(() => {
      if (option.children) {
        this.data.set('childrenOptions', option.children);
        this.data.set('hasChildren', true);
        return;
      }

      this.data.push('selectedOptions', option.value);
      // 向上层派发消息
      this.dispatch('UI:final_selected', this.data.get('selectedOptions'));
    }, 0);
  },

  messages: {
    'UI:final_selected': function (arg) {
      let _selectedOptions = arg.value;
      this.data.set('selectedOptions', [this.data.get('value'), ..._selectedOptions]);

      // 继续上抛
      setTimeout(() => this.dispatch('UI:final_selected', this.data.get('selectedOptions')), 0);
    }
  },
});