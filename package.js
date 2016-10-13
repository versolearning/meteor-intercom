Package.describe({
  name: 'verso:intercom',
  summary: "Intercom.io basic integration (uses 'widget' snippet)",
  version: '1.4.0',
  git: 'https://github.com/versolearning/meteor-intercom.git'
});

Npm.depends({ 'intercom-client': '2.8.3' });

Package.onUse(function(api) {
  if (api.versionsFrom)
    api.versionsFrom('1.3');

  api.use(['underscore', 'accounts-base', 'ecmascript']);
  api.use(['session', 'tracker'], 'client');

  api.add_files('intercom_server.js', 'server');
  api.add_files(['intercom_loader.js', 'intercom_client.js'], 'client');

  api.export('IntercomSettings');
  api.export('IntercomHash', 'server');
  api.export('IntercomClient', 'server');
});
