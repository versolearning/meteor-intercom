// Generate an intercomHash for secure mode as outlined at
// https://segment.io/docs/integrations/intercom/#secure-mode
var crypto = Npm.require('crypto');
var Intercom = Npm.require('intercom-client');

if (Meteor.settings
  && Meteor.settings.public.intercom
  && Meteor.settings.public.intercom.id
  && Meteor.settings.intercom.apikey) {
  IntercomClient = new Intercom.Client(Meteor.settings.public.intercom.id, Meteor.settings.intercom.apikey);
}

// returns undefined if there is no secret
IntercomHash = function(userId) {
  var secret = Meteor.settings &&
      Meteor.settings.intercom && Meteor.settings.intercom.secret;

  if (secret) {
    return crypto.createHmac('sha256', new Buffer(secret, 'utf8'))
      .update(userId).digest('hex');
  }
};

Meteor.publish('currentUserIntercomHash', function() {
  if (this.userId) {
    var intercomHash = IntercomHash(this.userId);

    if (intercomHash)
      this.added("users", this.userId, {intercomHash: intercomHash});
  }
  this.ready();
});
