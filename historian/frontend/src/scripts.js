$(function() {
  $(document).on("click", ".help", function() {
    $(".help-content").toggle();
    $(".col-md-4").toggleClass("col-md-6 col-lg-6");

  });
});
