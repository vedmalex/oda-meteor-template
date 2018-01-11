import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:EmailType');

import { mutateAndGetPayload, idToCursor, Filter } from 'oda-api-graphql';
import { pubsub } from '../../../../../model/pubsub';
import { withFilter } from 'graphql-subscriptions';

function filterIt(payload, queryCheck) {
  return queryCheck(payload);
}

export const subscriptions = {
  EmailType: {
    subscribe: Filter.withContext(withFilter(() => pubsub.asyncIterator('EmailType'), ({ EmailType }, args, context, info) => {
      let allow = context.connectors.EmailType.canView(EmailType.node);
      if (allow) {
        return filterIt(EmailType, context.queryCheck);
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
