### NOTES

Ensure you have `Meteor.settings.intercom.secret` and `Meteor.settings.public.intercom.id`.

Ensure you add an `intercomHash` to user accounts, like so (or otherwise):

```js
Accounts.onCreateUser(function(options, user) {
  user.intercomHash = IntercomHash(user);

  if (options.profile)
    user.profile = options.profile;

  return user;
});  
```

Make sure you publish the `intercomHash` of the currently logged in user. XXX: this package could do this bit.