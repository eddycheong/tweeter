$(document).ready(function() {
  const errorClass = "error";

  $(".new-tweet textarea").on("input", function() {
    const counter = $(this).siblings(".counter"),
          charCount = $(this).val().length;

    counter.removeClass(errorClass);
    counter.text(CHAR_LIMIT - charCount);

    if(charCount > CHAR_LIMIT) {
      counter.addClass(errorClass);
    }
  });
});