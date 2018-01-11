import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:User');
import gql from 'graphql-tag';
import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';



async function unlinkUserFromAll(args:{
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
      fragment UnlinkUser on User {
        id
      }
    `;
    const input = await context.userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: user(${pArgs}){
            ...UnlinkUser
          }
        }
        ${unlinkFragment}
        `,
      variables,
    }).then(r => r.data || r.data.input);

    if(input){
      await context.userGQL({
        query: gql`
        mutation unlink($input: updateUserInput!) {
          updateUser(input: $input) {
            user {
              ...UnlinkUser
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
  createUser: mutateAndGetPayload( async (args: {
      id?: string,
      userName?: string,
      password?: string,
      isAdmin?: boolean,
      isSystem?: boolean,
      enabled?: boolean,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('createUser');
    let create: any = {
      userName: args.userName,
      password: args.password,
      isAdmin: args.isAdmin,
      isSystem: args.isSystem,
      enabled: args.enabled,
    };

    if(args.id) {
      create.id = fromGlobalId(args.id).id;
    }

    let result = await context.connectors.User.create(create);

    if (context.pubsub) {
      context.pubsub.publish('User', {
        User: {
          mutation: 'CREATE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    let userEdge = {
      cursor: idToCursor(result.id),
      node: result,
    };

    return {
      user: userEdge,
    };
  }),

  updateUser:  mutateAndGetPayload( async (args:  {
      id?: string,
      userName?: string,
      password?: string,
      isAdmin?: boolean,
      isSystem?: boolean,
      enabled?: boolean,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('updateUser');
    let payload = {
      userName: args.userName,
      password: args.password,
      isAdmin: args.isAdmin,
      isSystem: args.isSystem,
      enabled: args.enabled,
    };

    let result;
    let previous;
    try {
      if (args.id) {
        previous = await context.connectors.User.findOneById(fromGlobalId(args.id).id);
        result = await context.connectors.User.findOneByIdAndUpdate(fromGlobalId(args.id).id, payload);
      } else if (args.userName) {
        delete payload.userName;
        previous = await context.connectors.User.findOneByUserName(args.userName);
        result = await context.connectors.User.findOneByUserNameAndUpdate(args.userName, payload);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('User', {
        User: {
          mutation: 'UPDATE',
          node: result,
          previous,
          updatedFields: Object.keys(payload).filter(f => payload[f]!== undefined),
          payload: args,
        }
      });
    }

    return {
      user: result,
    };
  }),

  deleteUser:  mutateAndGetPayload(async (args: {
      id?: string,
      userName?: string,
    },
    context: {
      connectors: RegisterConnectors,
      pubsub: PubSubEngine,
      userGQL: (args: any)=>Promise<any> },
    info,
  ) => {
    logger.trace('deleteUser');
    let result;
    try {
      if (args.id) {

        await unlinkUserFromAll([{
          key: 'id',
          type: 'ID',
          value: args.id,
        }],
          context,
        );

        result = await context.connectors.User.findOneByIdAndRemove(fromGlobalId(args.id).id);
      } else if (args.userName) {

        await unlinkUserFromAll([{
          key: 'userName',
          type: 'String',
          value: args.userName,
        }],
          context,
        );

        result = await context.connectors.User.findOneByUserNameAndRemove(args.userName);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('User', {
        User: {
          mutation: 'DELETE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    return {
      deletedItemId: toGlobalId('User', result.id),
      user: result,
    };
  }),
}
;
