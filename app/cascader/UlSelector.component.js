import san from 'san';

export default san.defineComponent({
  components: {
    'ui-self': 'self'
  },

  template: `
  <div class="selector-wrapper">
    <ul class="selector">
      <li
      class="{{ option.children ? 'has-children' : ''}} {{ option.value === value ? 'active' : '' }}"
      s-for="option in options"
      on-click="handleClick(option)"
      >{{ option.label }}</li>
    </ul>
    
    <ui-self 
      s-if="hasChildren" 
      options="{{ childrenOptions }}" 
      selectedOptions="{{ childrenSelectedOptions }}"
      value="{{ childrenSelectedOptions[0] }}"
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

  attached() {
    if (this.data.get('selectedOptions').length > 1) {
      this.data.set('childrenSelectedOptions', this.data.get('selectedOptions').slice(1));
      this.data.set('childrenOptions', this.data
        .get('options')
        .filter(obj => obj.value === this.data.get('value'))[0]
        .children
      );

      this.data.set('hasChildren', true);
    }

  },

  handleClick(option) {
    this.data.set('value', option.value);

    // 先移除原先子组件，确保子组件为最新内容
    this.data.set('hasChildren', false);
    this.data.set('childrenOptions', []);
    this.data.set('childrenSelectedOptions', []);

    setTimeout(() => {
      if (option.children) {
        this.data.set('childrenOptions', option.children);
        this.data.set('hasChildren', true);
        return;
      }

      this.data.set('value', option.value);
      this.data.set('selectedOptions', [option.value]);

      // 向上层派发消息
      this.dispatch('UI:final_selected', this.data.get('selectedOptions'));
    }, 0);
  },

  messages: {
    'UI:final_selected': function (arg) {
      let _selectedOptions = arg.value;

      // 继续上抛
      this.dispatch('UI:final_selected', [this.data.get('value'), ..._selectedOptions]);
    }
  },
});