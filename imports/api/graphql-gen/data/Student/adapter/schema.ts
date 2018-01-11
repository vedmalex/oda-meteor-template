import * as mongoose from 'mongoose';

export default () => {
  let $Student = new mongoose.Schema({
    person: {
      type: mongoose.Schema.Types.ObjectId,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
    },
  }, {
    collection: 'students',
    autoIndex: process.env.NODE_ENV !== 'production',
  });


  $Student.index({
    person: 1,
  }, {
    sparse: 1,
  });

  $Student.index({
    group: 1,
  }, {
    sparse: 1,
  });

  return $Student;
};
