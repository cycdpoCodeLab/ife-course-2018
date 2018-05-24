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
}, false);
