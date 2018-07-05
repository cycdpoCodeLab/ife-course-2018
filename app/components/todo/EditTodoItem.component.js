import san from 'san';
import './editTodoItem.scss';

import {connect} from 'san-store'
import DatePickerComponent from '../datePicker/DatePicker.component'


export default connect.san(
  {},
  {
    addTodo: 'addNewTodo',
  }
)(san.defineComponent({
  components: {
    'data-picker': DatePickerComponent
  },

  template: `
  <section class="edit-todo-wrapper">
    <label>Title:</label>
    <input 
      class="edit-title" 
      placeholder="What needs to be done?"
      value="{= item.title =}"
    />
    <label>End time:</label>
    <data-picker
      type="date"
      value="{= item.endTime =}"/>
    
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
        order: 0,
        completed: false,
        id: ''
      },
      isNew: false,
    };
  },

  inited() {
  },

  route() {
    let _itemId = this.data.get('route').query.id;

    if(!_itemId) {
      this.data.set('isNew', true);
      return;
    }

    console.log(_itemId)

  },

  finish() {
    this.cancel();
  },

  cancel() {
    history.go(-1);
  },
}));

