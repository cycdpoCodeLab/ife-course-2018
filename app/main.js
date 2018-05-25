// global css
import './theme/main.scss';

if (DEVELOPMENT) {
  console.log('Development Mode');
}

if (PRODUCTION) {
  console.log('Production Mode');
}

// web page init
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');

  // 动态获取屏幕宽高，使图片保持全屏显示状态
  (() => {
    const BASE_ON_HEIGHT_CLASS_NAME = 'base-on-height';
    const PIC_ASPECT_RATIO = 16 / 9;
    let ePic = document.querySelector('.pic');

    /**
     * 设置全屏主函数
     * @private
     */
    let _fixPicFullScreen = () => {
      let
        // 因为body设置了全屏，所以获取视窗宽高就等于获取body的宽高
        oBodyClientRect = document.body.getBoundingClientRect()
        , nScreenWidth = oBodyClientRect.width
        , nScreenHeight = oBodyClientRect.height
      ;

      if (nScreenWidth / nScreenHeight > PIC_ASPECT_RATIO) {
        ePic.classList.remove(BASE_ON_HEIGHT_CLASS_NAME);
        return;
      }
      ePic.classList.add(BASE_ON_HEIGHT_CLASS_NAME);
    };

    /**
     * 节流函数
     * @param callBack     回调程序
     * @param delay        延时时间
     * @param intervalTime 间隔时间
     * @return {Function}
     * @private
     */
    let _throttleFn = ({
                         callBack,
                         delay = 50,
                         intervalTime =300
                       }) => {
      let
        timer = null         // 定时器变量
        , nTimestamp = 0     // 时间戳变量
      ;

      return () => {
        let curTime = new Date().getTime();  // 当前时间

        // 清除上次的定时器
        if (timer) {
          clearTimeout(timer);
        }

        if (!nTimestamp) {
          nTimestamp = curTime;
        }
        // 当前执行时间距离上次执行的时间是否大于等于间隔时间
        if (curTime - nTimestamp >= intervalTime) {
          nTimestamp = curTime;
          callBack.apply(this, arguments);
        } else {
          timer = setTimeout(() => callBack.apply(this, arguments), delay);
        }
      }
    };

    // 先执行一次
    _fixPicFullScreen();

    window.addEventListener('resize', _throttleFn({
      callBack: _fixPicFullScreen,
    }))
  })();

  // 设定用户点击操作
  (() => {
    const ACTIVE_CLASS_NAME = 'active';

    let
      aPics = Array.prototype.slice.call(document.querySelectorAll('.pic img'))
      , eThumb = document.querySelector('.thumb')
      , aThumbs = Array.prototype.slice.call(eThumb.querySelectorAll('img'))

      // 默认激活第一个
      , sActiveIndex = '1'

      // 修改nZIndex使得后激活的图片总是在之前图片上
      , nZIndex = 1
    ;

    // 初始化第一张图片
    aPics[0].classList.add(ACTIVE_CLASS_NAME);
    aPics[0].style.zIndex = ++nZIndex;
    aThumbs[0].classList.add(ACTIVE_CLASS_NAME);

    // 点击缩略图
    eThumb.addEventListener('click', e => {
      let
        _target = e.target
        , _index = _target.dataset.index
      ;

      // 不存在index直接跳出
      if (!_index) {
        return;
      }

      // 点击了正在激活状态的thumb，直接跳出
      if (_index === sActiveIndex) {
        return;
      }

      // thumb变化
      aThumbs[sActiveIndex - 1].classList.remove(ACTIVE_CLASS_NAME);
      aThumbs[_index - 1].classList.add(ACTIVE_CLASS_NAME);

      // pic变化
      aPics[sActiveIndex - 1].classList.remove(ACTIVE_CLASS_NAME);
      aPics[_index - 1].classList.add(ACTIVE_CLASS_NAME);
      aPics[_index - 1].style.zIndex = ++nZIndex;

      // 更新sActiveIndex
      sActiveIndex = _index;
    });
  })();

}, false);
