import * as log4js from 'log4js';
import * as _ from 'lodash';
import * as get from 'lodash/get';

let logger = log4js.getLogger('graphql:query:SocialNetwork');
import {
  globalIdField,
} from 'graphql-relay';

import RegisterConnectors from '../../../../data/registerConnectors';
import { lib } from 'oda-gen-common';
const { selectionTree: traverse } = lib;

export const resolver: { [key: string]: any } = {
  SocialNetwork: {
    id: globalIdField('SocialNetwork', ({ _id }) => _id),
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


      let socialNetwork = await context.connectors.SocialNetwork.findOneById(id);
      //BelongsTo
      if (socialNetwork && socialNetwork.type) {
        result = await context.connectors.SocialNetworkType.findOneByName(socialNetwork.type);

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


      let socialNetwork = await context.connectors.SocialNetwork.findOneById(id);
      //BelongsTo
      if (socialNetwork && socialNetwork.person) {
        result = await context.connectors.Person.findOneById(socialNetwork.person);

      }

      return result;
    },
  },
};
