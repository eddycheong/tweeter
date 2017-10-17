$(document).ready(function() {
  const charLimit = 140;
  const errorClass = "error";

  $(".new-tweet textarea").on("input", function() {
    const counter = $(this).siblings(".counter"),
          charCount = $(this).val().length;

    counter.removeClass(errorClass);
    counter.text(charLimit - charCount);

    if(charCount > charLimit) {
      counter.addClass(errorClass);
    }
  });
});