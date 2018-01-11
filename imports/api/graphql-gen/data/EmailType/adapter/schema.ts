import * as mongoose from 'mongoose';

export default () => {
  let $EmailType = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  }, {
    collection: 'emailtypes',
    autoIndex: process.env.NODE_ENV !== 'production',
  });


  $EmailType.index({
    name: 1,
  }, {
    sparse: 1,
    unique: 1,
  });

  return $EmailType;
};
