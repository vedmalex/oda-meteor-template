import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Person');

import { mutateAndGetPayload, idToCursor, Filter } from 'oda-api-graphql';
import { pubsub } from '../../../../../model/pubsub';
import { withFilter } from 'graphql-subscriptions';

function filterIt(payload, queryCheck) {
  return queryCheck(payload);
}

export const subscriptions = {
  Person: {
    subscribe: Filter.withContext(withFilter(() => pubsub.asyncIterator('Person'), ({ Person }, args, context, info) => {
      let allow = context.connectors.Person.canView(Person.node);
      if (allow) {
        return filterIt(Person, context.queryCheck);
      } else {
        return false;
      }
    }),{
      id: '_id',
      user: 'user',
    }),
  },
};

export const resolver = {
  
  PersonSubscriptionPayload : {
    __resolveType(obj, context, info) {
      if (obj.id || obj.spiritualName || obj.fullName || obj.dateOfBirth || obj.specialNotes) {
        return "UpdatePersonSubscriptionPayload";
      }
      if (obj.args && obj.args.person && obj.args.user) {
        return "PersonBelongsToUserSubscriptionPayload";
      }
      if (obj.args && obj.args.person && obj.args.socialNetwork) {
        return "PersonHasManySocialNetworksSubscriptionPayload";
      }
      if (obj.args && obj.args.person && obj.args.phone) {
        return "PersonHasManyPhonesSubscriptionPayload";
      }
      if (obj.args && obj.args.person && obj.args.email) {
        return "PersonHasManyEmailsSubscriptionPayload";
      }
      if (obj.args && obj.args.person && obj.args.student) {
        return "PersonHasManyAsStudentsSubscriptionPayload";
      }
      if (obj.args && obj.args.person && obj.args.curator) {
        return "PersonHasOneAsCuratorSubscriptionPayload";
      }
      return null;
    }
  },
  
};
