import * as mongoose from 'mongoose';

export default () => {
  let $SocialNetworkType = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  }, {
    collection: 'socialnetworktypes',
    autoIndex: process.env.NODE_ENV !== 'production',
  });


  $SocialNetworkType.index({
    name: 1,
  }, {
    sparse: 1,
    unique: 1,
  });

  return $SocialNetworkType;
};
