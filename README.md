# Meteor Intercom

A package to use [intercom.io](http://intercom.io) easily with Meteor.

## Installation

Intercom can be installed with [Meteorite](https://github.com/oortcloud/meteorite/). From inside a Meteorite-managed app:

``` sh
$ mrt add intercom
```

## API

Ensure you have `Meteor.settings.intercom.secret` and `Meteor.settings.public.intercom.id` defined to the values provided to you by Intercom.

By default, the package will send up the user's id, creation date, and hash (if defined, see below). To send custom data, set:

```js
IntercomSettings.userInfo = function(user, info) {
  // add properties to the info object, for instance:
  if (user.services.google) {
    info.email = user.services.google.email;
    info['Name'] = user.services.google.given_name + ' ' + user.services.google.family_name;
  }
}
```

## Notes

If you want to use Intercom's secure mode (you do), you need to add a `intercomHash` property to your user objects. To make new users get such a property, you can do something like

```js
Accounts.onCreateUser(function(options, user) {
  user.intercomHash = IntercomHash(user);

  if (options.profile)
    user.profile = options.profile;

  return user;
});  
```

## License 

MIT. (c) Percolate Studio

Meteor Intercom was developed as part of the [Verso](http://versoapp.com) project.