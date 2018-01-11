import * as log4js from 'log4js';
import * as _ from 'lodash';
import * as get from 'lodash/get';

let logger = log4js.getLogger('graphql:query:Phone');
import {
  globalIdField,
} from 'graphql-relay';

import RegisterConnectors from '../../../../data/registerConnectors';
import { lib } from 'oda-gen-common';
const { selectionTree: traverse } = lib;

export const resolver: { [key: string]: any } = {
  Phone: {
    id: globalIdField('Phone', ({ _id }) => _id),
    type: async (
      {_id: id}, // owner id
      args:{
        limit?: number;
        skip?: number;
        first?: number;
        after?: string;
        last?: number;
        before?: string;
        filter?: {
          [k: string]: any
        };
        orderBy?: string | string[];
      },
      context: { connectors: RegisterConnectors },
      info) => {
      let result;
      let selectionSet = traverse(info);


      let phone = await context.connectors.Phone.findOneById(id);
      //BelongsTo
      if (phone && phone.type) {
        result = await context.connectors.PhoneType.findOneByName(phone.type);

      }

      return result;
    },
    person: async (
      {_id: id}, // owner id
      args:{
        limit?: number;
        skip?: number;
        first?: number;
        after?: string;
        last?: number;
        before?: string;
        filter?: {
          [k: string]: any
        };
        orderBy?: string | string[];
      },
      context: { connectors: RegisterConnectors },
      info) => {
      let result;
      let selectionSet = traverse(info);


      let phone = await context.connectors.Phone.findOneById(id);
      //BelongsTo
      if (phone && phone.person) {
        result = await context.connectors.Person.findOneById(phone.person);

      }

      return result;
    },
  },
};
