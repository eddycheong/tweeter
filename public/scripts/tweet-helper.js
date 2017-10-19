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
