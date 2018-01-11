import merge from 'lodash/merge';

import UserTranslate from './User';
import StudentTranslate from './Student';
import CuratorTranslate from './Curator';
import GroupTranslate from './Group';
import PersonTranslate from './Person';
import SocialNetworkTranslate from './SocialNetwork';
import SocialNetworkTypeTranslate from './SocialNetworkType';
import EmailTranslate from './Email';
import EmailTypeTranslate from './EmailType';
import PhoneTranslate from './Phone';
import PhoneTypeTranslate from './PhoneType';
import MeetingTranslate from './Meeting';
import StudentAttendanceTranslate from './StudentAttendance';
import CourseTranslate from './Course';
import SubjectTranslate from './Subject';
import SubjectCourseTranslate from './SubjectCourse';

const messages = {
  uix: {
    "filter": {
      "search": "Search",
      "exists": "%{name} exists",
      "eq": "%{name} =",
      "ne": "%{name} !=",
      "lte": "%{name} <=",
      "gte": "%{name} >=",
      "lt": "%{name} <",
      "gt": "%{name} >",
      "imatch": "%{name}",
      "in": "%{name} in",
      "nin": "%{name} not in",
    },
    "actionType": {
      "CREATE": "Create",
      "UPDATE": "Update Existing",
      "CLONE": "Copy Selected",
      "USE": "Use Existing",
      "UNLINK": "Unlink",
      "ExpectedTo": "Expected To"
    }
  }
}

export default
  merge(
    messages,
    UserTranslate,
    StudentTranslate,
    CuratorTranslate,
    GroupTranslate,
    PersonTranslate,
    SocialNetworkTranslate,
    SocialNetworkTypeTranslate,
    EmailTranslate,
    EmailTypeTranslate,
    PhoneTranslate,
    PhoneTypeTranslate,
    MeetingTranslate,
    StudentAttendanceTranslate,
    CourseTranslate,
    SubjectTranslate,
    SubjectCourseTranslate,
  )
