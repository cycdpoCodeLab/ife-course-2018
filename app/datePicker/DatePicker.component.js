import san from 'san';

import './datePicker.scss';

import SelectorBoxComponent from './SelectorBox.component';

import {
  dateToStr
} from './date.funcs';

export default san.defineComponent({
  components: {
    'selector-box': SelectorBoxComponent,
  },

  template: `
  <div class="date-picker-wrapper" on-click="stopPropagation($event)">
    <div
      class="input{{ isBoxShow ? ' box-show' : ''}}"
      on-click="toggle"
    >
      <template s-if="type === 'date'">
        <div class="date{{ value ? '' : ' unchecked'}}">{{ value ? value : '选择日期' }}</div>
      </template>
      
      <template s-if="type === 'date-range'">
        <div class="{{ valueRange.length !== 0 ? '' : 'unchecked'}}">{{ valueRange[0] ? valueRange[0] : '开始日期' }}</div>
        <span>~</span>
        <div class="{{ valueRange.length !== 0 ? '' : 'unchecked'}}">{{ valueRange[1] ? valueRange[1] : '结束日期' }}</div>
      </template>
      
      <span
        class="delete-btn"
        s-if="value || valueRange.length"
        on-click="handleDelete($event)"></span>
    </div>
    
    <div 
    class="selector-box-wrapper{{ needSelectorBoxUp ? ' upSide' : '' }}"
    s-if="isBoxShow"
    s-transition="trans.selectorBox"
    >
      <template s-if="type === 'date'">
        <selector-box
          type="{{ type }}"
          value="{= value =}"
          today="{{ today }}"
          isBoxShow="{= isBoxShow =}"
          disabledPattern="{{ disabledPattern }}"
        ></selector-box>
      </template>
      
      <template s-if="type === 'date-range'">
        <selector-box
          type="{{ type }}"
          valueRange="{= valueRange =}"
          tempRange="{= tempRange =}"
          today="{{ today }}"
          isBoxShow="{= isBoxShow =}"
          disabledPattern="{{ disabledPattern }}"
          updatePointer="{= updatePointer =}"
        ></selector-box>
        
        <div class="date-range-line"></div>
        
        <selector-box
          type="{{ type }}"
          valueRange="{= valueRange =}"
          tempRange="{= tempRange =}"
          today="{{ today }}"
          isBoxShow="{= isBoxShow =}"
          disabledPattern="{{ disabledPattern }}"
          isSecondBox
          updatePointer="{= updatePointer =}"
        ></selector-box>
      </template>
    </div>
    
  </div>
  `,

  initData() {
    return {
      type: 'date',
      value: '',
      valueRange: [],
      tempRange: [],
      isBoxShow: false,
      today: '',
      disabledPattern: undefined,
      needSelectorBoxUp: false,       // selectorBox 是否需要移到input上方
      updatePointer: 0,
    };
  },

  attached() {
    // 模拟blur
    document.body.addEventListener('click', () => this.data.set('isBoxShow', false), this.clearTempRange());

    // 滚动条事件
    window.addEventListener('scroll', () => {
      if (!this.data.get('isBoxShow')) {
        return;
      }

      this.fixSelectorBoxPosition();
    });

    // 赋值今天日期
    let _date = new Date();
    this.data.set('today', dateToStr(_date.getFullYear(), _date.getMonth(), _date.getDate()));
  },

  /**
   * fixSelectorBoxPosition
   */
  fixSelectorBoxPosition() {
    let
      _wrapperBottom = this.el.getBoundingClientRect().bottom
      , windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    ;

    // selectorBox 高度           312
    // selectorBox 距离input      16
    // selectorBox 下面再空一点距离 12
    // 一共                       340
    if (windowH - _wrapperBottom < 340) {
      this.data.set('needSelectorBoxUp', true);
      return;
    }

    this.data.set('needSelectorBoxUp', false);
  },

  stopPropagation(e) {
    e.stopPropagation();
  },

  handleDelete(e) {
    e.stopPropagation();

    if (this.data.get('type') === 'date') {
      this.data.set('value', '');
      return;
    }

    this.data.set('valueRange', []);
    this.data.set('updatePointer', this.data.get('updatePointer') + 1);
  },

  trans: {
    selectorBox: {
      enter: (el, done) => {
        el.classList.add('before-enter');

        setTimeout(() => {
          el.classList.add('enter');
          el.classList.remove('before-enter');
        }, 0);

        el.addEventListener('transitionend', () => {
          el.classList.remove('enter');
          done();
        });
      },

      leave: (el, done) => {
        el.classList.add('before-leave');

        setTimeout(() => {
          el.classList.add('leave');
          el.classList.remove('before-leave');
        }, 0);

        el.addEventListener('transitionend', () => {
          el.classList.remove('leave');
          done();
        });
      }
    }
  },

  toggle() {
    this.fixSelectorBoxPosition();
    this.clearTempRange();

    setTimeout(() => this.data.set('isBoxShow', !this.data.get('isBoxShow')), 0);
  },

  clearTempRange() {
    if (this.data.get('type') === 'date-range') {
      this.data.set('tempRange', []);
    }
  },
});