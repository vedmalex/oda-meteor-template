import merge from 'lodash/merge';

import translationEn from '../../../UI/system/i18n';
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
import Meeting from './Meeting';
import StudentAttendance from './StudentAttendance';

const messages = {
  uix: {
    "filter": {
      "search": "Поиск",
      "exists": "%{name} существует",
      "eq": "%{name} =",
      "ne": "%{name} !=",
      "lte": "%{name} <=",
      "gte": "%{name} >=",
      "lt": "%{name} <",
      "gt": "%{name} >",
      "imatch": "%{name}",
      "in": "%{name} в списке",
      "nin": "%{name} не в списке",
    },
    "actionType": {
      "CREATE": "Создать",
      "UPDATE": "Обновить текущий",
      "CLONE": "Скопировать",
      "USE": "Использовать текущий",
      "UNLINK": "отсоединить",
      "ExpectedTo": "Действие"
    }
  }
}

export default
  merge(
    translationEn,
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
    Meeting,
    StudentAttendance
  )
