/*
 * @Description: 自定义js脚本文件 - 采用对象式写法可以清晰逻辑结构 - 后续若无重大结构问题, 请勿随意变更主体结构
 * @Author: MrGoorit
 * @Date: 2023-06-25 21:22:40
 * @LastEditors: MrGoorit
 * @LastEditTime: 2023-06-26 00:06:23
 */
// 通用执行对象
var CUSTOM_EXECUTE_OBJ = (function(winObj, $) {
  var COMMON_EXECUTE = 'common_execute'; // 通用执行

  winObj[COMMON_EXECUTE] = {
    // 初始化
    init () {
      var _this = this;

      _this.initTopHeader();
    },

    // 工具方法 start
    // 睡眠函数
    sleep (delay) {
      delay = +delay || 500;
      return new Promise(function (resolve) {
        setTimeout(resolve, delay);
      });
    },
    // 工具方法 end

    // 初始化头部文件
    initTopHeader () {
      // 设置顶部间距
      function setMainPagePaddingTop () {
        var headerHeightStr = $('#JS_GLOBAL_HEADER').css('height');
        $('#JS_MAIN_PAGE').css('padding-top', headerHeightStr);
      }
      
      setMainPagePaddingTop();
      var _this = this;
      $('#JS_HEADER_CLOSE_ICON').click(function () {
        $('#JS_HEADER_TOP').hide();
        _this.sleep(200).then(function () {
          setMainPagePaddingTop();
        });
      });
    }
  };

  // 执行初始化函数
  $(document).ready(function () {
    winObj[COMMON_EXECUTE].init();
  });

  return winObj;
})(window.CUSTOM_EXECUTE_OBJ || {}, jQuery);
