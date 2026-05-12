/*
 * @Description: 预约演示弹窗 - JQ版本代码
 * @Author: MrGoorit
 * @Date: 2024-02-04 11:10:51
 * @LastEditors: MrGoorit
 * @LastEditTime: 2024-02-18 11:54:08
 */
var MODAL_36KR_OBJ = function (modal36krObj, $, mode) {
  // 是否存在某元素
  $.fn.exists = function () {
    return this.length > 0;
  }
  
  // 对象加载
  modal36krObj = {
    // 已经打开过弹窗
    hasOpenModal: true,
    
    // 初始化数据
    initData () {
      // 判断是否已有元素
      if ($('#JS_APPOINTMENT_DEMONSTRAION_MODAL').exists()) {
        // return false;
      }

      const COOKIE_KEY_OF_MODAL_OPEN = 'open_modal_36kr_key';
      // 检测是否有cookie
      this.hasOpenModal = this.getCookie(COOKIE_KEY_OF_MODAL_OPEN);
      if (this.hasOpenModal) {
        // return false;
      }

      // 种下cookie
      this.setCookie(COOKIE_KEY_OF_MODAL_OPEN, true, 2);
      this.appendModal();
    },

    //设置 cookie 值
    //cookie 名、cookie 值、cookie过期时间
    setCookie (cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
    },

    //获取 cookie 值
    //使用分号来分割 document.cookie 字符串，并将分割后的字符串数组赋值给 ca 。
    //循环 ca 数组，然后读取数组中的每个值，并去除前后空格。
    //如果找到name，返回 cookie 的值。
    getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) 
      {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
      }
      return "";
    },

    // 生成modal弹窗
    appendModal () {
      // 判断是否已有元素
      if ($('#JS_MODAL_36KR').exists()) {
        return false;
      }

      const centerTextBoxHtml = mode && mode == 'expire_out'
          ? `
            <div class="text-large">
              <p class="text"><font color="red">套餐续费提醒</font></p>
              <p class="text theme">您好，套餐过期，请续费！</p>
            </div>
            <div class="text-less">
              <p class="text">续费后，可继续恢复正常使用。</p>
              <p class="text">如需要个性化优惠套餐，欢迎随时联系我们。</p>
            </div>
          `
          : `
            <div class="text-large">
              <p class="text"><font color="red">账号增购提醒</font></p>
              <p class="text theme">您好，账号不足，请增购！</p>
            </div>
            <div class="text-less">
              <p class="text">增购后，可继续邀请/添加新员工。</p>
              <p class="text">如需要个性化优惠套餐，欢迎随时联系我们。</p>
            </div>
          `;

      const btnBoxHtml = mode && mode == 'expire_out'
          ? `
            <a href="/platform/place-an-order/index?product_id=1" >
              <button class="btn yesdev" id="JS_I_KNOW_BTN">
                <span>立即续费套餐</span>
              </button>
            </a>
          `
          : `
            <a href="/platform/order" >
              <button class="btn yesdev" id="JS_I_KNOW_BTN">
                <span>立即增购账号</span>
              </button>
            </a>
          `;

      const modalElementStr = 
`<div id="JS_MODAL_36KR">
<div class="modal-36kr-mask"></div>
<div class="modal-36kr-root">
  <div class="kr-modal">
    <div class="modal-content">
      <div class="modal-body">
        <div id="JS_CLOSE_MODAL_BTN" class="right-close-modal-icon-box"><div class="close-text">+</div></div>
        <div class="modal-index-flex-content">
          <div class="top-img-box">
            <img src="//oss.yesdev.cn/front/assets_imgs/logo_with_text.png" class="logo-img" />
          </div>
          <div class="center-text-box">
          ` + centerTextBoxHtml + `
          </div>
          <div class="btn-box">
          ` + btnBoxHtml + `
          </div>
          <div class="bottom-img-box">
            <div class="contact-box">
              <div class="img-box">
                <img src="//oss.yesdev.cn/front/assets_imgs/qywx_yoyo.jpg" class="img" alt="客服Yoyo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>`;

      $('body').append(modalElementStr);

      $(document).off('click', '#JS_CLOSE_MODAL_BTN');
      $(document).on('click', '#JS_CLOSE_MODAL_BTN', function () {
        $('#JS_MODAL_36KR').remove();
      });

      $(document).on('click', '#JS_I_KNOW_BTN', function () {
        $('#JS_MODAL_36KR').remove();
      });
    }
  };

  // 执行加载
  $(document).ready(function () {
    setTimeout(() => {
      modal36krObj.initData();
    }, 500);
  });

  return modal36krObj;

};
