import san from 'san';

import './sanInput.scss';

export default san.defineComponent({
  template: `
  <template class="san-input{{promptText ? ' needPrompt' : ''}}{{errorText ? ' needError' : ''}}">
    <input 
      type="{{ type }}"
      value="{= value =}"
      placeholder="{{ placeholder }}"
      disabled="{{ disabled }}"
      readonly="{{ readonly }}"
      on-input="handleInput($event)"
      on-focus="handleFocus($event)"
      on-blur="handleBlur($event)"
    />
      
    <div class="prompt">
      {{ promptText }}
      <span></span>
    </div>
    
    <div class="error">
      {{ errorText }}
    </div>
    
  </template>
  `,

  initData() {
    return {
      type: 'text',
      value: undefined,
      placeholder: undefined,
      disabled: false,
      readonly: false,
      promptText: undefined,   // 提示文字
      errorText: undefined,    // 错误提示文字
    };
  },

  handleInput(e) {
    this.fire('input', e);
  },

  handleFocus(e) {
    this.fire('focus', e);
  },

  handleBlur(e) {
    this.fire('blur', e);
  },
});