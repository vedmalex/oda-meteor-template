import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Group');

import { mutateAndGetPayload, idToCursor, Filter } from 'oda-api-graphql';
import { pubsub } from '../../../../../model/pubsub';
import { withFilter } from 'graphql-subscriptions';

function filterIt(payload, queryCheck) {
  return queryCheck(payload);
}

export const subscriptions = {
  Group: {
    subscribe: Filter.withContext(withFilter(() => pubsub.asyncIterator('Group'), ({ Group }, args, context, info) => {
      let allow = context.connectors.Group.canView(Group.node);
      if (allow) {
        return filterIt(Group, context.queryCheck);
      } else {
        return false;
      }
    }),{
      id: '_id',
      curator: 'curator',
    }),
  },
};

export const resolver = {
  
  GroupSubscriptionPayload : {
    __resolveType(obj, context, info) {
      if (obj.id || obj.name) {
        return "UpdateGroupSubscriptionPayload";
      }
      if (obj.args && obj.args.group && obj.args.student) {
        return "GroupHasManyStudentsSubscriptionPayload";
      }
      if (obj.args && obj.args.group && obj.args.curator) {
        return "GroupBelongsToCuratorSubscriptionPayload";
      }
      return null;
    }
  },
  
};
