import './todo.scss';

// service
import myStorage from './localstorage.funcs';
import {
  router
} from 'san-router';
import {connect} from 'san-store'
import './store';

// component
import NewTodo from './NewTodo.component';
import TodoFooter from './TodoFooter.component';
import TodoList from './TodoList.component';


export default connect.san(
  {
    todoList: 'todoList',
    lastOrder: 'lastOrder',
  },
  {
    initTodoApp: 'initTodoApp',
    handleTodoList: 'handleTodoList',
  }
)({
  components: {
    'new-todo': NewTodo,
    'todo-footer': TodoFooter,
    'todo-list': TodoList,
  },

  template: `
  <section class="todo-app">
    <new-todo />
    
    <todo-list 
      style="{{ isEmpty ? 'display: none;' : ''}}"
      showList="{{ showList }}"
      isAllChecked="{{ isAllChecked }}"/>
    
    <todo-footer 
      style="{{ isEmpty ? 'display: none;' : ''}}"
      type="{{ type }}"
    />
  </section>
  `,

  initData() {
    return {
      todoList: [],
      showList: [],
      lastOrder: 0,
      isEmpty: true,
      type: 'all',
      isAllChecked: false,
    };
  },

  compiled() {
    this.actions.initTodoApp();
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
      return this.data.get('todoList').filter(item => !item.completed).length === 0;
    },

    isEmpty() {
      return !this.data.get('todoList').length;
    },
  },

  messages: {
    'toggle-all-todo'() {
      let
        _isAllChecked = this.data.get('isAllChecked')
        , _newTodoList = this.data.get('todoList')
          .map(item => {
            item.completed = !_isAllChecked;
            myStorage.updateStorage(item);  // 同时更新到storage
            return item;
          })
      ;

      this.actions.handleTodoList({
        value: _newTodoList
      });
    },
  },
});


