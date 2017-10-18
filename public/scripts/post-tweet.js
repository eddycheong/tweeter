$(function() {

  function clearTextarea() {
  }

  function updateTweets() {
  }

  $(".new-tweet form").on("submit", function(event){
    event.preventDefault();
    $.ajax({
      url: 'tweets',
      method: 'POST',
      data: $(this).serialize(),
      success: function () {
        console.log("send post request");
      }
    });
  });
});