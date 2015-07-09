Meteor.subscribe('currentUserIntercomHash');

var minimumUserInfo = function(user) {
  var info = {
    app_id: Meteor.settings.public.intercom.id
  }

  if (user)
    _.extend(info, {
      user_id: user._id,
      created_at: Math.round(user.createdAt/1000),
      user_hash: user.intercomHash
    });

  return info;
}

IntercomSettings = {
  // if you want to manually call it
  minimumUserInfo: minimumUserInfo
}

var booted = false;

// send data to intercom
Meteor.startup(function() {
  if (Meteor.settings && Meteor.settings.public &&
      Meteor.settings.public.intercom && Meteor.settings.public.intercom.id) {
    Tracker.autorun(function() {
      var user = Meteor.user();

      var info = IntercomSettings.minimumUserInfo(user);
      var ready;

      if (!user) {
        if (Meteor.settings.public.intercom.allowAnonymous === true) { //typesafe check
          if (IntercomSettings.anonymousInfo) {
            ready = IntercomSettings.anonymousInfo(info);
            if (ready === false)
              return;
          }
        } else {
          booted = false;
          console.log('shutdown')
          return Intercom('shutdown');
        }
      }

      else {
        if (IntercomSettings.userInfo) {
          ready = IntercomSettings.userInfo(user, info);
          if (ready === false)
            return;
        }
      }

      if (info) {
        var type = booted ? 'update': 'boot';

        console.log(type, info)
        console.log(Intercom(type, info));

        booted = true;
      }
    });
  };
})
