import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Curator');

import { mutateAndGetPayload, idToCursor, Filter } from 'oda-api-graphql';
import { pubsub } from '../../../../../model/pubsub';
import { withFilter } from 'graphql-subscriptions';

function filterIt(payload, queryCheck) {
  return queryCheck(payload);
}

export const subscriptions = {
  Curator: {
    subscribe: Filter.withContext(withFilter(() => pubsub.asyncIterator('Curator'), ({ Curator }, args, context, info) => {
      let allow = context.connectors.Curator.canView(Curator.node);
      if (allow) {
        return filterIt(Curator, context.queryCheck);
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
  
  CuratorSubscriptionPayload : {
    __resolveType(obj, context, info) {
      if (obj.id) {
        return "UpdateCuratorSubscriptionPayload";
      }
      if (obj.args && obj.args.curator && obj.args.person) {
        return "CuratorBelongsToPersonSubscriptionPayload";
      }
      if (obj.args && obj.args.curator && obj.args.group) {
        return "CuratorHasManyGroupsSubscriptionPayload";
      }
      return null;
    }
  },
  
};
