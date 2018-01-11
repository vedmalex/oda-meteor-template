import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:SocialNetworkType');

import { mutateAndGetPayload, idToCursor, Filter } from 'oda-api-graphql';
import { pubsub } from '../../../../../model/pubsub';
import { withFilter } from 'graphql-subscriptions';

function filterIt(payload, queryCheck) {
  return queryCheck(payload);
}

export const subscriptions = {
  SocialNetworkType: {
    subscribe: Filter.withContext(withFilter(() => pubsub.asyncIterator('SocialNetworkType'), ({ SocialNetworkType }, args, context, info) => {
      let allow = context.connectors.SocialNetworkType.canView(SocialNetworkType.node);
      if (allow) {
        return filterIt(SocialNetworkType, context.queryCheck);
      } else {
        return false;
      }
    }),{
      id: '_id',
    }),
  },
};

export const resolver = {
  
};
