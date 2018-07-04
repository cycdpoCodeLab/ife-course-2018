import san from 'san';

import './todo.scss';

// service
import myStorage from './localstorage.funcs';
import {
  router
} from 'san-router';

// component
import NewTodo from './NewTodo.component';
import TodoFooter from './TodoFooter.component';
import TodoList from './TodoList.component';

export default san.defineComponent({
  components: {
    'new-todo': NewTodo,
    'todo-footer': TodoFooter,
    'todo-list': TodoList,
  },

  template: `
  <section class="todo-app">
    <new-todo value="{= newTodo =}" />
    
    <todo-list 
      style="{{ isEmpty ? 'display: none;' : ''}}"
      showList="{{ showList }}"
      isAllChecked="{{ isAllChecked }}"/>
    
    <todo-footer 
      style="{{ isEmpty ? 'display: none;' : ''}}"
      todoList="{{ todoList }}"
      type="{{ type }}"
    />
  </section>
  `,

  initData() {
    let
      _data = {
        newTodo: '',
        todoList: [],
        showList: [],
        lastOrder: 0,
        isEmpty: true,
        type: 'all',
        isAllChecked: false,
      }
      , _todoList = myStorage.initStorage()
      , _todoListLength = _todoList.length
    ;

    if (!_todoListLength) {
      return _data;
    }

    _data.todoList = _todoList;
    _data.lastOrder = _todoList[_todoListLength - 1].order;
    _data.isEmpty = false;

    return _data;
  },

  inited() {
    router.add({
      rule: '/:type',
      handler: e => {
        let _type = e.query.type;
        if (_type) {
          this.data.set('type', _type);
        }
      },
    });
    router.start();
  },

  computed: {
    showList() {
      let
        _todoList = this.data.get('todoList')
        , _type = this.data.get('type')
      ;

      console.log('showList computed');

      switch (_type) {
        case 'active':
          return _todoList.filter(item => !item.completed);

        case 'completed':
          return _todoList.filter(item => item.completed);

        default:
          return _todoList;
      }
    },

    isAllChecked() {
      return this.data.get('todoList').filter(item => !item.completed).length === 0
    }
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
      let
        _item = arg.value
        , _index = this.data.get('todoList')
          .map(item => item.id)
          .indexOf(_item.id)
      ;

      this.nextTick(() => {
        this.data.splice('todoList', [_index, 1, _item]);
        myStorage.updateStorage(_item);  // 同时更新到storage
      });

    },

    'toggle-all-todo'() {
      let
        _isAllChecked = this.data.get('isAllChecked')
        , _newTodoList = this.data.get('todoList')
          .map(item => {
            item.completed = !_isAllChecked;

            let _newItem = _shallowClone(item);
            myStorage.updateStorage(_newItem);  // 同时更新到storage
            return _newItem;
          })
      ;

      this.data.set('todoList', _newTodoList);
    },

    'clear-completed-todo'() {
      let
        _todoList = this.data.get('todoList')
        , _newTodoList = []
        , _deletedTodoList = []
      ;

      _todoList.forEach(item => {
        if (item.completed) {
          _deletedTodoList.push(item);
        } else {
          _newTodoList.push(item);
        }
      });

      this.data.set('todoList', _newTodoList);
      _deletedTodoList.forEach(item => myStorage.removeStorage(item.id));  // 同时更新到storage
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

/**
 * 浅拷贝
 * @param obj
 * @private
 */
let _shallowClone = obj => {
  let cloneObj = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = obj[key];
    }
  }

  return cloneObj;
};

