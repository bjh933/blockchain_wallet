import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { HTTP } from 'meteor/http';
import './main.html';

Wallets = new Mongo.Collection('Wallets');
var client = new CoinStack('c7dbfacbdf1510889b38c01b8440b1',
'10e88e9904f29c98356fd2d12b26de', 'testchain.blocko.io', 'https');
console.log(client);

Template.walletlist.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.body.helpers({
  isDetail() {
    return Session.get('isDetail');
  },

  mypic() {
    return Meteor.user().profile.thumbnail_image;
  }

});

Template.walletlist.helpers({
  wallets() {
    return Wallets.find();
  },
});


Template.walletlist.events({
  'click button'(event, instance) {
  var dbParam = {};

  var label = prompt("Please enter your name", "지갑 이름을 입력하세요.");

  dbParam.label = label;
  dbParam.privkey = CoinStack.ECKey.createKey();
  dbParam._id = CoinStack.ECKey.deriveAddress(dbParam.privkey);

  Meteor.call('createWallet', dbParam, function(error, result) {
    if(error) alert(error);
    });
  },
  'click div[name=wallet]': function(e, i) {
    var address = $(e.currentTarget).attr('address');
    Session.set('address', address);
    Session.set('isDetail', true);
  }
});

Template.walletdetail.onRendered(function () {
    $('#qrcode').qrcode({
      size: 200,
      text: 'bitcoin:' + Session.get('address')
    });
  });


Template.walletdetail.helpers({
  'address' : function() {
    return Session.get('address');
  }
});
