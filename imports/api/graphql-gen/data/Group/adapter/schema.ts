import * as mongoose from 'mongoose';

export default () => {
  let $Group = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    curator: {
      type: mongoose.Schema.Types.ObjectId,
    },
  }, {
    collection: 'groups',
    autoIndex: process.env.NODE_ENV !== 'production',
  });


  $Group.index({
    name: 1,
  }, {
    sparse: 1,
    unique: 1,
  });

  $Group.index({
    curator: 1,
  }, {
    sparse: 1,
  });

  return $Group;
};
