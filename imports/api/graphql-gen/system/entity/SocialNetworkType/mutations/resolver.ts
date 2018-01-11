import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:SocialNetworkType');
import gql from 'graphql-tag';
import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';



async function unlinkSocialNetworkTypeFromAll(args:{
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
      fragment UnlinkSocialNetworkType on SocialNetworkType {
        id
      }
    `;
    const input = await context.userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: socialNetworkType(${pArgs}){
            ...UnlinkSocialNetworkType
          }
        }
        ${unlinkFragment}
        `,
      variables,
    }).then(r => r.data || r.data.input);

    if(input){
      await context.userGQL({
        query: gql`
        mutation unlink($input: updateSocialNetworkTypeInput!) {
          updateSocialNetworkType(input: $input) {
            socialNetworkType {
              ...UnlinkSocialNetworkType
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
  createSocialNetworkType: mutateAndGetPayload( async (args: {
      id?: string,
      name?: string,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('createSocialNetworkType');
    let create: any = {
      name: args.name,
    };

    if(args.id) {
      create.id = fromGlobalId(args.id).id;
    }

    let result = await context.connectors.SocialNetworkType.create(create);

    if (context.pubsub) {
      context.pubsub.publish('SocialNetworkType', {
        SocialNetworkType: {
          mutation: 'CREATE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    let socialNetworkTypeEdge = {
      cursor: idToCursor(result.id),
      node: result,
    };

    return {
      socialNetworkType: socialNetworkTypeEdge,
    };
  }),

  updateSocialNetworkType:  mutateAndGetPayload( async (args:  {
      id?: string,
      name?: string,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('updateSocialNetworkType');
    let payload = {
      name: args.name,
    };

    let result;
    let previous;
    try {
      if (args.id) {
        previous = await context.connectors.SocialNetworkType.findOneById(fromGlobalId(args.id).id);
        result = await context.connectors.SocialNetworkType.findOneByIdAndUpdate(fromGlobalId(args.id).id, payload);
      } else if (args.name) {
        delete payload.name;
        previous = await context.connectors.SocialNetworkType.findOneByName(args.name);
        result = await context.connectors.SocialNetworkType.findOneByNameAndUpdate(args.name, payload);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('SocialNetworkType', {
        SocialNetworkType: {
          mutation: 'UPDATE',
          node: result,
          previous,
          updatedFields: Object.keys(payload).filter(f => payload[f]!== undefined),
          payload: args,
        }
      });
    }

    return {
      socialNetworkType: result,
    };
  }),

  deleteSocialNetworkType:  mutateAndGetPayload(async (args: {
      id?: string,
      name?: string,
    },
    context: {
      connectors: RegisterConnectors,
      pubsub: PubSubEngine,
      userGQL: (args: any)=>Promise<any> },
    info,
  ) => {
    logger.trace('deleteSocialNetworkType');
    let result;
    try {
      if (args.id) {

        await unlinkSocialNetworkTypeFromAll([{
          key: 'id',
          type: 'ID',
          value: args.id,
        }],
          context,
        );

        result = await context.connectors.SocialNetworkType.findOneByIdAndRemove(fromGlobalId(args.id).id);
      } else if (args.name) {

        await unlinkSocialNetworkTypeFromAll([{
          key: 'name',
          type: 'String',
          value: args.name,
        }],
          context,
        );

        result = await context.connectors.SocialNetworkType.findOneByNameAndRemove(args.name);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('SocialNetworkType', {
        SocialNetworkType: {
          mutation: 'DELETE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    return {
      deletedItemId: toGlobalId('SocialNetworkType', result.id),
      socialNetworkType: result,
    };
  }),
}
;
