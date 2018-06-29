import { Meteor } from 'meteor/meteor';

//client = new CoinStack('','', 'testchain.blocko.io');
Wallets = new Mongo.Collection('Wallets');


Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({


'createWallet' : function(dbParam){

  if(!dbParam.label) {
    throw new Meteor.Error('Label is empty.');
  }

  dbParam.createAt = new Date();
  console.log(dbParam);
  Wallets.insert(dbParam);

  return true;
}

});
