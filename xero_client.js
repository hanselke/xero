import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { Random } from 'meteor/random';
import { Oauth } from 'meteor/oauth';

const Xero = {};
// Request xero credentials for the user
// @param options {optional}  XXX support options.requestPermissions
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Xero.requestCredential = function(opts, callback) {
  // support both (options, callback) and (callback).
  let options = opts;
  let credentialRequestCompleteCallback = callback;
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  const config = ServiceConfiguration.configurations.findOne({
    service: 'xero',
  });

  if (!config) {
    if (credentialRequestCompleteCallback) {
      const error = new ServiceConfiguration.ConfigError('Service not configured');
      credentialRequestCompleteCallback(error);
    }
    return;
  }

  const credentialToken = Random.id();
  const loginStyle = Oauth._loginStyle('xero', config, options);

  const callbackUrl = Meteor.absoluteUrl('_oauth/xero?close');


  const loginUrl = `/_oauth/xero/?requestTokenAndRedirect=${encodeURIComponent(callbackUrl)}` +
    `&state=${Oauth._stateParam(loginStyle, credentialToken)}}`;

  Oauth.launchLogin({
    loginService: 'xero',
    loginStyle,
    loginUrl,
    credentialRequestCompleteCallback,
    credentialToken,
  });
};

export {
  Xero,
};
