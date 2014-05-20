Template.configureLoginServiceDialogForXero.siteUrl = function () {
  //TODO: Verify whether xero can recognize localhost as a domain name
  //return Meteor.absoluteUrl({replaceLocalhost: true});
};

Template.configureLoginServiceDialogForXero.fields = function () {
  return [
    //TODO: Fill in the labels field
    {
      property: 'consumerKey',
      label: 'Consumer Key'
    }, {
      property: 'secret',
      label: 'Consumer Secret'
    }
  ];
};