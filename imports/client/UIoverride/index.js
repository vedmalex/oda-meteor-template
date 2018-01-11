import PersonUIX from './Person/uix';
// import CuratorUIX from './Curator/uix';
import StudentUIX from './Student/uix';
import GroupUIX from './Group/uix';
import MeetingUIX from './Meeting/uix';
import Admin from './admin';
import { uix as _uix, Resources as ResourcesBase } from './../UI/system';
import personResource from './Person/queries';
// import curatorResource from './Curator/queries';
import studentResource from './Student/queries';
// import groupResource from './Group/queries';
import meetingResource from './Meeting/queries';

export { Admin };
// export { uix };

export const uix = {
  ..._uix,

  Person: {
    ..._uix.Person,
    ...PersonUIX,
  },
  // Curator: {
  //   ..._uix.Curator,
  //   ...CuratorUIX,
  // },
  Student: {
    ..._uix.Student,
    ...StudentUIX,
  },
  // Group: {
  //   ..._uix.Group,
  //   ...GroupUIX,
  // },
  Meeting: {
    ..._uix.Meeting,
    ...MeetingUIX,
  }
}

export class Resources extends ResourcesBase {
  constructor(...args) {
    super(...args);
    this.resource('Person').override(personResource);
    // this.resource('Curator').override(curatorResource);
    this.resource('Student').override(studentResource);
    // this.resource('Group').override(groupResource);
    this.resource('Meeting').override(meetingResource);
  }
}

