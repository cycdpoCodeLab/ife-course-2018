// global css
import './theme/main.scss';

// jquery
import $ from 'jquery';

if (DEVELOPMENT) {
  console.log('Development Mode');
}

if (PRODUCTION) {
  console.log('Production Mode');
}

// web page init
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');

  let
    $aInpty = {
      $email: $('#email'),
      $password: $('#password')
    }
    , $submit = $('.form__wrapper__submit')
  ;

  const
    // 样式常量
    EMPTY_CLASS_NAME = 'empty'
    , ANIMATED_CLASS_NAME = 'animated'
    , SHOW_CLASS_NAME = 'show'

    // 验证正则
    , REGEXP = {
      EMAIL: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
      PASSWORD: /^([a-zA-Z0-9]|[._]){6,16}$/
    }

    // 错误提示
    , ERROR_TEXT = {
      EMAIL_EMPTY: 'Email is required.',
      EMAIL_ILLEGAL: 'Please enter the correct email address.',
      PASSWORD_EMPTY: 'Password is required',
      PASSWORD_ILLEGAL: 'Password must consist of 6 to 16 digits and letters.'
    }
  ;

  $aInpty.$email.verified = false;
  $aInpty.$password.verified = false;

  [
    $aInpty.$email,
    $aInpty.$password
  ].forEach($input => $input.blur(() => {
    let
      _value = $input.val()
      , _name = $input.attr('name')
      , $errorMsg = $input.parent().next()
    ;

    /**
     * 验证失败
     * @param callback
     * @private
     */
    let _verifyFail = (callback = () => {
    }) => {
      $aInpty['$' + _name].verified = false;
      $submit.removeClass(ANIMATED_CLASS_NAME);
      callback();
    };

    /**
     * 全部验证通过
     * @private
     */
    let _allverified = () => {
      if ($aInpty.$email.verified && $aInpty.$password.verified) {
        $submit.addClass(ANIMATED_CLASS_NAME);
        return;
      }

      $submit.removeClass(ANIMATED_CLASS_NAME);
    };

    // 验证是否为空，并控制样式
    if (!_value) {
      _verifyFail(() => {
        $input.addClass(EMPTY_CLASS_NAME);

        $errorMsg
          .addClass(SHOW_CLASS_NAME)
          .text(ERROR_TEXT[_name.toUpperCase() + '_EMPTY']);
      });
      return;
    }

    $input.removeClass(EMPTY_CLASS_NAME);

    // 不为空的情况下进行下一步验证
    if (REGEXP[_name.toUpperCase()].test(_value)) {
      // 正则验证成功
      $input.verified = true;
      $errorMsg.removeClass(SHOW_CLASS_NAME);
      _allverified();
    } else {
      // 正则验证失败
      _verifyFail(() => $errorMsg
        .addClass(SHOW_CLASS_NAME)
        .text(ERROR_TEXT[_name.toUpperCase() + '_ILLEGAL']));
    }
  }));

}, false);
