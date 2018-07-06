import san from 'san';
import './editTodoItem.scss';

import {connect, store} from 'san-store'
import DatePickerComponent from '../datePicker/DatePicker.component'


export default connect.san(
  {},
  {
    updateTodo: 'updateTodoItem',
    addTodo: 'addNewTodo',
  }
)(san.defineComponent({
  components: {
    'data-picker': DatePickerComponent
  },

  template: `
  <section class="edit-todo-wrapper">
    <div class="edit-item-wrapper">
      <label>Title:</label>
      <input 
        class="edit-title" 
        placeholder="What needs to be done?"
        value="{= item.title =}"
        on-blur="titleValidator"
      />
      <span s-if="titleError" class="error">{{ titleError }}</span>
    </div>
    
    <div class="edit-item-wrapper">
      <label>End time:</label>
      <data-picker
        type="date"
        value="{= item.endTime =}"/>
    </div>
    
    <div class="edit-buttons-wrapper">
      <button 
        class="edit-done"
        on-click="finish">Done</button>
      <button 
        class="edit-cancel"
        on-click="cancel">Cancel</button>
    </div>
    
  </section>
  `,

  initData() {
    return {
      item: {
        title: '',
        endTime: '',
      },
      isNew: false,
      titleError: '',
    };
  },

  inited() {
  },

  route() {
    let _itemId = this.data.get('route').query.id;

    if (!_itemId) {
      this.data.set('isNew', true);
      return;
    }

    this.data.set(
      'item',
      store.getState('todoList').filter(listItem => listItem.id === _itemId)[0]
    );
  },

  finish() {
    if (!this.titleValidator()) {
      return;
    }

    if (this.data.get('isNew')) {
      this.actions.addTodo(this.data.get('item'));
    } else {
      this.actions.updateTodo(this.data.get('item'));
    }

    this.cancel();
  },

  cancel() {
    history.go(-1);
  },

  titleValidator() {
    if (this.data.get('item.title')) {
      this.data.set('titleError', '');
      return true;
    }

    this.data.set('titleError', 'Title is required.');
    return false;
  },
}));

