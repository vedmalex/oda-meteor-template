import * as mongoose from 'mongoose';

export default () => {
  let $Person = new mongoose.Schema({
    spiritualName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    specialNotes: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
  }, {
    collection: 'people',
    autoIndex: process.env.NODE_ENV !== 'production',
  });


  $Person.index({
    spiritualName: 1,
  }, {
    sparse: 1,
    unique: 1,
  });

  $Person.index({
    fullName: 1,
  }, {
    sparse: 1,
    unique: 1,
  });

  $Person.index({
    user: 1,
  }, {
    sparse: 1,
  });

  $Person.index({
    specialNotes: 1,
  }, {
    sparse: 1,
  });

  return $Person;
};
