$(function() {
  $("#nav-bar button").on("click", function(event) {
    event.preventDefault();

    $(".new-tweet").slideToggle(function() {
      $(this).find("textarea").focus();
    });
  });
});