import san from 'san';

import './todo.scss';

import myStorage from './localstorage.funcs';

import NewTodo from './NewTodo.component';
import TodoFooter from './TodoFooter.component';
import TodoListItem from './TodoListItem.component';

export default san.defineComponent({
  components: {
    'new-todo': NewTodo,
    'todo-footer': TodoFooter,
    'todo-list-item': TodoListItem,
  },

  template: `
  <section class="todoapp">
    <new-todo value="{= newTodo =}" />
    
    <section 
      class="main"
      style="{{ isEmpty ? 'display: none;' : ''}}">
      <ul class="todo-list">
        <todo-list-item 
        s-for="item in todoList" 
        item="{= item =}"/>
      </ul>
    </section>
    
    <todo-footer 
      style="{{ isEmpty ? 'display: none;' : ''}}"
      todoList="{{ todoList }}"
    />
  </section>
  `,

  initData() {
    return {
      newTodo: '',
      todoList: [],
      lastOrder: 0,
      isEmpty: true,
    };
  },

  inited() {
    let
      _todoList = myStorage.initStorage()
      , _todoListLength = _todoList.length
    ;

    if (!_todoListLength) {
      return;
    }

    this.data.set('todoList', _todoList);
    this.data.set('lastOrder', _todoList[_todoListLength - 1].order);
    this.data.set('isEmpty', false);
  },

  messages: {
    'new-todo-item'() {
      let
        _lastOrder = this.data.get('lastOrder') + 1
        , _item = {
          title: this.data.get('newTodo'),
          order: _lastOrder,
          completed: false,
          id: 'todo-' + _lastOrder
        }
      ;

      this.data.push('todoList', _item);
      myStorage.addStorage(_item);

      this.data.set('lastOrder', _lastOrder);
      this.data.set('newTodo', '');
      this._checkEmpty();
    },

    'update-todo-item'(arg) {
      // data双向绑定，只需要更新storage
      myStorage.updateStorage(arg.value);
    },

    'remove-todo-item'(arg) {
      let
        _itemId = arg.value.id
        , _todoList = this.data.get('todoList')
        , _item = _todoList.filter(item => item.id === _itemId)[0]
      ;

      this.data.remove('todoList', _item);
      myStorage.removeStorage(_itemId);

      this._checkEmpty();
    },
  },

  _checkEmpty() {
    let _isEmpty = !this.data.get('todoList').length;
    this.data.set('isEmpty', _isEmpty);

    if (_isEmpty) {
      this.data.set('lastOrder', 0);
    }
  },

});

