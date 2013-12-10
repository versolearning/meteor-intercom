var crypto = Npm.require('crypto');

IntercomHash =  function(user) {
  var secret = new Buffer(Meteor.settings.intercom.secret, 'utf8')
  return crypto.createHmac('sha256', secret)
    .update(user._id).digest('hex');
}