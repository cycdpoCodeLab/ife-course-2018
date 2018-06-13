/**
 * fixZero
 * @param num
 * @return {string}
 */
export let fixZero = num => num.toString().length === 1
  ? '0' + num
  : '' + num;

/**
 * dateToStr
 * @param date
 * @return {string}
 */
export let dateToStr = date => {
  let
    _year = date.getFullYear()
    , _month = fixZero(date.getMonth() + 1)
    , _date = fixZero(date.getDate())
  ;

  return '' + _year + '-' + _month + '-' + _date;
};

/**
 * handleDateList
 * @param dFirstDateInView
 * @return {Array}
 */
export let handleDateList = dFirstDateInView => {
  let _dateList = [];
  // 42天
  for (let i = 0; i < 42; i++) {
    let _dateObj = {};

    _dateObj.year = dFirstDateInView.getFullYear();
    _dateObj.month = dFirstDateInView.getMonth();
    _dateObj.date = dFirstDateInView.getDate();
    _dateObj.value = dateToStr(dFirstDateInView);

    _dateList.push(_dateObj);
    dFirstDateInView.setDate(dFirstDateInView.getDate() + 1); // 指针移动到下一天
  }

  return _dateList;
};


