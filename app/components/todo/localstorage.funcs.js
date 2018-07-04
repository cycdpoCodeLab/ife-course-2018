/**
 * @param key 内存标识
 * @return {any}
 */
let _getStorage = (key = 'todoKeys') => JSON.parse(localStorage.getItem(key));

/**
 * @param obj
 * @param key 内存标识
 */
let _setStorage = (obj, key = 'todoKeys') => localStorage.setItem(key, JSON.stringify(obj));

/**
 * @param key 内存标识
 */
let _removeStorage = key => localStorage.removeItem(key);

/**
 * 初始化storage
 * @return {*}
 */
let initStorage = () => {
  let
    _todoKeys = _getStorage()
  ;

  if (!_todoKeys) {
    _setStorage([]);
    return [];
  }

  return _todoKeys.map(key => _getStorage(key));
};

let addStorage = item => {
  if (!item.id) {
    return;
  }

  let _todoKeys = _getStorage();
  _todoKeys.push(item.id);
  _setStorage(_todoKeys);
  _setStorage(item, item.id);
};

let updateStorage = item => {
  if (!item.id) {
    return;
  }

  _setStorage(item, item.id);
};

let removeStorage = key => {
  let
    _todoKeys = _getStorage()
    , _newTodoKeys = _todoKeys.filter(todoKey => todoKey !== key)
  ;

  _setStorage(_newTodoKeys);
  _removeStorage(key);
};

export default {
  initStorage,
  addStorage,
  updateStorage,
  removeStorage,
}