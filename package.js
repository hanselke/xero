/* global Package Npm */

// based on code from https://github.com/axwaxw/xero
Package.describe({
  summary: 'Xero API',
  version: '0.1.1',
  name: 'andylash:xero',
  git: 'https://github.com/Opstarts/xero.git',
});


Package.on_use(function(api) {
  api.use('templating', 'client');
  api.use('oauth1', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('ecmascript', ['client', 'server']);
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.add_files(['xero_configure.html', 'xero_configure.js'], 'client');

  api.mainModule('xero_server.js', 'server');
  api.mainModule('xero_client.js', 'client');
});
