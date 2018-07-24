import san from 'san';
import './list.scss';

export default san.defineComponent({
  template: `
    <ul class="list-wrapper">
      <slot name="item" s-for="item in dataArray" var-title="item.title" />
      <slot name="loading" s-if="listState.updating" />
    </ul>
  `,

  attached() {
    window.addEventListener('scroll', () => {
      if(this.data.get('listState.updating')){
        return;
      }

      let element = document.documentElement;
      if (element.scrollHeight - element.scrollTop < element.clientHeight + 100) {
        // 向组件树的上层派发消息
        this.dispatch('scrolled');
      }
    });
  },
});