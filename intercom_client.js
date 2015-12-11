// We *must* have the intercom id set otherwise the intercom loader script throws
// exceptions. Warn people about this.
Meteor.startup(function() {
  if (! Meteor._get(Meteor, 'settings', 'public', 'intercom', 'id')) {
    console.warn("You must set Meteor.settings.public.intercom.id to use percolate:intercom");
  }
});

Meteor.subscribe('currentUserIntercomHash');

var minimumUserInfo = function(user) {
  var info = {
    app_id: Meteor._get(Meteor, 'settings', 'public', 'intercom', 'id')
  };

  if (user)
    _.extend(info, {
      user_id: user._id,
      created_at: Math.round(user.createdAt/1000),
      user_hash: user.intercomHash
    });

  return info;
};

IntercomSettings = {
  // if you want to manually call it
  minimumUserInfo: minimumUserInfo
};

var booted = false;

// send data to intercom
Meteor.startup(function() {
  Tracker.autorun(function() {
    var user = Meteor.user();

    var info = IntercomSettings.minimumUserInfo(user);
    var ready;

    if (!user) {
      if (Meteor._get(Meteor, 'settings', 'public', 'intercom', 'allowAnonymous') === true) {
        if (IntercomSettings.anonymousInfo) {
          ready = IntercomSettings.anonymousInfo(info);
          if (ready === false)
            return;
        }
      } else {
        // console.log('shutdown')
        booted = false;
        return Intercom('shutdown');
      }
    } else {
      if (IntercomSettings.userInfo) {
        ready = IntercomSettings.userInfo(user, info);
        if (ready === false)
          return;
      }
    }

    if (info) {
      var type = booted ? 'update' : 'boot';

      // console.log(type, info)
      Intercom(type, info);
      booted = true;
    }
  });
});
