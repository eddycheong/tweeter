/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {
  const CHAR_LIMIT = 140;

  function createTweetElement(tweet) {

    const source = $("#tweet-template").html();
    const tweetTemplate = Handlebars.compile(source);

    const tweetData = {
      avatar: tweet.user.avatars.small,
      name: tweet.user.name,
      handle: tweet.user.handle,
      text: tweet.content.text,
      timeSince: moment(tweet.created_at).fromNow(),
      likes: tweet.likes
    };

    return tweetTemplate(tweetData);
  }

  function loadTweets() {
    $.ajax({
      url: 'tweets',
      method: 'GET'
    })
    .done(tweets => renderTweets(tweets));
  }

  function renderTweets(tweets) {
    const $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty();

    tweets.forEach(tweet => {
      $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    });
  }

  function postTweet(tweet) {
    const $composer = $(".new-tweet form"),
          $counter = $composer.find(".counter"),
          $submit = $(".new-tweet input");


    $submit.attr("disabled", true);

    $.ajax({
      url: 'tweets',
      method: 'POST',
      data: tweet
    })
    .done(function() {
      $composer[0].reset();
      $counter.text(CHAR_LIMIT);
      loadTweets();
    })
    .always(function() {
      $submit.removeAttr("disabled");
    });
  }

  function submitTweet() {
    $(".new-tweet form").on("submit", function(event){
      event.preventDefault();

      $(".new-tweet.invalid").remove();

      const tweet = $(this).find("textarea").val();

      if(!isValidTweet(tweet,
                      isTweetEmpty,
                      "Tweets cannot be empty.")) {

        return;
      }

      if(!isValidTweet(tweet,
                      isTweetTooLong,
                      `Tweets cannot be longer than ${CHAR_LIMIT} characters.`)) {
        return;
      }

      postTweet($(this).serialize());
    });
  }

  // Helper Functions
  function isTweetEmpty(tweet) {
    if(!!tweet) {
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

  function isValidTweet(tweet, validateCallback, errorMessage) {
    const invalidTweet = $("<p>").addClass("new-tweet invalid");

    if(validateCallback(tweet)) {
        invalidTweet.text(errorMessage)
        $(".new-tweet").before(invalidTweet);
        return false;
    }

    return true;
  }

  loadTweets();
  submitTweet();
});