IntercomSettings = {
  // default, override
  minimumUserInfo: function(user) {
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
}

// store this in a session variable so it survivces HCR
var booted = Session.get('booted') || false;

// send data to intercom
Meteor.startup(function() {
  Deps.autorun(function() {
    var user = Meteor.user();
    if (!user) // "log out"
      return Intercom('shutdown');
  
    var info;
    if (IntercomSettings.userInfo)
      info = IntercomSettings.userInfo(user);
    else
      info = IntercomSettings.minimumUserInfo(user);
    
    if (info) {
      // console.log('Sending data to intercom', info);
      
      Session.set('booted', booted = true);
      Intercom(booted ? 'boot' : 'update', info);
    }
  });
})
