xero = {};

urls = {
  //requestToken: "http://requestb.in/1l86m7i1",
  requestToken: "https://api.xero.com/oauth/RequestToken",
  authorize: "https://www.xero.com/oauth/Authorize",
  accessToken: "https://api.xero.com/oauth/AccessToken",
  //authenticate: "https://www.xero.com/oauth/authenticate"
};


xero.whitelistedFields = ['id', 'displayName'];

Oauth.registerService('xero', 1, urls, function (oauthBinding) {
  var identity = oauthBinding.get('https://api.xero.com/api.xro/json').data;

  var serviceData = {
    id: identity.UserID,
    FIrstName: identity.FirstName,
    accessToken: oauthBinding.accessToken,
    accessTokenSecret: oauthBinding.accessTokenSecret
  };

  var profile = identity.user; //add all xero profile data
  profile["first_name"] = identity.FirstName; //add name to see in default login buttons

  // include helpful fields from xero
  var fields = _.pick(identity, xero.whitelistedFields);
  _.extend(serviceData, fields);

  return {
    serviceData: serviceData,
    options: {
      profile: profile
    }
  };
});


xero.retrieveCredential = function (credentialToken) {
  return Oauth.retrieveCredential(credentialToken);
};