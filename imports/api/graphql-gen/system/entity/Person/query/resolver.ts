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
  people: async (
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
    logger.trace('people');
    let result;
    let selectionSet = traverse(info);

    let idMap = {
      id: '_id',
      user: 'user',
    };

    let list = get(selectionSet, 'edges.node') ? await context.connectors.Person.getList({
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
          count: get(selectionSet, 'pageInfo.count') ? await context.connectors.Person.getCount({
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
  person: async (
    owner,
    args: {
      id?: string,
      spiritualName?: string,
      fullName?: string,
    },
    context: { connectors: RegisterConnectors },
    info
  ) => {
    logger.trace('person');
    let result;
    if (args.id) {
      result = await context.connectors.Person.findOneById(getValue(args.id));
    } else if (args.spiritualName) {
      result = await context.connectors.Person.findOneBySpiritualName(args.spiritualName);
    } else if (args.fullName) {
      result = await context.connectors.Person.findOneByFullName(args.fullName);
    }
    return result;
  },
};