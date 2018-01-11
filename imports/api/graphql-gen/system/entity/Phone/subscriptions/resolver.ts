import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Phone');

import { mutateAndGetPayload, idToCursor, Filter } from 'oda-api-graphql';
import { pubsub } from '../../../../../model/pubsub';
import { withFilter } from 'graphql-subscriptions';

function filterIt(payload, queryCheck) {
  return queryCheck(payload);
}

export const subscriptions = {
  Phone: {
    subscribe: Filter.withContext(withFilter(() => pubsub.asyncIterator('Phone'), ({ Phone }, args, context, info) => {
      let allow = context.connectors.Phone.canView(Phone.node);
      if (allow) {
        return filterIt(Phone, context.queryCheck);
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
  
  PhoneSubscriptionPayload : {
    __resolveType(obj, context, info) {
      if (obj.id || obj.phoneNumber) {
        return "UpdatePhoneSubscriptionPayload";
      }
      if (obj.args && obj.args.phone && obj.args.phoneType) {
        return "PhoneBelongsToTypeSubscriptionPayload";
      }
      if (obj.args && obj.args.phone && obj.args.person) {
        return "PhoneBelongsToPersonSubscriptionPayload";
      }
      return null;
    }
  },
  
};
