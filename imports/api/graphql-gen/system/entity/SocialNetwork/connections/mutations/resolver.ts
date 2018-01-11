import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:SocialNetwork');

import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

export const mutation = {
  addToSocialNetworkBelongsToType: mutateAndGetPayload(
    async (
      args: {
        socialNetwork?: string,
        socialNetworkType?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToSocialNetworkBelongsToType');
      let { id: socialNetwork } = fromGlobalId(args.socialNetwork);
      let { id: socialNetworkType } = fromGlobalId(args.socialNetworkType);
      let payload = {
        socialNetwork,
        socialNetworkType,
      };

      await context.connectors.SocialNetwork.addToType(payload);

      let source = await context.connectors.SocialNetwork.findOneById(socialNetwork);

      if (context.pubsub) {
        context.pubsub.publish('SocialNetwork', {
          SocialNetwork: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                socialNetwork: args.socialNetwork,
                socialNetworkType: args.socialNetworkType,
              },
              relation: 'type'
            }
          }
        });
      

      return {
        socialNetwork: source,
      };
      }
    }),

  removeFromSocialNetworkBelongsToType: mutateAndGetPayload(
    async (
      args: {
        socialNetwork?: string,
        socialNetworkType?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromSocialNetworkBelongsToType');
      let { id: socialNetwork } = fromGlobalId(args.socialNetwork);
      let { id: socialNetworkType } = fromGlobalId(args.socialNetworkType);
      let payload = {
        socialNetwork,
        socialNetworkType,
      };
      await context.connectors.SocialNetwork.removeFromType(payload);

      let source = await context.connectors.SocialNetwork.findOneById(socialNetwork);

      if (context.pubsub) {
        context.pubsub.publish('SocialNetwork', {
          SocialNetwork: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                socialNetwork: args.socialNetwork,
                socialNetworkType: args.socialNetworkType,
              },
              relation: 'type'
            }
          }
        });

      

      return {
        socialNetwork: source,
      };
    }
  }),

  addToSocialNetworkBelongsToPerson: mutateAndGetPayload(
    async (
      args: {
        socialNetwork?: string,
        person?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToSocialNetworkBelongsToPerson');
      let { id: socialNetwork } = fromGlobalId(args.socialNetwork);
      let { id: person } = fromGlobalId(args.person);
      let payload = {
        socialNetwork,
        person,
      };

      await context.connectors.SocialNetwork.addToPerson(payload);

      let source = await context.connectors.SocialNetwork.findOneById(socialNetwork);

      if (context.pubsub) {
        context.pubsub.publish('SocialNetwork', {
          SocialNetwork: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                socialNetwork: args.socialNetwork,
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
                socialNetwork: args.socialNetwork,
                person: args.person,
              },
              relation: 'socialNetworks'
            }
          }
        });
      

      return {
        socialNetwork: source,
      };
      }
    }),

  removeFromSocialNetworkBelongsToPerson: mutateAndGetPayload(
    async (
      args: {
        socialNetwork?: string,
        person?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromSocialNetworkBelongsToPerson');
      let { id: socialNetwork } = fromGlobalId(args.socialNetwork);
      let { id: person } = fromGlobalId(args.person);
      let payload = {
        socialNetwork,
        person,
      };
      await context.connectors.SocialNetwork.removeFromPerson(payload);

      let source = await context.connectors.SocialNetwork.findOneById(socialNetwork);

      if (context.pubsub) {
        context.pubsub.publish('SocialNetwork', {
          SocialNetwork: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                socialNetwork: args.socialNetwork,
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
                socialNetwork: args.socialNetwork,
                person: args.person,
              },
              relation: 'socialNetworks'
            }
          }
        });
      

      return {
        socialNetwork: source,
      };
    }
  }),

};
