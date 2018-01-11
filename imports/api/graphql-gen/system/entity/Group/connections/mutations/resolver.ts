import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Group');

import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

export const mutation = {
  addToGroupHasManyStudents: mutateAndGetPayload(
    async (
      args: {
        group?: string,
        student?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToGroupHasManyStudents');
      let { id: group } = fromGlobalId(args.group);
      let { id: student } = fromGlobalId(args.student);
      let payload = {
        group,
        student,
      };

      await context.connectors.Group.addToStudents(payload);

      let source = await context.connectors.Group.findOneById(group);

      if (context.pubsub) {
        context.pubsub.publish('Group', {
          Group: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                group: args.group,
                student: args.student,
              },
              relation: 'students'
            }
          }
        });
      
        let dest = await context.connectors.Student.findOneById(student);

        context.pubsub.publish('Student', {
          Student: {
            mutation: 'LINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                group: args.group,
                student: args.student,
              },
              relation: 'group'
            }
          }
        });
      

      return {
        group: source,
      };
      }
    }),

  removeFromGroupHasManyStudents: mutateAndGetPayload(
    async (
      args: {
        group?: string,
        student?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromGroupHasManyStudents');
      let { id: group } = fromGlobalId(args.group);
      let { id: student } = fromGlobalId(args.student);
      let payload = {
        group,
        student,
      };
      await context.connectors.Group.removeFromStudents(payload);

      let source = await context.connectors.Group.findOneById(group);

      if (context.pubsub) {
        context.pubsub.publish('Group', {
          Group: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                group: args.group,
                student: args.student,
              },
              relation: 'students'
            }
          }
        });

      
        let dest = await context.connectors.Student.findOneById(student);

        context.pubsub.publish('Student', {
          Student: {
            mutation: 'UNLINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                group: args.group,
                student: args.student,
              },
              relation: 'group'
            }
          }
        });
      

      return {
        group: source,
      };
    }
  }),

  addToGroupBelongsToCurator: mutateAndGetPayload(
    async (
      args: {
        group?: string,
        curator?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToGroupBelongsToCurator');
      let { id: group } = fromGlobalId(args.group);
      let { id: curator } = fromGlobalId(args.curator);
      let payload = {
        group,
        curator,
      };

      await context.connectors.Group.addToCurator(payload);

      let source = await context.connectors.Group.findOneById(group);

      if (context.pubsub) {
        context.pubsub.publish('Group', {
          Group: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                group: args.group,
                curator: args.curator,
              },
              relation: 'curator'
            }
          }
        });
      
        let dest = await context.connectors.Curator.findOneById(curator);

        context.pubsub.publish('Curator', {
          Curator: {
            mutation: 'LINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                group: args.group,
                curator: args.curator,
              },
              relation: 'groups'
            }
          }
        });
      

      return {
        group: source,
      };
      }
    }),

  removeFromGroupBelongsToCurator: mutateAndGetPayload(
    async (
      args: {
        group?: string,
        curator?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromGroupBelongsToCurator');
      let { id: group } = fromGlobalId(args.group);
      let { id: curator } = fromGlobalId(args.curator);
      let payload = {
        group,
        curator,
      };
      await context.connectors.Group.removeFromCurator(payload);

      let source = await context.connectors.Group.findOneById(group);

      if (context.pubsub) {
        context.pubsub.publish('Group', {
          Group: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                group: args.group,
                curator: args.curator,
              },
              relation: 'curator'
            }
          }
        });

      
        let dest = await context.connectors.Curator.findOneById(curator);

        context.pubsub.publish('Curator', {
          Curator: {
            mutation: 'UNLINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                group: args.group,
                curator: args.curator,
              },
              relation: 'groups'
            }
          }
        });
      

      return {
        group: source,
      };
    }
  }),

};
