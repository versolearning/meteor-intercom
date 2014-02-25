var crypto = require('crypto');

var userId = process.argv.pop();
var secretKey = process.argv.pop();

if (! secretKey || ! userId) {
  return console.log("USAGE: node check_hash.js SECRET USER_ID");
}

console.log(secretKey, userId)

var hash = crypto.createHmac('sha256', secretKey)
  .update(userId.toString()).digest('hex');


console.log('The intercom hash for userId ' + userId + ' is ' + hash);