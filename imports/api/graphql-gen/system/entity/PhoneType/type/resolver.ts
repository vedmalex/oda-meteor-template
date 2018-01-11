import * as log4js from 'log4js';
import * as _ from 'lodash';
import * as get from 'lodash/get';

let logger = log4js.getLogger('graphql:query:PhoneType');
import {
  globalIdField,
} from 'graphql-relay';
import { lib } from 'oda-gen-common';
const { selectionTree: traverse } = lib;

export const resolver: { [key: string]: any } = {
  PhoneType: {
    id: globalIdField('PhoneType', ({ _id }) => _id),
  },
};
