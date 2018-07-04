import {connect} from 'san-store'

import './todoListItem.scss';


export default connect.san(
  {},
  {
    removeTodoItem: 'removeTodoItem',
    updateTodoItem: 'updateTodoItem',
  }
)({
  components: {},

  template: `
  <li class="list-item{{ item.completed ? ' completed' : ''}}{{ isEditing ? ' editing' : '' }}">
    <input class="list-item__edit"
    value="{= item.title =}"
    on-keydown="handleEditKeydown($event)"
    on-blur="changeEdit"/>
    
    <div
      class="list-item__mask"
      on-dblclick="doubleClickMask($event)"
    ></div>
   
    <button 
      class="list-item__del"
      on-click="remove"
    ></button>
    
    <span 
      class="list-item__check"
      on-click="setCompleted"></span>
  </li>
  `,

  initData() {
    return {
      item: {
        title: '',
        order: 0,
        completed: false,
        id: ''
      },
      isEditing: false,
    };
  },

  inited() {
  },

  /**
   * doubleClickMask
   * @param e
   */
  doubleClickMask(e) {
    this.data.set('isEditing', true);

    let _editInput = e.target.previousElementSibling;

    if (_editInput.nodeName.toLowerCase() === 'input') {
      _editInput.focus();
    }
  },

  setCompleted() {
    this.data.set('item.completed', !this.data.get('item.completed'));
    this.update();
  },

  handleEditKeydown(e) {
    if (e.keyCode !== 13) {
      return;
    }

    e.target.blur();   // 按回车失焦
  },

  changeEdit() {
    let _title = this.data.get('item.title');

    if (!_title) {
      console.log('删除本条记录');
      this.remove();
      return;
    }

    console.log('更新一条记录: ', _title);
    this.update();
    this.data.set('isEditing', false);
  },

  remove() {
    this.actions.removeTodoItem(this.data.get('item'));
  },

  update() {
    this.actions.updateTodoItem(this.data.get('item'));
  }
});

