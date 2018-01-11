import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:SocialNetwork');

import { mutateAndGetPayload, idToCursor, Filter } from 'oda-api-graphql';
import { pubsub } from '../../../../../model/pubsub';
import { withFilter } from 'graphql-subscriptions';

function filterIt(payload, queryCheck) {
  return queryCheck(payload);
}

export const subscriptions = {
  SocialNetwork: {
    subscribe: Filter.withContext(withFilter(() => pubsub.asyncIterator('SocialNetwork'), ({ SocialNetwork }, args, context, info) => {
      let allow = context.connectors.SocialNetwork.canView(SocialNetwork.node);
      if (allow) {
        return filterIt(SocialNetwork, context.queryCheck);
      } else {
        return false;
      }
    }),{
      id: '_id',
      person: 'person',
    }),
  },
};

export const resolver = {
  
  SocialNetworkSubscriptionPayload : {
    __resolveType(obj, context, info) {
      if (obj.id || obj.account || obj.url) {
        return "UpdateSocialNetworkSubscriptionPayload";
      }
      if (obj.args && obj.args.socialNetwork && obj.args.socialNetworkType) {
        return "SocialNetworkBelongsToTypeSubscriptionPayload";
      }
      if (obj.args && obj.args.socialNetwork && obj.args.person) {
        return "SocialNetworkBelongsToPersonSubscriptionPayload";
      }
      return null;
    }
  },
  
};
