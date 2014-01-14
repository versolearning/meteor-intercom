Meteor.subscribe('intercomHash');

var minimumUserInfo = function(user) {
  var info = {
    app_id: Meteor.settings.public.intercom.id,
    
    user_id: user._id,
    
    created_at: Math.round(Meteor.user().createdAt/1000)
  }
  
  // they actually need to have this but it can be useful for testing
  if (user.intercomHash)
    info.user_hash = user.intercomHash;
  
  return info;
}



IntercomSettings = {
  // if you want to manually call it
  minimumUserInfo: minimumUserInfo
}

var booted = false;

// send data to intercom
Meteor.startup(function() {
  Deps.autorun(function() {
    var user = Meteor.user();
    if (!user) // "log out"
      return Intercom('shutdown');
  
    var info = IntercomSettings.minimumUserInfo(user);
    if (IntercomSettings.userInfo)
      IntercomSettings.userInfo(user, info);
    
    if (info) {
      var type = booted ? 'update': 'boot';
      
      Intercom(type, info);
      
      booted = true;
    }
  });
})
