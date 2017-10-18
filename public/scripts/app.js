/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  function daysSince(date) {
      var DAY_IN_MS = 1000 * 60 * 60 * 24

      // Calculate the difference in milliseconds
      var difference = Math.abs(Date.now() - date)

      // Convert back to days and return
      return Math.round(difference/DAY_IN_MS)
  }

  function createTweetElement(tweet) {
    $header = $("<header>")
                  .append($("<img>").attr("src", tweet.user.avatars.small))
                  .append($("<h1>").text(tweet.user.name))
                  .append($("<span>").text(tweet.user.handle));

    $content = $("<p>").text(tweet.content.text);

    $footer = $("<footer>")
                  .append($("<p>").text(`${daysSince(tweet.created_at)} days ago`))
                  .append($("<span>")
                    .append($("<i>").addClass("fa fa-flag"))
                    .append($("<i>").addClass("fa fa-retweet"))
                    .append($("<i>").addClass("fa fa-heart"))
                  );

    $tweet = $("<article>").addClass("tweet")
                  .append($header)
                  .append($content)
                  .append($footer);

    return $tweet;
  }

  function renderTweets(tweets) {
    $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty();

    tweets.forEach((tweet) => {
      $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet);
    });
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

  function submitTweet() {
    $(".new-tweet form").on("submit", function(event){
      event.preventDefault();

      // TODO: refactor to "postTweet". Feature
      $.ajax({
        url: 'tweets',
        method: 'POST',
        data: $(this).serialize()
      })
      .done(function() {
        console.log("Successfully submitted tweet.")
      });
    });
  }

  loadTweets();
  submitTweet();
});