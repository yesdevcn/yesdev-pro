$('.formChoosePrice').on('ajaxSuccess', function (e, c, d, f, g) {
  if ($("#colFormSubscribe").length > 0) {
    $('html, body').animate({
      scrollTop: $("#colFormSubscribe").offset().top
    }, 1000);
  }
  else {
    $('html, body').animate({
      scrollTop: $("body").offset().top
    }, 1000);
  }
  if ($("input[name=pid]").length > 0)
    $("input[name=pid]").val(d.pid);
});
$(document).on('click', '.changePlan', function () {
  if ($("#how-it-works").length > 0) {
    $('html, body').animate({
      scrollTop: $("#how-it-works").offset().top
    }, 1000);
  }
});