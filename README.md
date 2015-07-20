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
    info['name'] = user.services.google.given_name + ' ' + user.services.google.family_name;
  }
}
```

`email` and `name` are preset fields provided by Intercom. You may add any additional custom user attribute.

If you need to wait on a user subscription for e.g. the hash to come down, you can return `false` in your `userInfo` function to tell the package to wait.

## Notes

This package will automatically subscribe the current user to the `currentUserIntercomHash` publication which will add an `intercomHash` property to your user documents enabling the use of intercom's secure mode. 

## License 

MIT. (c) Percolate Studio, maintained by Tom Coleman (@tmeasday)

Meteor Intercom was developed as part of the [Verso](http://versoapp.com) project.
