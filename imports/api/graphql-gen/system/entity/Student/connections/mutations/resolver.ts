import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Student');

import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

export const mutation = {
  addToStudentBelongsToPerson: mutateAndGetPayload(
    async (
      args: {
        student?: string,
        person?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToStudentBelongsToPerson');
      let { id: student } = fromGlobalId(args.student);
      let { id: person } = fromGlobalId(args.person);
      let payload = {
        student,
        person,
      };

      await context.connectors.Student.addToPerson(payload);

      let source = await context.connectors.Student.findOneById(student);

      if (context.pubsub) {
        context.pubsub.publish('Student', {
          Student: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                student: args.student,
                person: args.person,
              },
              relation: 'person'
            }
          }
        });
      
        let dest = await context.connectors.Person.findOneById(person);

        context.pubsub.publish('Person', {
          Person: {
            mutation: 'LINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                student: args.student,
                person: args.person,
              },
              relation: 'asStudents'
            }
          }
        });
      

      return {
        student: source,
      };
      }
    }),

  removeFromStudentBelongsToPerson: mutateAndGetPayload(
    async (
      args: {
        student?: string,
        person?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromStudentBelongsToPerson');
      let { id: student } = fromGlobalId(args.student);
      let { id: person } = fromGlobalId(args.person);
      let payload = {
        student,
        person,
      };
      await context.connectors.Student.removeFromPerson(payload);

      let source = await context.connectors.Student.findOneById(student);

      if (context.pubsub) {
        context.pubsub.publish('Student', {
          Student: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                student: args.student,
                person: args.person,
              },
              relation: 'person'
            }
          }
        });

      
        let dest = await context.connectors.Person.findOneById(person);

        context.pubsub.publish('Person', {
          Person: {
            mutation: 'UNLINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                student: args.student,
                person: args.person,
              },
              relation: 'asStudents'
            }
          }
        });
      

      return {
        student: source,
      };
    }
  }),

  addToStudentBelongsToGroup: mutateAndGetPayload(
    async (
      args: {
        student?: string,
        group?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToStudentBelongsToGroup');
      let { id: student } = fromGlobalId(args.student);
      let { id: group } = fromGlobalId(args.group);
      let payload = {
        student,
        group,
      };

      await context.connectors.Student.addToGroup(payload);

      let source = await context.connectors.Student.findOneById(student);

      if (context.pubsub) {
        context.pubsub.publish('Student', {
          Student: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                student: args.student,
                group: args.group,
              },
              relation: 'group'
            }
          }
        });
      
        let dest = await context.connectors.Group.findOneById(group);

        context.pubsub.publish('Group', {
          Group: {
            mutation: 'LINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                student: args.student,
                group: args.group,
              },
              relation: 'students'
            }
          }
        });
      

      return {
        student: source,
      };
      }
    }),

  removeFromStudentBelongsToGroup: mutateAndGetPayload(
    async (
      args: {
        student?: string,
        group?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromStudentBelongsToGroup');
      let { id: student } = fromGlobalId(args.student);
      let { id: group } = fromGlobalId(args.group);
      let payload = {
        student,
        group,
      };
      await context.connectors.Student.removeFromGroup(payload);

      let source = await context.connectors.Student.findOneById(student);

      if (context.pubsub) {
        context.pubsub.publish('Student', {
          Student: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                student: args.student,
                group: args.group,
              },
              relation: 'group'
            }
          }
        });

      
        let dest = await context.connectors.Group.findOneById(group);

        context.pubsub.publish('Group', {
          Group: {
            mutation: 'UNLINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                student: args.student,
                group: args.group,
              },
              relation: 'students'
            }
          }
        });
      

      return {
        student: source,
      };
    }
  }),

};
