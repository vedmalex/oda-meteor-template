import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Student');

import { mutateAndGetPayload, idToCursor, Filter } from 'oda-api-graphql';
import { pubsub } from '../../../../../model/pubsub';
import { withFilter } from 'graphql-subscriptions';

function filterIt(payload, queryCheck) {
  return queryCheck(payload);
}

export const subscriptions = {
  Student: {
    subscribe: Filter.withContext(withFilter(() => pubsub.asyncIterator('Student'), ({ Student }, args, context, info) => {
      let allow = context.connectors.Student.canView(Student.node);
      if (allow) {
        return filterIt(Student, context.queryCheck);
      } else {
        return false;
      }
    }),{
      id: '_id',
      person: 'person',
      group: 'group',
    }),
  },
};

export const resolver = {
  
  StudentSubscriptionPayload : {
    __resolveType(obj, context, info) {
      if (obj.id) {
        return "UpdateStudentSubscriptionPayload";
      }
      if (obj.args && obj.args.student && obj.args.person) {
        return "StudentBelongsToPersonSubscriptionPayload";
      }
      if (obj.args && obj.args.student && obj.args.group) {
        return "StudentBelongsToGroupSubscriptionPayload";
      }
      return null;
    }
  },
  
};
