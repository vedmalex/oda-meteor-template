import * as mongoose from 'mongoose';

export default () => {
  let $Phone = new mongoose.Schema({
    phoneNumber: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    person: {
      type: mongoose.Schema.Types.ObjectId,
    },
  }, {
    collection: 'phones',
    autoIndex: process.env.NODE_ENV !== 'production',
  });


  $Phone.index({
    phoneNumber: 1,
  }, {
    sparse: 1,
    unique: 1,
  });

  $Phone.index({
    type: 1,
  }, {
    sparse: 1,
  });

  $Phone.index({
    person: 1,
  }, {
    sparse: 1,
  });

  return $Phone;
};
