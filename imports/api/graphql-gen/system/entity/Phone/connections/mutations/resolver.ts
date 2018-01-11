import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Phone');

import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

export const mutation = {
  addToPhoneBelongsToType: mutateAndGetPayload(
    async (
      args: {
        phone?: string,
        phoneType?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToPhoneBelongsToType');
      let { id: phone } = fromGlobalId(args.phone);
      let { id: phoneType } = fromGlobalId(args.phoneType);
      let payload = {
        phone,
        phoneType,
      };

      await context.connectors.Phone.addToType(payload);

      let source = await context.connectors.Phone.findOneById(phone);

      if (context.pubsub) {
        context.pubsub.publish('Phone', {
          Phone: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                phone: args.phone,
                phoneType: args.phoneType,
              },
              relation: 'type'
            }
          }
        });
      

      return {
        phone: source,
      };
      }
    }),

  removeFromPhoneBelongsToType: mutateAndGetPayload(
    async (
      args: {
        phone?: string,
        phoneType?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromPhoneBelongsToType');
      let { id: phone } = fromGlobalId(args.phone);
      let { id: phoneType } = fromGlobalId(args.phoneType);
      let payload = {
        phone,
        phoneType,
      };
      await context.connectors.Phone.removeFromType(payload);

      let source = await context.connectors.Phone.findOneById(phone);

      if (context.pubsub) {
        context.pubsub.publish('Phone', {
          Phone: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                phone: args.phone,
                phoneType: args.phoneType,
              },
              relation: 'type'
            }
          }
        });

      

      return {
        phone: source,
      };
    }
  }),

  addToPhoneBelongsToPerson: mutateAndGetPayload(
    async (
      args: {
        phone?: string,
        person?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToPhoneBelongsToPerson');
      let { id: phone } = fromGlobalId(args.phone);
      let { id: person } = fromGlobalId(args.person);
      let payload = {
        phone,
        person,
      };

      await context.connectors.Phone.addToPerson(payload);

      let source = await context.connectors.Phone.findOneById(phone);

      if (context.pubsub) {
        context.pubsub.publish('Phone', {
          Phone: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                phone: args.phone,
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
                phone: args.phone,
                person: args.person,
              },
              relation: 'phones'
            }
          }
        });
      

      return {
        phone: source,
      };
      }
    }),

  removeFromPhoneBelongsToPerson: mutateAndGetPayload(
    async (
      args: {
        phone?: string,
        person?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromPhoneBelongsToPerson');
      let { id: phone } = fromGlobalId(args.phone);
      let { id: person } = fromGlobalId(args.person);
      let payload = {
        phone,
        person,
      };
      await context.connectors.Phone.removeFromPerson(payload);

      let source = await context.connectors.Phone.findOneById(phone);

      if (context.pubsub) {
        context.pubsub.publish('Phone', {
          Phone: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                phone: args.phone,
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
                phone: args.phone,
                person: args.person,
              },
              relation: 'phones'
            }
          }
        });
      

      return {
        phone: source,
      };
    }
  }),

};
