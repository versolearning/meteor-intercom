Package.describe({
  summary: "Basic intercom integration"
});

Package.on_use(function (api, where) {
  api.use('session', 'client');
  api.add_files('intercom_server.js', 'server');
  api.add_files(['intercom_loader.js', 'intercom_client.js'], 'client');
  
  api.export('IntercomSettings');
  api.export('IntercomHash', 'server');
});