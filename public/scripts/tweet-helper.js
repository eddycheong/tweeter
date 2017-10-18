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
