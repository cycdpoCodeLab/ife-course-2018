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
 * @param year
 * @param month
 * @param date
 * @return {string}
 */
export let dateToStr = (year, month, date) => '' + year + '-' + fixZero(month + 1) + '-' + fixZero(date);


