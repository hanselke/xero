import { Oauth } from 'meteor/oauth';
import OAuth from 'oauth';
import _ from 'lodash';

const XERO_BASE_URL = 'https://api.xero.com';
const XERO_API_URL = `${XERO_BASE_URL}/api.xro/2.0`;


class Xero {
  constructor(consumerKey, secret, token, tokenSecret, debug) {
    this.oauth = new OAuth.OAuth(null, null, consumerKey, secret, '1.0',
      null, 'HMAC-SHA1', null, { Accept: 'application/json' });
    this.oauth.accessToken = token;
    this.oauth.accessTokenSecret = tokenSecret;
    this.debug = debug;
  }

  _debug(method, ...args) {
    if (this.debug) {
      console[method](...args);  // eslint-disable-line no-console
    }
  }

  call(_method, path, callback) {
    const process = (err, response) => {
      if (err) {
        this._debug('error', 'Xero returned error', err);
        return callback(err);
      }

      const json = JSON.parse(response);
      if (_.isEmpty(json)) {
        this._debug('log', `Xero response is ${JSON.stringify(response)}`);
      } else {
        this._debug('log', `Xero response is ${JSON.stringify(json)}`);
      }
      return callback(null, json, response);
    };
    const url = `${XERO_API_URL}${path}`;
    this._debug('log', `Calling Xero at ${url}`);

    const method = _method.toLowerCase();
    return this.oauth[method](url, this.oauth.accessToken, this.oauth.accessTokenSecret,
      process);
  }


  get(path, callback) {
    return this.call('GET', path, callback);
  }

  post(path, callback) {
    return this.call('POST', path, callback);
  }

  static retrieveCredential(credentialToken) {
    return Oauth.retrieveCredential(credentialToken);
  }

}

const urls = {
  requestToken: 'https://api.xero.com/oauth/RequestToken',
  authorize: 'https://api.xero.com/oauth/Authorize',
  accessToken: 'https://api.xero.com/oauth/AccessToken',
  authenticate: 'https://api.xero.com/oauth/Authorize',
};

Oauth.registerService('xero', 1, urls, function(oauthBinding) {
  const serviceData = {
    id: 'xero',
    name: 'xero',
    accessToken: Oauth.sealSecret(oauthBinding.accessToken),
    accessTokenSecret: Oauth.sealSecret(oauthBinding.accessTokenSecret),
  };

  return {
    serviceData,
  };
});

export {
  Xero,
};

