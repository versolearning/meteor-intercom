# Meteor Intercom

A package to use [Intercom.io](http://intercom.io) easily with Meteor.

## Installation

Intercom can be installed with Meteor's package manager:

``` sh
$ meteor add percolate:intercom
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

If you need to wait on a user subscription for e.g. the hash to come down, you can return `false` in your `userInfo` function to tell the package to wait.

## Notes

If you want to use Intercom's secure mode (you do), you need to add a `intercomHash` property to your user objects. To make new users get such a property, you can do something like:

```js
Accounts.onCreateUser(function(options, user) {
  user.intercomHash = IntercomHash(user);

  if (options.profile)
    user.profile = options.profile;

  return user;
});  
```

If you need to update your existing users, you could use [Meteor Migrations](https://github.com/percolatestudio/meteor-migrations).


## License 

MIT. (c) Percolate Studio

Meteor Intercom was developed as part of the [Verso](http://versoapp.com) project.
