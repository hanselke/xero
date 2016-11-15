/* global Package Npm */

// based on code from https://github.com/axwaxw/xero
Package.describe({
  summary: 'Xero API',
  version: '0.1.2',
  name: 'andylash:xero',
  git: 'https://github.com/Opstarts/xero.git',
  documentation: null,
});


Package.on_use(function(api) {
  api.use('templating@1.2.14', 'client');
  api.use('oauth1@1.1.10', ['client', 'server']);
  api.use('oauth@1.1.11', ['client', 'server']);
  api.use('ecmascript@0.5.8', ['client', 'server']);
  api.use('random@1.0.10', 'client');
  api.use('service-configuration@1.0.10', ['client', 'server']);

  api.add_files(['xero_configure.html', 'xero_configure.js'], 'client');

  api.mainModule('xero_server.js', 'server');
  api.mainModule('xero_client.js', 'client');
});
