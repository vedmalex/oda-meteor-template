import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:query');
import * as get from 'lodash/get';

import { fromGlobalId } from 'graphql-relay';
import RegisterConnectors from '../../../../data/registerConnectors';
import { emptyConnection, idToCursor, pagination, detectCursorDirection, consts } from 'oda-api-graphql';
import { lib } from 'oda-gen-common';

const { selectionTree: traverse } = lib;

let mongoose = require('mongoose');

import { utils } from 'oda-api-graphql';

const { validId } = utils;

export function getValue(value) {
    if (typeof value === 'string') {
      return validId(value) ? value : fromGlobalId(value).id;
    } else {
      return value;
    }
}

export const query: { [key: string]: any } = {
  emails: async (
    owner,
    args: {
      after: string,
      first: number,
      before: string,
      last: number,
      orderBy: string | string[],
      filter: object,
      limit: number,
      skip: number,
    },
    context: { connectors: RegisterConnectors },
    info
  ) => {
    logger.trace('emails');
    let result;
    let selectionSet = traverse(info);

    let idMap = {
      id: '_id',
      person: 'person',
    };

    let list = get(selectionSet, 'edges.node') ? await context.connectors.Email.getList({
      ...args,
      idMap,
    }) : [];

    if (list.length > 0) {
      let cursor = pagination(args);
      let direction = detectCursorDirection(args)._id;

      let edges = get(selectionSet, 'edges') ?
        list.map(l => {
          return {
            cursor: idToCursor(l.id),
            node: l,
          };
        }) : null;

      let pageInfo = get(selectionSet, 'pageInfo') ?
        {
          startCursor: get(selectionSet, 'pageInfo.startCursor')
            ? edges[0].cursor : undefined,
          endCursor: get(selectionSet, 'pageInfo.endCursor')
            ? edges[edges.length - 1].cursor : undefined,
          hasPreviousPage: get(selectionSet, 'pageInfo.hasPreviousPage') ? (direction === consts.DIRECTION.BACKWARD ? list.length === cursor.limit : false) : undefined,
          hasNextPage: get(selectionSet, 'pageInfo.hasNextPage') ? (direction === consts.DIRECTION.FORWARD ? list.length === cursor.limit : false) : undefined,
          count: get(selectionSet, 'pageInfo.count') ? await context.connectors.Email.getCount({
              ...args,
              idMap,
            }) : 0,
        } : null;

      result = {
        edges,
        pageInfo,
      };
    } else {
      result = emptyConnection();
    }
    return result;
  },
  email: async (
    owner,
    args: {
      id?: string,
      email?: string,
    },
    context: { connectors: RegisterConnectors },
    info
  ) => {
    logger.trace('email');
    let result;
    if (args.id) {
      result = await context.connectors.Email.findOneById(getValue(args.id));
    } else if (args.email) {
      result = await context.connectors.Email.findOneByEmail(args.email);
    }
    return result;
  },
};