var path = require('path');
const { generator } = require('oda-gen-graphql');
const schema = require('./../../api-new-ui-gen/dist/schema').default;
const {
  UserUI,
  PersonUI,
  MeetingUI,
  CuratorUI,
  StudentUI,
  EmailUI,
  StudentAttendanceUI,
  SubjectCourseUI,
} = require('./ui-hooks');

generator({
  hooks: [
    UserUI,
    PersonUI,
    MeetingUI,
    CuratorUI,
    StudentUI,
    EmailUI,
    StudentAttendanceUI,
    SubjectCourseUI,
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
