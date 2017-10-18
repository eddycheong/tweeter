/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
  CHAR_LIMIT = 140;

  function daysSince(date) {
      var DAY_IN_MS = 1000 * 60 * 60 * 24

      // Calculate the difference in milliseconds
      var difference = Math.abs(Date.now() - date)

      // Convert back to days and return
      return Math.round(difference/DAY_IN_MS)
  }


  function isTweetEmpty(tweet) {
    if(tweet !== "" && tweet !== null) {
      return false;
    }

    return true;
  }

  function isTweetTooLong(tweet) {
    if(tweet.length <= CHAR_LIMIT) {
      return false;
    }

    return true;
  }

  function createTweetElement(tweet) {

    const source = $("#tweet-template").html();
    const tweetTemplate = Handlebars.compile(source);

    const tweetData = {
      avatar: tweet.user.avatars.small,
      name: tweet.user.name,
      handle: tweet.user.handle,
      text: tweet.content.text,
      timeSince: daysSince(tweet.created_at)
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
        invalidTweet.text("Tweets cannot be longer than the character limit.")
        $(".new-tweet").before(invalidTweet);
        return;
      }

      postTweet($(this).serialize());
    });
  }

  loadTweets();
  submitTweet();
});