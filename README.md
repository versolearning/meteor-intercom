# Meteor Intercom

This is a fork of the [perculate:intercom](https://github.com/percolatestudio/meteor-intercom) package, where the e-mailaddress of the user is used to identify the user in intercom. This is useful when multiple apps are sending data to the same intercom application, as each user has a unique Meteor userId, but if they log in with oauth, you also know their verified e-mailaddress.

## Installation

Intercom can be installed with Meteor's package manager:

``` sh
$ meteor add q42:intercom-oauthid
```

## API

Ensure you have `Meteor.settings.intercom.secret` and `Meteor.settings.public.intercom.id` defined to the values provided to you by Intercom. Also define `Meteor.settings.public.intercom.apikey` if you intend to use Intercom on the server side.

Some Intercom subscription packages allow for anonymous users.  To enable the use of anonymous users, set `Meteor.settings.public.intercom.allowAnonymous` to `true`.

By default, the package will send up the user's id, creation date, and hash (if defined, see below). To send custom data, set:

```js
IntercomSettings.userInfo = function(user, info) {
  // add properties to the info object, for instance:
  if (user.services.google) {
    info.email = user.services.google.email;
    info['name'] = user.services.google.given_name + ' ' + user.services.google.family_name;
  }
}
```

`email` and `name` are preset fields provided by Intercom. You may add any additional custom user attribute.

If you need to wait on a user subscription for e.g. the hash to come down, you can return `false` in your `userInfo` function to tell the package to wait.

```js
IntercomSettings.userInfo = function (user, info) {
  if (!user.intercomHash) {
    return false; // the hash isn't loaded to the users collection yet. come back later.
  }
  // ...
}
```

If you want to add fields sent to intercom for an anonymous user, you can add them through in the `anonymousInfo` function.

```js
IntercomSettings.anonymousInfo = function ( info ) {
  // check all router subscriptions have loaded
  if (!Router.current() || !Router.current().ready())
    return false;

  info.anonymous = true;
  return;
};
```

On the server, you can also interact with the Intercom API via the official [intercom-node client](https://github.com/intercom/intercom-node).
```js
// Create an event for a user
IntercomClient.events.create({
  event_name: 'Test event',
  created_at: Math.floor(new Date().getTime()/1000),
  user_id: '<Insert user e-mail address>'
}, function (d) {
  console.log(d);
});
```

## Notes

This package will automatically subscribe the current user to the `currentUserIntercomHash` publication which will add an `intercomHash` property to your user documents enabling the use of intercom's secure mode.
