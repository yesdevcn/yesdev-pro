/*
 * @Description: YesDev - 客户分享查阅页面 - 业务源代码
 * @Author: MrGoorit
 * @Date: 2024-02-19 15:05:33
 * @LastEditors: MrGoorit
 * @LastEditTime: 2024-02-27 17:15:42
 */
// 设置水印类
class CanvasWaterMark {
  constructor (watermark) {
    this.watermark = watermark
    this.mo = null
    this.createWm()
  }

  render() {
    const {
      text = '果创科技自己研发的项目协作平台',
      spaceType = 2,
    } = this.watermark;
    
    const canvasId = 'JS_WATERMARK_CANVAS';
    // 创建一个canvas标签
    const canvas = document.getElementById(canvasId);
    // 如果已有则不再创建
    const can = canvas || document.createElement('canvas');
    can.id = canvasId;
    $('#JS_PRINTPAGE_MAIN_ELEMENT').append(can);
    // 设置宽高
    let textRealWidth = 14 * (text.length)
    textRealWidth = textRealWidth > 200 ? textRealWidth : 200
    can.width = spaceType == 2 ? textRealWidth + 100 : textRealWidth + 60;
    can.height = spaceType == 2 ? 300 : 200;
    // 设置为不可见
    can.style.display = 'none';
    const ctx = can.getContext('2d');
    // 设置画布的样式
    ctx.rotate((-20 * Math.PI) / 180);
    ctx.font = '12px Microsoft JhengHei';
    ctx.fillStyle = 'rgba(0, 0, 0, .4)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 计算文本的宽度和高度
    const textWidth = ctx.measureText(text).width; // 根据文本内容测量宽度
    const textHeight = 12; // 通过parseInt函数提取字体大小作为高度
    
    // 计算文本左上角的起始点坐标（考虑到画布边界）
    var xPos = (can.width - textWidth) / 2; // 水平居中
    var yPos = (can.height + textHeight) / 2; // 垂直居中

    ctx.fillText(text, xPos, yPos);

    return can;
  }

  createWm() {
    // 避免重复生成
    const __wm = document.querySelector('.wm_wrap')
    if (__wm) {
      return false;
    }

    // 生成水印节点
    let wm_div = document.createElement("div")
    wm_div.classList.add('wm_wrap')
    let xOffsetWidth = $('#app').hasClass('printpage') ? 60 : 0;
    let topOffsetHeight = $('#app').hasClass('printpage') ? 12 : 64;
    const styleStr = `
        position: absolute;
        top: ${ topOffsetHeight }px;
        bottom: 0;
        left: ${ xOffsetWidth }px;
        right: ${ xOffsetWidth }px;;
        z-index: 99;
        opacity: .5;
        pointer-events: none;
        background-image: url(${ this.render().toDataURL('image/png') }) !important;
        background-repeat: repeat !important;
        -webkit-print-color-adjust: exact;
        `;

    wm_div.setAttribute('style', styleStr);
    $('#JS_PRINTPAGE_MAIN_ELEMENT').prepend(wm_div);

    // 监听器
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
    if (MutationObserver) {
      // 生成监听器
      this.mo = new MutationObserver(() => {
        const __wm = document.querySelector('.wm_wrap')
        // 水印元素不存在或者水印样式被修改时触发
        if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
          // 删除原有元素
          __wm.remove(0)
          // 销毁监听器，避免一直触发
          this.mo.disconnect()
          this.mo = null
          // 重新生成水印
          this.createWm()
        }
      })

      // 执行监听器
      this.mo.observe(document.body, {
        attributes: true,
        subtree: true,
        childList: true
      })
    }
  }

  removeWm() {
    const __wm = document.querySelector('.wm_wrap')
    if (__wm) {
      __wm.remove(0)
      // 销毁监听器
      this.mo && this.mo.disconnect()
      this.mo = null
    }
  }
}

