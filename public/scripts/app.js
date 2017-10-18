/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
  CHAR_LIMIT = 140;

  function createTweetElement(tweet) {

    const source = $("#tweet-template").html();
    const tweetTemplate = Handlebars.compile(source);

    const tweetData = {
      avatar: tweet.user.avatars.small,
      name: tweet.user.name,
      handle: tweet.user.handle,
      text: tweet.content.text,
      timeSince: moment(tweet.created_at).fromNow()
    };

    return tweetTemplate(tweetData);
  }

  function loadTweets() {
    $.ajax({
      url: 'tweets',
      method: 'GET'
    })
    .done(function(tweets) {
      renderTweets(tweets)
    });
  }

  function renderTweets(tweets) {
    $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty();

    tweets.forEach((tweet) => {
      $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    });
  }

  function postTweet(tweet) {
    $.ajax({
      url: 'tweets',
      method: 'POST',
      data: tweet
    })
    .done(function() {
      const composer = $(".new-tweet form");

      composer[0].reset();
      composer.find(".counter").text(CHAR_LIMIT);
      loadTweets();
    });
  }

  function submitTweet() {
    $(".new-tweet form").on("submit", function(event){
      event.preventDefault();

      $(".new-tweet.invalid").remove();

      const tweet = $(this).find("textarea").val();
      const invalidTweet = $("<p>").addClass("new-tweet invalid");

      // These two functions are repeating, DRY them
      if(isTweetEmpty(tweet)) {
        invalidTweet.text("Tweets cannot be empty.")
        $(".new-tweet").before(invalidTweet);
        return;
      }

      if(isTweetTooLong(tweet)) {
        invalidTweet.text(`Tweets cannot be longer than ${CHAR_LIMIT} characters.`)
        $(".new-tweet").before(invalidTweet);
        return;
      }

      postTweet($(this).serialize());
    });
  }

  loadTweets();
  submitTweet();
});