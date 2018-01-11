import * as mongoose from 'mongoose';

export default () => {
  let $SocialNetwork = new mongoose.Schema({
    account: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    type: {
      type: String,
    },
    person: {
      type: mongoose.Schema.Types.ObjectId,
    },
  }, {
    collection: 'socialnetworks',
    autoIndex: process.env.NODE_ENV !== 'production',
  });


  $SocialNetwork.index({
    account: 1,
  }, {
    sparse: 1,
    unique: 1,
  });

  $SocialNetwork.index({
    url: 1,
  }, {
    sparse: 1,
  });

  $SocialNetwork.index({
    type: 1,
  }, {
    sparse: 1,
  });

  $SocialNetwork.index({
    person: 1,
  }, {
    sparse: 1,
  });

  return $SocialNetwork;
};
