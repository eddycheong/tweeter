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
