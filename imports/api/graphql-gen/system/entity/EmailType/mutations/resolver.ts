import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:EmailType');
import gql from 'graphql-tag';
import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';



async function unlinkEmailTypeFromAll(args:{
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
      fragment UnlinkEmailType on EmailType {
        id
      }
    `;
    const input = await context.userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: emailType(${pArgs}){
            ...UnlinkEmailType
          }
        }
        ${unlinkFragment}
        `,
      variables,
    }).then(r => r.data || r.data.input);

    if(input){
      await context.userGQL({
        query: gql`
        mutation unlink($input: updateEmailTypeInput!) {
          updateEmailType(input: $input) {
            emailType {
              ...UnlinkEmailType
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
  createEmailType: mutateAndGetPayload( async (args: {
      id?: string,
      name?: string,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('createEmailType');
    let create: any = {
      name: args.name,
    };

    if(args.id) {
      create.id = fromGlobalId(args.id).id;
    }

    let result = await context.connectors.EmailType.create(create);

    if (context.pubsub) {
      context.pubsub.publish('EmailType', {
        EmailType: {
          mutation: 'CREATE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    let emailTypeEdge = {
      cursor: idToCursor(result.id),
      node: result,
    };

    return {
      emailType: emailTypeEdge,
    };
  }),

  updateEmailType:  mutateAndGetPayload( async (args:  {
      id?: string,
      name?: string,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('updateEmailType');
    let payload = {
      name: args.name,
    };

    let result;
    let previous;
    try {
      if (args.id) {
        previous = await context.connectors.EmailType.findOneById(fromGlobalId(args.id).id);
        result = await context.connectors.EmailType.findOneByIdAndUpdate(fromGlobalId(args.id).id, payload);
      } else if (args.name) {
        delete payload.name;
        previous = await context.connectors.EmailType.findOneByName(args.name);
        result = await context.connectors.EmailType.findOneByNameAndUpdate(args.name, payload);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('EmailType', {
        EmailType: {
          mutation: 'UPDATE',
          node: result,
          previous,
          updatedFields: Object.keys(payload).filter(f => payload[f]!== undefined),
          payload: args,
        }
      });
    }

    return {
      emailType: result,
    };
  }),

  deleteEmailType:  mutateAndGetPayload(async (args: {
      id?: string,
      name?: string,
    },
    context: {
      connectors: RegisterConnectors,
      pubsub: PubSubEngine,
      userGQL: (args: any)=>Promise<any> },
    info,
  ) => {
    logger.trace('deleteEmailType');
    let result;
    try {
      if (args.id) {

        await unlinkEmailTypeFromAll([{
          key: 'id',
          type: 'ID',
          value: args.id,
        }],
          context,
        );

        result = await context.connectors.EmailType.findOneByIdAndRemove(fromGlobalId(args.id).id);
      } else if (args.name) {

        await unlinkEmailTypeFromAll([{
          key: 'name',
          type: 'String',
          value: args.name,
        }],
          context,
        );

        result = await context.connectors.EmailType.findOneByNameAndRemove(args.name);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('EmailType', {
        EmailType: {
          mutation: 'DELETE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    return {
      deletedItemId: toGlobalId('EmailType', result.id),
      emailType: result,
    };
  }),
}
;
