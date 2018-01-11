import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:SocialNetwork');
import gql from 'graphql-tag';
import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

async function ensureSocialNetworkType({
  args, context, create
}) {
  // find
  let filter;
  let fArgs;
  let variables;
  if (args.id) {
    fArgs = '$id: ID';
    filter = 'id: $id';
    variables = {
      id: args.id,
    };

  } else if (args.name) {
    fArgs = '$name: String';
    filter = 'name: $name';
    variables = {
      name: args.name,
    };
  }
  let socialNetworkType;
  if (filter) {
    socialNetworkType = await context.userGQL({
      query: gql`query findSocialNetworkType(${fArgs}){
            socialNetworkType(${filter}){
              id
            }
          }
          `,
      variables,
    }).then(r => r.data.socialNetworkType);
  }

  if (!socialNetworkType) {
    if (create) {
      socialNetworkType = await context.userGQL({
        query: gql`mutation createSocialNetworkType($socialNetworkType: createSocialNetworkTypeInput!) {
            createSocialNetworkType(input: $socialNetworkType) {
              socialNetworkType {
                node {
                  id
                }
              }
            }
          }
          `,
        variables: {
          socialNetworkType: args,
        }
      }).then(r => r.data.createSocialNetworkType.socialNetworkType.node);
    }
  } else {
    // update
    socialNetworkType = await context.userGQL({
      query: gql`mutation updateSocialNetworkType($socialNetworkType: updateSocialNetworkTypeInput!) {
            updateSocialNetworkType(input: $socialNetworkType) {
              socialNetworkType {
                id
              }
            }
          }
          `,
      variables: {
        socialNetworkType: args,
      }
    }).then(r => r.data.updateSocialNetworkType.socialNetworkType);
  }
  return socialNetworkType;
}
async function ensurePerson({
  args, context, create
}) {
  // find
  let filter;
  let fArgs;
  let variables;
  if (args.id) {
    fArgs = '$id: ID';
    filter = 'id: $id';
    variables = {
      id: args.id,
    };

  } else if (args.spiritualName) {
    fArgs = '$spiritualName: String';
    filter = 'spiritualName: $spiritualName';
    variables = {
      spiritualName: args.spiritualName,
    };
  } else if (args.fullName) {
    fArgs = '$fullName: String';
    filter = 'fullName: $fullName';
    variables = {
      fullName: args.fullName,
    };
  }
  let person;
  if (filter) {
    person = await context.userGQL({
      query: gql`query findPerson(${fArgs}){
            person(${filter}){
              id
            }
          }
          `,
      variables,
    }).then(r => r.data.person);
  }

  if (!person) {
    if (create) {
      person = await context.userGQL({
        query: gql`mutation createPerson($person: createPersonInput!) {
            createPerson(input: $person) {
              person {
                node {
                  id
                }
              }
            }
          }
          `,
        variables: {
          person: args,
        }
      }).then(r => r.data.createPerson.person.node);
    }
  } else {
    // update
    person = await context.userGQL({
      query: gql`mutation updatePerson($person: updatePersonInput!) {
            updatePerson(input: $person) {
              person {
                id
              }
            }
          }
          `,
      variables: {
        person: args,
      }
    }).then(r => r.data.updatePerson.person);
  }
  return person;
}


async function linkToType({
  context, type,  socialNetwork,
}) {
  if (type) {
    await context.userGQL({
      query: gql`mutation addToSocialNetworkBelongsToType($input:addToSocialNetworkBelongsToTypeInput!) {
          addToSocialNetworkBelongsToType(input:$input){
            socialNetwork {
              id
            }
          }
        }`,
      variables: {
        input: {
          socialNetwork: toGlobalId('SocialNetwork', socialNetwork.id),
          socialNetworkType: type.id,
        }
      }
    });
  }
}

async function unlinkFromType({
  context, type,  socialNetwork,
}) {
  if (type) {
    await context.userGQL({
      query: gql`mutation removeFromSocialNetworkBelongsToType($input: removeFromSocialNetworkBelongsToTypeInput!) {
          removeFromSocialNetworkBelongsToType(input:$input){
            socialNetwork {
              id
            }
          }
        }`,
      variables: {
        input: {
          socialNetwork: toGlobalId('SocialNetwork', socialNetwork.id),
          socialNetworkType: type.id,
        }
      }
    });
  }
}


async function linkToPerson({
  context, person,  socialNetwork,
}) {
  if (person) {
    await context.userGQL({
      query: gql`mutation addToSocialNetworkBelongsToPerson($input:addToSocialNetworkBelongsToPersonInput!) {
          addToSocialNetworkBelongsToPerson(input:$input){
            socialNetwork {
              id
            }
          }
        }`,
      variables: {
        input: {
          socialNetwork: toGlobalId('SocialNetwork', socialNetwork.id),
          person: person.id,
        }
      }
    });
  }
}

async function unlinkFromPerson({
  context, person,  socialNetwork,
}) {
  if (person) {
    await context.userGQL({
      query: gql`mutation removeFromSocialNetworkBelongsToPerson($input: removeFromSocialNetworkBelongsToPersonInput!) {
          removeFromSocialNetworkBelongsToPerson(input:$input){
            socialNetwork {
              id
            }
          }
        }`,
      variables: {
        input: {
          socialNetwork: toGlobalId('SocialNetwork', socialNetwork.id),
          person: person.id,
        }
      }
    });
  }
}


