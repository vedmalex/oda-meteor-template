import * as _ from 'lodash';
import User from './User';
import Student from './Student';
import Curator from './Curator';
import Group from './Group';
import Person from './Person';
import SocialNetwork from './SocialNetwork';
import SocialNetworkType from './SocialNetworkType';
import Email from './Email';
import EmailType from './EmailType';
import Phone from './Phone';
import PhoneType from './PhoneType';

const result = _.merge (
    User,
    Student,
    Curator,
    Group,
    Person,
    SocialNetwork,
    SocialNetworkType,
    Email,
    EmailType,
    Phone,
    PhoneType,
)

export default {
  ...result
};
