import * as mongoose from 'mongoose';

export default () => {
  let $PhoneType = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  }, {
    collection: 'phonetypes',
    autoIndex: process.env.NODE_ENV !== 'production',
  });


  $PhoneType.index({
    name: 1,
  }, {
    sparse: 1,
    unique: 1,
  });

  return $PhoneType;
};
