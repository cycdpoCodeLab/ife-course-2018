import {store} from 'san-store';
import {
  updateBuilder,
  merge,
} from 'san-update';

import myStorage from './localstorage.funcs';

store.addAction('handleTodoList', ({
                                     action = 'set',
                                     value
                                   }) => updateBuilder()[action]('todoList', value));
store.addAction('updateLastOrder', lastOrder => updateBuilder().set('lastOrder', lastOrder));

store.addAction('initTodoApp', () => {
  let
    _todoList = myStorage.initStorage()
    , _todoListLength = _todoList.length
  ;

  if (!_todoListLength) {
    return Promise.all([
      store.dispatch('handleTodoList', {
        value: []
      }),
      store.dispatch('updateLastOrder', 0),
    ]);
  }

  return Promise.all([
    store.dispatch('handleTodoList', {
      value: _todoList
    }),
    store.dispatch('updateLastOrder', _todoList[_todoListLength - 1].order),
  ]);
});

store.addAction('addNewTodo', item => {
  let
    _lastOrder = store.getState('lastOrder') + 1
    , _item = {
      title: '',
      endTime: '',
      order: _lastOrder,
      completed: false,
      id: 'todo-' + _lastOrder
    };

  for (let key in item) {
    if (item.hasOwnProperty(key)) {
      _item[key] = item[key];
    }
  }

  return Promise.all([
    myStorage.addStorage(_item),
    store.dispatch('handleTodoList', {
      action: 'push',
      value: _item
    }),
    store.dispatch('updateLastOrder', _lastOrder),
  ]);
});

store.addAction('removeTodoItem', item => {
  let
    _itemId = item.id
    , _item = store.getState('todoList')
      .filter(listItem => listItem.id === _itemId)[0]
  ;

  return Promise.all([
    myStorage.removeStorage(_itemId),
    store.dispatch('handleTodoList', {
      action: 'remove',
      value: _item
    }),
  ])
    .then(() => {
      // 没有数据时重置lastOrder
      if (!store.getState('todoList').length) {
        return store.dispatch('updateLastOrder', 0);
      }
    });
});

store.addAction('updateTodoItem', item => {
  let
    _index = store.getState('todoList')
      .map(listItem => listItem.id)
      .indexOf(item.id)
  ;

  return Promise.all([
    myStorage.updateStorage(item),
    store.dispatch('handleTodoList', {
      action: 'splice',
      value: [_index, 1, item]
    }),
  ]);
});

store.addAction('clearCompletedTodo', () => {
  let
    _newTodoList = []
    , _deletedTodoList = []
  ;

  store.getState('todoList').forEach(item => {
    if (item.completed) {
      _deletedTodoList.push(item);
      myStorage.removeStorage(item.id);  // 同时更新到storage
    } else {
      _newTodoList.push(item);
    }
  });

  return store.dispatch('handleTodoList', {
    value: _newTodoList
  });
});

