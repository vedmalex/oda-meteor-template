import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Email');

import { mutateAndGetPayload, idToCursor, Filter } from 'oda-api-graphql';
import { pubsub } from '../../../../../model/pubsub';
import { withFilter } from 'graphql-subscriptions';

function filterIt(payload, queryCheck) {
  return queryCheck(payload);
}

export const subscriptions = {
  Email: {
    subscribe: Filter.withContext(withFilter(() => pubsub.asyncIterator('Email'), ({ Email }, args, context, info) => {
      let allow = context.connectors.Email.canView(Email.node);
      if (allow) {
        return filterIt(Email, context.queryCheck);
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
  
  EmailSubscriptionPayload : {
    __resolveType(obj, context, info) {
      if (obj.id || obj.email) {
        return "UpdateEmailSubscriptionPayload";
      }
      if (obj.args && obj.args.email && obj.args.emailType) {
        return "EmailBelongsToTypeSubscriptionPayload";
      }
      if (obj.args && obj.args.email && obj.args.person) {
        return "EmailBelongsToPersonSubscriptionPayload";
      }
      return null;
    }
  },
  
};
