import * as mongoose from 'mongoose';

export default () => {
  let $Curator = new mongoose.Schema({
    person: {
      type: mongoose.Schema.Types.ObjectId,
    },
  }, {
    collection: 'curators',
    autoIndex: process.env.NODE_ENV !== 'production',
  });


  $Curator.index({
    person: 1,
  }, {
    sparse: 1,
  });

  return $Curator;
};
