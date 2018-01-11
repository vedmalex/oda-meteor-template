import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Curator');

import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

export const mutation = {
  addToCuratorBelongsToPerson: mutateAndGetPayload(
    async (
      args: {
        curator?: string,
        person?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToCuratorBelongsToPerson');
      let { id: curator } = fromGlobalId(args.curator);
      let { id: person } = fromGlobalId(args.person);
      let payload = {
        curator,
        person,
      };

      await context.connectors.Curator.addToPerson(payload);

      let source = await context.connectors.Curator.findOneById(curator);

      if (context.pubsub) {
        context.pubsub.publish('Curator', {
          Curator: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                curator: args.curator,
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
                curator: args.curator,
                person: args.person,
              },
              relation: 'asCurator'
            }
          }
        });
      

      return {
        curator: source,
      };
      }
    }),

  removeFromCuratorBelongsToPerson: mutateAndGetPayload(
    async (
      args: {
        curator?: string,
        person?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromCuratorBelongsToPerson');
      let { id: curator } = fromGlobalId(args.curator);
      let { id: person } = fromGlobalId(args.person);
      let payload = {
        curator,
        person,
      };
      await context.connectors.Curator.removeFromPerson(payload);

      let source = await context.connectors.Curator.findOneById(curator);

      if (context.pubsub) {
        context.pubsub.publish('Curator', {
          Curator: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                curator: args.curator,
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
                curator: args.curator,
                person: args.person,
              },
              relation: 'asCurator'
            }
          }
        });
      

      return {
        curator: source,
      };
    }
  }),

  addToCuratorHasManyGroups: mutateAndGetPayload(
    async (
      args: {
        curator?: string,
        group?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToCuratorHasManyGroups');
      let { id: curator } = fromGlobalId(args.curator);
      let { id: group } = fromGlobalId(args.group);
      let payload = {
        curator,
        group,
      };

      await context.connectors.Curator.addToGroups(payload);

      let source = await context.connectors.Curator.findOneById(curator);

      if (context.pubsub) {
        context.pubsub.publish('Curator', {
          Curator: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                curator: args.curator,
                group: args.group,
              },
              relation: 'groups'
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
                curator: args.curator,
                group: args.group,
              },
              relation: 'curator'
            }
          }
        });
      

      return {
        curator: source,
      };
      }
    }),

  removeFromCuratorHasManyGroups: mutateAndGetPayload(
    async (
      args: {
        curator?: string,
        group?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromCuratorHasManyGroups');
      let { id: curator } = fromGlobalId(args.curator);
      let { id: group } = fromGlobalId(args.group);
      let payload = {
        curator,
        group,
      };
      await context.connectors.Curator.removeFromGroups(payload);

      let source = await context.connectors.Curator.findOneById(curator);

      if (context.pubsub) {
        context.pubsub.publish('Curator', {
          Curator: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                curator: args.curator,
                group: args.group,
              },
              relation: 'groups'
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
                curator: args.curator,
                group: args.group,
              },
              relation: 'curator'
            }
          }
        });
      

      return {
        curator: source,
      };
    }
  }),

};
