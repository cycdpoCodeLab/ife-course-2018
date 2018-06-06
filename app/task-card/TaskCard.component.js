import san from 'san';

import './taskCard.scss';

export default san.defineComponent({
  template: `
  <template class="task-card-wrapper">
    <slot s-for="item in tasks" name="{{item.header}}" var-header="item.header" var-title="item.title" var-content="item.content" var-time="item.time">
      <div class="task-card">
        <h3 style="{{ headerColor[item.header] ? 'color: ' + headerColor[item.header] +';' : '' }}">{{ header }}</h3>
        
        <section class="content">
          <p>标题: {{ title }}</p>
          <p>内容: {{ content }}</p>
          <p>时间: {{ time }}</p>
        </section>
      </div>
    </slot>
  </template>
  `,
});

