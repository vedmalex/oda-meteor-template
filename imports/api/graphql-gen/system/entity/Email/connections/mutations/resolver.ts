import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Email');

import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

export const mutation = {
  addToEmailBelongsToType: mutateAndGetPayload(
    async (
      args: {
        email?: string,
        emailType?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToEmailBelongsToType');
      let { id: email } = fromGlobalId(args.email);
      let { id: emailType } = fromGlobalId(args.emailType);
      let payload = {
        email,
        emailType,
      };

      await context.connectors.Email.addToType(payload);

      let source = await context.connectors.Email.findOneById(email);

      if (context.pubsub) {
        context.pubsub.publish('Email', {
          Email: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                email: args.email,
                emailType: args.emailType,
              },
              relation: 'type'
            }
          }
        });
      

      return {
        email: source,
      };
      }
    }),

  removeFromEmailBelongsToType: mutateAndGetPayload(
    async (
      args: {
        email?: string,
        emailType?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromEmailBelongsToType');
      let { id: email } = fromGlobalId(args.email);
      let { id: emailType } = fromGlobalId(args.emailType);
      let payload = {
        email,
        emailType,
      };
      await context.connectors.Email.removeFromType(payload);

      let source = await context.connectors.Email.findOneById(email);

      if (context.pubsub) {
        context.pubsub.publish('Email', {
          Email: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                email: args.email,
                emailType: args.emailType,
              },
              relation: 'type'
            }
          }
        });

      

      return {
        email: source,
      };
    }
  }),

  addToEmailBelongsToPerson: mutateAndGetPayload(
    async (
      args: {
        email?: string,
        person?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToEmailBelongsToPerson');
      let { id: email } = fromGlobalId(args.email);
      let { id: person } = fromGlobalId(args.person);
      let payload = {
        email,
        person,
      };

      await context.connectors.Email.addToPerson(payload);

      let source = await context.connectors.Email.findOneById(email);

      if (context.pubsub) {
        context.pubsub.publish('Email', {
          Email: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                email: args.email,
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
                email: args.email,
                person: args.person,
              },
              relation: 'emails'
            }
          }
        });
      

      return {
        email: source,
      };
      }
    }),

  removeFromEmailBelongsToPerson: mutateAndGetPayload(
    async (
      args: {
        email?: string,
        person?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromEmailBelongsToPerson');
      let { id: email } = fromGlobalId(args.email);
      let { id: person } = fromGlobalId(args.person);
      let payload = {
        email,
        person,
      };
      await context.connectors.Email.removeFromPerson(payload);

      let source = await context.connectors.Email.findOneById(email);

      if (context.pubsub) {
        context.pubsub.publish('Email', {
          Email: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                email: args.email,
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
                email: args.email,
                person: args.person,
              },
              relation: 'emails'
            }
          }
        });
      

      return {
        email: source,
      };
    }
  }),

};
