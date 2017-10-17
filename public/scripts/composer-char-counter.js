$(document).ready(function() {
  const charLimit = 140;

  $(".new-tweet textarea").on("keyup", function() {
    const counter = $(this).siblings(".counter"),
          charCount = $(this).val().length;

    if(charCount < charLimit) {
      counter.css("color", "");
    } else {
      counter.css("color", "red");
    }

    counter.text(charLimit - charCount);
  });
});