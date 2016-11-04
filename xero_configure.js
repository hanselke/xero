import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';


Template.configureLoginServiceDialogForXero.siteUrl = function() {
  return Meteor.absoluteUrl;
};

Template.configureLoginServiceDialogForXero.fields = function() {
  return [
    {
      property: 'consumerKey',
      label: 'Consumer Key',
    }, {
      property: 'secret',
      label: 'Consumer Secret',
    },
  ];
};
