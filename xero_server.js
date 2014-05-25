xero = {};

urls = { 
  requestToken: "https://api.xero.com/oauth/RequestToken",
  authorize: "https://api.xero.com/oauth/Authorize",
  accessToken: "https://api.xero.com/oauth/AccessToken",
  authenticate: "https://api.xero.com/oauth/Authorize"
};

xero.whitelistedFields = ['name'];

Oauth.registerService('xero', 1, urls, function(oauthBinding) {
  
  // The ServiceData below is hard-coded.
  // This is because the Xero API does not return the current user.
  // It would probably be batter to return the orgasnisation id / name from the organisation end point:
  // URLhttps://api.xero.com/api.xro/2.0/organisation

  var serviceData = {    
    id: 'xero',
    name: 'xero',
    accessToken: oauthBinding.accessToken,
    accessTokenSecret: oauthBinding.accessTokenSecret
  };

  return {
    serviceData: serviceData
  };
});


xero.retrieveCredential = function(credentialToken) {
  return Oauth.retrieveCredential(credentialToken);
};
