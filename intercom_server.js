// Generate an intercomHash for secure mode as outlined at
// https://segment.io/docs/integrations/intercom/#secure-mode
var crypto = Npm.require('crypto');
var Intercom = Npm.require('intercom-client');

IntercomClient = function IntercomClient() {
  //support for Personal Access token:
  const pat = Meteor._get(Meteor, 'settings', 'intercom', 'personalAccessToken');

  //api
  const id = Meteor._get(Meteor, 'settings', 'public', 'intercom', 'id');
  const apikey = Meteor._get(Meteor, 'settings', 'intercom', 'apikey');

  //priority
  if (pat) {
    return new Intercom.Client({ token: pat });
  }

  if (id && apikey) {
    return new Intercom.Client(id, apikey);
  }

  return console.warn(`
    You must set Meteor.settings.intercom.personalAccessToken
    or add Meteor.settings.public.intercom.id
    and Meteor.settings.intercom.apikey to use IntercomClient
  `);
};

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
