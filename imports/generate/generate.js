var path = require('path');
const { generator } = require('oda-gen-graphql');
const schema = require('./../../api-new-ui-gen/compiledModel.json');
const {
  UserUI,
  PersonUI,
  TeacherUI,
  StudentsGroupUI,
} = require('./ui-hooks');

generator({
  hooks: [
    UserUI,
    PersonUI,
  ],
  pack: schema,
  rootDir: path.join(__dirname, 'UI'),
  config: {
    ui: true,
    ts: false,
    graphql: false,
    schema: false,
    packages: ['system'],
  },
});
