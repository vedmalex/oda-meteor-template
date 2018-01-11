import * as mongoose from 'mongoose';

export default () => {
  let $User = new mongoose.Schema({
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
    },
    isSystem: {
      type: Boolean,
    },
    enabled: {
      type: Boolean,
    },
  }, {
    collection: 'users',
    autoIndex: process.env.NODE_ENV !== 'production',
  });


  $User.index({
    userName: 1,
  }, {
    sparse: 1,
    unique: 1,
  });

  return $User;
};
