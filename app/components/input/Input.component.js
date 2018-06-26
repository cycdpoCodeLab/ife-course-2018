import san from 'san';
import './input.scss';

export default san.defineComponent({
  template: `
  <div 
    class="input-wrapper {{ isError ? 'error' : ''}}"
  >
    <input 
      type="text"
      autocomplete="off"
      placeholder="{{ helpText }}"
      value="{= value =}"
      on-blur="handleBlur"
    />
    
    <div
      class="error-text"
    >{{ errorText }}</div>
  </div>
  `,

  initData() {
    return {
      value: '',
      helpText: '',
      isError: false,
      errorText: ''
    };
  },

  inited() {
    this.dispatch('input-inited');
  },

  handleBlur() {
    this.dispatch('input-validate');
  },

  error(errors) {
    if (errors) {
      this.data.set('errorText', errors[0].message);
      this.data.set('isError', true);
    } else {
      this.data.set('errorText', '');
      this.data.set('isError', false);
    }
  },

  /**
   * reset 重置
   */
  reset() {
    this.data.set('isError', false);
    this.data.set('errorText', '');
    this.data.set('value', '');
  }
});