async function unlinkSocialNetworkFromAll(args:{
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
      fragment UnlinkSocialNetwork on SocialNetwork {
        id
        typeUnlink: type{
          id
        }
        personUnlink: person{
          id
        }
      }
    `;
    const input = await context.userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: socialNetwork(${pArgs}){
            ...UnlinkSocialNetwork
          }
        }
        ${unlinkFragment}
        `,
      variables,
    }).then(r => r.data || r.data.input);

    if(input){
      await context.userGQL({
        query: gql`
        mutation unlink($input: updateSocialNetworkInput!) {
          updateSocialNetwork(input: $input) {
            socialNetwork {
              ...UnlinkSocialNetwork
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
  createSocialNetwork: mutateAndGetPayload( async (args: {
      id?: string,
      account?: string,
      url?: string,
      type?: object/*SocialNetworkType*/,
      person?: object/*Person*/,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('createSocialNetwork');
    let create: any = {
      account: args.account,
      url: args.url,
    };

    if(args.id) {
      create.id = fromGlobalId(args.id).id;
    }

    let result = await context.connectors.SocialNetwork.create(create);

    if (context.pubsub) {
      context.pubsub.publish('SocialNetwork', {
        SocialNetwork: {
          mutation: 'CREATE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    let socialNetworkEdge = {
      cursor: idToCursor(result.id),
      node: result,
    };


    if (args.type ) {
    
      let $item = args.type;
      if ($item) {
        let type = await ensureSocialNetworkType({
          args: $item,
          context,
          create: true,
        });

        await linkToType({
          context,
          type,
          socialNetwork: result,
        });
      }
    
    }


    if (args.person ) {
    
      let $item = args.person;
      if ($item) {
        let person = await ensurePerson({
          args: $item,
          context,
          create: true,
        });

        await linkToPerson({
          context,
          person,
          socialNetwork: result,
        });
      }
    
    }

    return {
      socialNetwork: socialNetworkEdge,
    };
  }),

  updateSocialNetwork:  mutateAndGetPayload( async (args:  {
      id?: string,
      account?: string,
      url?: string,
      type?: object/*SocialNetworkType*/,
      typeUnlink?: object/*SocialNetworkType*/,
      typeCreate?: object/*SocialNetworkType*/,
      person?: object/*Person*/,
      personUnlink?: object/*Person*/,
      personCreate?: object/*Person*/,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('updateSocialNetwork');
    let payload = {
      account: args.account,
      url: args.url,
    };

    let result;
    let previous;
    try {
      if (args.id) {
        previous = await context.connectors.SocialNetwork.findOneById(fromGlobalId(args.id).id);
        result = await context.connectors.SocialNetwork.findOneByIdAndUpdate(fromGlobalId(args.id).id, payload);
      } else if (args.account) {
        delete payload.account;
        previous = await context.connectors.SocialNetwork.findOneByAccount(args.account);
        result = await context.connectors.SocialNetwork.findOneByAccountAndUpdate(args.account, payload);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('SocialNetwork', {
        SocialNetwork: {
          mutation: 'UPDATE',
          node: result,
          previous,
          updatedFields: Object.keys(payload).filter(f => payload[f]!== undefined),
          payload: args,
        }
      });
    }

    if (args.typeUnlink ) {
    
      let $item = args.typeUnlink;
      if ($item) {
        let type = await ensureSocialNetworkType({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromType({
          context,
          type,
          socialNetwork: result,
        });
      }
    
    }

    if (args.typeCreate ) {
    
      let $item = args.typeCreate;
      if ($item) {
        let type = await ensureSocialNetworkType({
          args: $item,
          context,
          create: true,
        });

        await linkToType({
          context,
          type,
          socialNetwork: result,
        });
      }
    
    }

    if (args.type ) {
    
      let $item = args.type;
      if ($item) {
        let type = await ensureSocialNetworkType({
          args: $item,
          context,
          create: false,
        });

        await linkToType({
          context,
          type,
          socialNetwork: result,
        });
      }
    
    }

    if (args.personUnlink ) {
    
      let $item = args.personUnlink;
      if ($item) {
        let person = await ensurePerson({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromPerson({
          context,
          person,
          socialNetwork: result,
        });
      }
    
    }

    if (args.personCreate ) {
    
      let $item = args.personCreate;
      if ($item) {
        let person = await ensurePerson({
          args: $item,
          context,
          create: true,
        });

        await linkToPerson({
          context,
          person,
          socialNetwork: result,
        });
      }
    
    }

    if (args.person ) {
    
      let $item = args.person;
      if ($item) {
        let person = await ensurePerson({
          args: $item,
          context,
          create: false,
        });

        await linkToPerson({
          context,
          person,
          socialNetwork: result,
        });
      }
    
    }

    return {
      socialNetwork: result,
    };
  }),

  deleteSocialNetwork:  mutateAndGetPayload(async (args: {
      id?: string,
      account?: string,
    },
    context: {
      connectors: RegisterConnectors,
      pubsub: PubSubEngine,
      userGQL: (args: any)=>Promise<any> },
    info,
  ) => {
    logger.trace('deleteSocialNetwork');
    let result;
    try {
      if (args.id) {

        await unlinkSocialNetworkFromAll([{
          key: 'id',
          type: 'ID',
          value: args.id,
        }],
          context,
        );

        result = await context.connectors.SocialNetwork.findOneByIdAndRemove(fromGlobalId(args.id).id);
      } else if (args.account) {

        await unlinkSocialNetworkFromAll([{
          key: 'account',
          type: 'String',
          value: args.account,
        }],
          context,
        );

        result = await context.connectors.SocialNetwork.findOneByAccountAndRemove(args.account);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('SocialNetwork', {
        SocialNetwork: {
          mutation: 'DELETE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    return {
      deletedItemId: toGlobalId('SocialNetwork', result.id),
      socialNetwork: result,
    };
  }),
}
;
