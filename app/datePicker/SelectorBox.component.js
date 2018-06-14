import san from 'san';

import './selectorBox.scss';

import {
  fixZero,
  dateToStr,
} from './date.funcs';

export default san.defineComponent({
  template: `
  <div class="selector-box">
    <header class="selector-head">
      <div>
        <span class="year-minus-btn" on-click="changeView('year-minus')"></span>
        <span class="month-minus-btn" on-click="changeView('month-minus')"></span>
      </div>
      
      <span>{{ year }} 年 {{ month | fixMonthFormat }} 月</span>
      
      <div>
        <span class="month-plus-btn" on-click="changeView('month-plus')"></span>
        <span class="year-plus-btn" on-click="changeView('year-plus')"></span>
      </div>
    </header>
    
    <div class="week-text-wrapper">
      <span
        s-for="weekday in aWeekdayText" 
      >{{ weekday }}</span>
    </div>
    
    <ul class="date-list-wrapper">
      <li 
        s-for="dateItem in dateList" 
        class="
        {{ dateItem.month === month ? 'current-month' : ''}}{{ dateItem.value === today ? ' today' : '' }}{{ dateItem.selected ? ' selected' : '' }}{{ dateItem.disabled ? ' disabled' : '' }}{{ dateItem.inRange ? ' inRange' : '' }}{{ dateItem.value === valueRange[0] ? ' first' : '' }}{{ dateItem.value === valueRange[1] ? ' last' : '' }}"
        on-click="handleDateClick(dateItem)"
      >
        <span>{{ dateItem.date }}</span>
      </li>
    </ul>
  </div>
  `,

  initData() {
    return {
      type: '',
      today: '',
      value: '',
      aWeekdayText: ['日', '一', '二', '三', '四', '五', '六'],
      month: undefined,
      year: undefined,
      dateList: [],        // 日历显示的日期(固定为6*7=42天)
      disabledPattern: undefined,
      isBoxShow: false,    // 节省一个dispatch事件

      valueRange: [],      // 最终输出值
      tempRange: [],       // 临时存储
      isSecondBox: false,  // 是否为第二个选择器

      updatePointer: 0     // 更新指针，用来同步两个选择框状态
    };
  },

  attached() {
    if (this.data.get('type') === 'date') {
      this.dateAttached();
      return;
    }

    this.dateRangeAttached();

    // 监控更新指针
    this.watch('updatePointer', () => this.updateDateList());
  },

  // pipe
  filters: {
    fixMonthFormat: num => fixZero(num + 1)
  },

  /**
   * changeView
   * @param sAction
   */
  changeView(sAction) {
    let _date = new Date(this.data.get('year'), this.data.get('month'), 1);

    switch (sAction) {
      case 'month-minus':
        _date.setMonth(_date.getMonth() - 1);
        break;

      case 'month-plus':
        _date.setMonth(_date.getMonth() + 1);
        break;

      case 'year-minus':
        _date.setFullYear(_date.getFullYear() - 1);
        break;

      case 'year-plus':
        _date.setFullYear(_date.getFullYear() + 1);
        break;
    }

    this.data.set('month', _date.getMonth());
    this.data.set('year', _date.getFullYear());
    _date.setDate(_date.getDate() - _date.getDay());  // view中第一天
    this.data.set('dateList', this.handleDateList(_date));
  },

  /**
   * selectDate
   * @param dateObj
   */
  handleDateClick(dateObj) {
    if (dateObj.disabled) {
      return;
    }

    // 日期选择器
    if (this.data.get('type') === 'date') {
      this.selectDate(dateObj);
      return;
    }

    // 日期范围选择
    let tempRange = this.data.get('tempRange');
    tempRange.push(dateObj.value);

    if (tempRange.length === 1) {
      this.data.set('valueRange', []);
      this.data.set('tempRange', tempRange);
      this.data.set('updatePointer', this.data.get('updatePointer') + 1);
      return
    }

    tempRange.sort();
    this.data.set('valueRange', [...tempRange]);
    this.data.set('tempRange', []);
    this.data.set('updatePointer', this.data.get('updatePointer') + 1);
    this.data.set('isBoxShow', false);
  },

  /**
   * selectDate
   * @param dateObj
   */
  selectDate(dateObj) {
    this.data.set('value', dateObj.value);
    this.data.set('isBoxShow', false);
  },

  /**
   * handleDateList
   * @param dFirstDateInView
   * @return {Array}
   */
  handleDateList(dFirstDateInView) {
    let
      _dateList = []
      , _disabledPattern = this.data.get('disabledPattern')
    ;

    // 42天
    for (let i = 0; i < 42; i++) {
      let _dateObj = {
        disabled: false,
        selected: false,
        inRange: false,
      };

      _dateObj.year = dFirstDateInView.getFullYear();
      _dateObj.month = dFirstDateInView.getMonth();
      _dateObj.date = dFirstDateInView.getDate();
      _dateObj.value = dateToStr(_dateObj.year, _dateObj.month, _dateObj.date);

      if (_disabledPattern && _disabledPattern.test(_dateObj.value)) {
        _dateObj.disabled = true;
      }

      // 日期选择器选择器
      if (this.data.get('value') && _dateObj.value === this.data.get('value')) {
        _dateObj.selected = true;
      }

      let
        _valueRange = this.data.get('valueRange')
        , _tempRange = this.data.get('tempRange')
      ;

      // 日期范围选择器
      if (
        _valueRange.indexOf(_dateObj.value) !== -1 ||
        _tempRange.indexOf(_dateObj.value) !== -1
      ) {
        _dateObj.selected = true;
      }

      if (_valueRange.length) {
        if (
          new Date(_dateObj.value) >= new Date(_valueRange[0]) &&
          new Date(_dateObj.value) <= new Date(_valueRange[1])
        ) {
          _dateObj.inRange = true;
        }
      }

      _dateList.push(_dateObj);
      dFirstDateInView.setDate(dFirstDateInView.getDate() + 1); // 指针移动到下一天
    }

    return _dateList;
  },

  /**
   * dateAttached 初始化日期选择器
   */
  dateAttached() {
    let
      _value = this.data.get('value')
      , _date
    ;

    if (_value) {
      _date = new Date(_value);
    } else {
      _date = new Date(this.data.get('today'));
    }

    this.initValueInAttached(_date);
  },

  /**
   * dateRangeAttached 初始化日期范围选择器
   */
  dateRangeAttached() {
    let
      _valueRange = this.data.get('valueRange')
      , isSecondBox = this.data.get('isSecondBox')
      , _date
    ;

    if (_valueRange.length) {
      // 存在值
      if (isSecondBox) {
        _date = new Date(_valueRange[1]);
      } else {
        _date = new Date(_valueRange[0]);
      }
    } else {
      // 不存在值
      _date = new Date(this.data.get('today'));

      // 第二个框默认显示下个月
      if (isSecondBox) {
        _date.setMonth(_date.getMonth() + 1);
      }
    }

    this.initValueInAttached(_date);
  },

  /**
   * 初始值的公共函数
   * @param date
   */
  initValueInAttached(date) {
    this.data.set('month', date.getMonth());
    this.data.set('year', date.getFullYear());

    this.updateDateList();
  },

  updateDateList() {
    let _date = new Date(this.data.get('year'), this.data.get('month'), 1);   // 本月第一天
    _date.setDate(_date.getDate() - _date.getDay());                          // view中第一天

    this.data.set('dateList', this.handleDateList(_date));
  },
});