var YESDEV_SHARE_PAGE_OBJ = (function (yesdevShareObj, $) {
  // 是否存在某元素
  $.fn.exists = function () {
    return this.length > 0;
  };

  yesdevShareObj = {
    // 水印对象
    watermarkObj: null,
    
    // 初始化数据 - 入口方法
    initPage() {
      const that = this;

      that.setWaterMarkDom();
      that.setImageViewer();
      that.setPrintPage();
      that.setDownloadPDF();
    },

    // 设置 rem 使用
    setFontSize(doc, win) {
      var docEl = doc.documentElement;
      var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
      var reCaculate = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) {
          return false;
        }

        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      };

      if (!doc.addEventListener) {
        return false;
      }

      win.addEventListener(resizeEvt, reCaculate, false);
      doc.addEventListener('DOMContentLoaded', reCaculate, false);
    },

    // 设置水印信息
    setWaterMarkDom () {
      if (this.watermarkObj) {
        this.watermarkObj.removeWm();
        this.watermarkObj = null;
      }

      const wmInfoEl = $('#JS_WATERMASK_INFO_INPUT');
      if (!wmInfoEl.exists()) {
        return false;
      }

      let wmText = wmInfoEl.val();
      if (!wmText) {
        return false;
      }

      let wmType = wmInfoEl.attr('data-watermasktype');
      
      this.watermarkObj = new CanvasWaterMark({
        text: wmText,
        spaceType: wmType
      });
    },

    // 设置图片预览
    setImageViewer () {
      if (!$('#JS_IMAVIEWER_BOX').exists()) {
        return false;
      }

      $('#JS_IMAVIEWER_BOX').viewer && $('#JS_IMAVIEWER_BOX').viewer();
    },

    // 是否执行打印
    setPrintPage () {
      const that = this;
      window.removeEventListener('afterprint', that.autoClosePageTag, false);

      let isPrintPage = that.getUrlParameter('printpage')
      if (isPrintPage != 1) {
        return false
      }

      $('#app').addClass('printpage');
      window.addEventListener('afterprint', that.autoClosePageTag);

      setTimeout(() => {
        window.print();
      }, 100);
    },

    // 自动关闭页面
    autoClosePageTag () {
      if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") != -1) {
        window.location.href = "about:blank";
        window.close();
      } else {
        window.opener = null;
        window.open("", "_self");
        window.close();
      }
    },

    // 设置下载pdf
    setDownloadPDF () {
      let isDownloadPDF = this.getUrlParameter('not_pass');
      if (isDownloadPDF == 1) {
        $('#app').addClass('printpage');
      }
    },

    // 获取地址栏参数  
    getUrlParameter (name) {
      var regex = new RegExp('[?&]' + name + '=([^&#]*)');
      var results = regex.exec(window.location.href);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    },
  };

  $(document).ready(function () {
    const curWindowPathUrl = window.location.href
    let isCurPathMobile = curWindowPathUrl.indexOf('/m/') > -1 ? true : false;
    let isCurDeviceIsMobile = /Android|webOS|iPhone|iPod|BlackBerry|Mobile/i.test(navigator.userAgent) ? true : false;
    if (isCurPathMobile && isCurDeviceIsMobile) {
      yesdevShareObj.initPage();
    } else {
      let newPath = ''
      if (isCurDeviceIsMobile && !isCurPathMobile) {
        const origin = window.location.origin;
        newPath = curWindowPathUrl.replace(origin, `${ origin }/m/`);
      }
      
      if (!isCurDeviceIsMobile && isCurPathMobile) {
        newPath = curWindowPathUrl.replace('/m/', '/');
      }
      
      if (newPath) {
        setTimeout(() => {
          window.location.replace(newPath);
        }, 100);
      } else {
        yesdevShareObj.initPage();
      }
    }
  })

  return yesdevShareObj;
})(window.YESDEV_SHARE_PAGE_OBJ || {}, jQuery);
