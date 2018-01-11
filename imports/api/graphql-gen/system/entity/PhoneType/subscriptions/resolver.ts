import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:PhoneType');

import { mutateAndGetPayload, idToCursor, Filter } from 'oda-api-graphql';
import { pubsub } from '../../../../../model/pubsub';
import { withFilter } from 'graphql-subscriptions';

function filterIt(payload, queryCheck) {
  return queryCheck(payload);
}

export const subscriptions = {
  PhoneType: {
    subscribe: Filter.withContext(withFilter(() => pubsub.asyncIterator('PhoneType'), ({ PhoneType }, args, context, info) => {
      let allow = context.connectors.PhoneType.canView(PhoneType.node);
      if (allow) {
        return filterIt(PhoneType, context.queryCheck);
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
