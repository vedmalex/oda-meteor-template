import * as mongoose from 'mongoose';

export default () => {
  let $Email = new mongoose.Schema({
    email: {
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
    collection: 'emails',
    autoIndex: process.env.NODE_ENV !== 'production',
  });


  $Email.index({
    email: 1,
  }, {
    sparse: 1,
    unique: 1,
  });

  $Email.index({
    type: 1,
  }, {
    sparse: 1,
  });

  $Email.index({
    person: 1,
  }, {
    sparse: 1,
  });

  return $Email;
};
