/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() {

  // Fake data taken from tweets.json
  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    },
    {"user":{"name":"Ina Robinson","handle":"@DrRobinson","avatars":{"small":"https://vanillicon.com/231ef83609cefcce9e620c7ac80cd653_50.png","regular":"https://vanillicon.com/231ef83609cefcce9e620c7ac80cd653.png","large":"https://vanillicon.com/231ef83609cefcce9e620c7ac80cd653_200.png"}},"content":{"text":"<script>alert('uh oh!');</script>\r\n"},"created_at":1508292201916}
  ];

  function daysSince(date) {
      var DAY_IN_MS = 1000 * 60 * 60 * 24

      // Calculate the difference in milliseconds
      var difference = Math.abs(Date.now() - date)

      // Convert back to days and return
      return Math.round(difference/DAY_IN_MS)
  }

  function renderTweets(tweets) {
    $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty();

    tweets.forEach((tweet) => {
      $tweet = createTweetElement(tweet);
      $tweetsContainer.append($tweet);
    });
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

  renderTweets(data);
});