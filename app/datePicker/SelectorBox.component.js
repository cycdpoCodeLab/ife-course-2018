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
      <span>日</span>
      <span>一</span>
      <span>二</span>
      <span>三</span>
      <span>四</span>
      <span>五</span>
      <span>六</span>
    </div>
    
    <ul class="date-list-wrapper">
      <li 
        s-for="dateItem in dateList" 
        class="{{ dateItem.month === month ? 'current-month' : ''}}{{ dateItem.value === today ? ' today' : '' }}{{ dateItem.value === value ? ' current-day' : '' }}{{ dateItem.disabled ? ' disabled' : '' }}"
        on-click="selectDate(dateItem)"
      >
        <span>{{ dateItem.date }}</span>
      </li>
    </ul>
  </div>
  `,

  initData() {
    return {
      today: '',
      value: '',
      month: undefined,
      year: undefined,
      dateList: [],        // 日历显示的日期(固定为6*7=42天)
      disabledPattern: undefined,
      isBoxShow: false,    // 节省一个dispatch事件
    };
  },

  attached() {
    let
      _value = this.data.get('value')
      , _date
    ;

    if (_value) {
      _date = new Date(_value);
    } else {
      _date = new Date(this.data.get('today'));
    }

    this.data.set('month', _date.getMonth());
    this.data.set('year', _date.getFullYear());

    _date.setDate(1);                                 // 本月第一天
    _date.setDate(_date.getDate() - _date.getDay());  // view中第一天

    this.data.set('dateList', this.handleDateList(_date));
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
  selectDate(dateObj) {
    if (dateObj.disabled) {
      return;
    }
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
        disabled: false
      };

      _dateObj.year = dFirstDateInView.getFullYear();
      _dateObj.month = dFirstDateInView.getMonth();
      _dateObj.date = dFirstDateInView.getDate();
      _dateObj.value = dateToStr(_dateObj.year, _dateObj.month, _dateObj.date);

      if (_disabledPattern.test(_dateObj.value)) {
        _dateObj.disabled = true;
      }

      _dateList.push(_dateObj);
      dFirstDateInView.setDate(dFirstDateInView.getDate() + 1); // 指针移动到下一天
    }

    return _dateList;
  },
});

