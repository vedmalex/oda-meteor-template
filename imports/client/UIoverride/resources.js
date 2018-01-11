import React from 'react';
import merge from 'lodash/merge';

import ListIcon from 'material-ui/svg-icons/action/view-list';
import Mail from 'material-ui/svg-icons/communication/contact-mail';
import Phone from 'material-ui/svg-icons/communication/contact-phone';
import Contacts from 'material-ui/svg-icons/communication/contacts';
import People from 'material-ui/svg-icons/social/people';
import Group from 'material-ui/svg-icons/social/group';
import Pages from 'material-ui/svg-icons/social/pages';
import School from 'material-ui/svg-icons/social/school';
import Library from 'material-ui/svg-icons/av/library-books';
import Account from 'material-ui/svg-icons/action/account-box';

import resources from '../UI/system/resources';

export default merge(
  {},
  resources,
  {
    'User': { icon: <Account /> },
    'Student': { icon: <People /> },
    'Curator': { icon: <School /> },
    'Group': { icon: <Group /> },
    'Person': { icon: <Contacts /> },
    'SocialNetwork': { visible: false },
    'SocialNetworkType': { icon: <Pages /> },
    'Email': { visible: false },
    'EmailType': { icon: <Mail /> },
    'Phone': { visible: false },
    'PhoneType': { icon: <Phone /> },
  }
);