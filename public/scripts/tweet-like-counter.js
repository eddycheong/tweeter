$(function() {
  $("#tweets-container").on("click", ".fa-heart", function() {
    const id = $(this).closest(".tweet").data("tweet-id"),
          $likes = $(this).find("span");

    let numLikes = Number($likes.text()),
        liked = $likes.data("tweet-liked");

    if(liked) {
      numLikes -= 1;
    } else {
      numLikes += 1;
    }

    liked = !liked;

    $.ajax({
      url: `tweets/${id}`,
      method: 'PUT',
      data: `fields={"likes":${numLikes}, "liked":${liked}}`
    })
    .done(function(err, a,b,c) {
      $likes.text(numLikes);
      $likes.data("tweet-liked", liked);
    });
  });
});