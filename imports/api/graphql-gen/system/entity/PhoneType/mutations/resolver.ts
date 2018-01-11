import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:PhoneType');
import gql from 'graphql-tag';
import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';



async function unlinkPhoneTypeFromAll(args:{
  key,
  type,
  value,
}[],
  context: {userGQL: (args: any)=>Promise<any>},
){
  if (args.length > 0 && context) {

    const variables = args.reduce((res, cur) => {
      res[cur.key] = cur.value;
      return res;
    }, {});

    const qArgs = args.reduce((res, cur) => {
      res.push(`$${cur.key}: ${cur.type}`);
      return res;
    }, []).join(',');

    const pArgs = args.reduce((res, cur) => {
      res.push(`${cur.key}: $${cur.key}`);
      return res;
    }, []).join(',');
    const unlinkFragment = gql`
      fragment UnlinkPhoneType on PhoneType {
        id
      }
    `;
    const input = await context.userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: phoneType(${pArgs}){
            ...UnlinkPhoneType
          }
        }
        ${unlinkFragment}
        `,
      variables,
    }).then(r => r.data || r.data.input);

    if(input){
      await context.userGQL({
        query: gql`
        mutation unlink($input: updatePhoneTypeInput!) {
          updatePhoneType(input: $input) {
            phoneType {
              ...UnlinkPhoneType
            }
          }
        }
        ${unlinkFragment}
        `,
        variables: input
      });
    }
  }
}

export const mutation = {
  createPhoneType: mutateAndGetPayload( async (args: {
      id?: string,
      name?: string,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('createPhoneType');
    let create: any = {
      name: args.name,
    };

    if(args.id) {
      create.id = fromGlobalId(args.id).id;
    }

    let result = await context.connectors.PhoneType.create(create);

    if (context.pubsub) {
      context.pubsub.publish('PhoneType', {
        PhoneType: {
          mutation: 'CREATE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    let phoneTypeEdge = {
      cursor: idToCursor(result.id),
      node: result,
    };

    return {
      phoneType: phoneTypeEdge,
    };
  }),

  updatePhoneType:  mutateAndGetPayload( async (args:  {
      id?: string,
      name?: string,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('updatePhoneType');
    let payload = {
      name: args.name,
    };

    let result;
    let previous;
    try {
      if (args.id) {
        previous = await context.connectors.PhoneType.findOneById(fromGlobalId(args.id).id);
        result = await context.connectors.PhoneType.findOneByIdAndUpdate(fromGlobalId(args.id).id, payload);
      } else if (args.name) {
        delete payload.name;
        previous = await context.connectors.PhoneType.findOneByName(args.name);
        result = await context.connectors.PhoneType.findOneByNameAndUpdate(args.name, payload);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('PhoneType', {
        PhoneType: {
          mutation: 'UPDATE',
          node: result,
          previous,
          updatedFields: Object.keys(payload).filter(f => payload[f]!== undefined),
          payload: args,
        }
      });
    }

    return {
      phoneType: result,
    };
  }),

  deletePhoneType:  mutateAndGetPayload(async (args: {
      id?: string,
      name?: string,
    },
    context: {
      connectors: RegisterConnectors,
      pubsub: PubSubEngine,
      userGQL: (args: any)=>Promise<any> },
    info,
  ) => {
    logger.trace('deletePhoneType');
    let result;
    try {
      if (args.id) {

        await unlinkPhoneTypeFromAll([{
          key: 'id',
          type: 'ID',
          value: args.id,
        }],
          context,
        );

        result = await context.connectors.PhoneType.findOneByIdAndRemove(fromGlobalId(args.id).id);
      } else if (args.name) {

        await unlinkPhoneTypeFromAll([{
          key: 'name',
          type: 'String',
          value: args.name,
        }],
          context,
        );

        result = await context.connectors.PhoneType.findOneByNameAndRemove(args.name);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('PhoneType', {
        PhoneType: {
          mutation: 'DELETE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    return {
      deletedItemId: toGlobalId('PhoneType', result.id),
      phoneType: result,
    };
  }),
}
;
