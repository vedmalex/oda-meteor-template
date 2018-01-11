import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Curator');
import gql from 'graphql-tag';
import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

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
async function ensureGroup({
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
  let group;
  if (filter) {
    group = await context.userGQL({
      query: gql`query findGroup(${fArgs}){
            group(${filter}){
              id
            }
          }
          `,
      variables,
    }).then(r => r.data.group);
  }

  if (!group) {
    if (create) {
      group = await context.userGQL({
        query: gql`mutation createGroup($group: createGroupInput!) {
            createGroup(input: $group) {
              group {
                node {
                  id
                }
              }
            }
          }
          `,
        variables: {
          group: args,
        }
      }).then(r => r.data.createGroup.group.node);
    }
  } else {
    // update
    group = await context.userGQL({
      query: gql`mutation updateGroup($group: updateGroupInput!) {
            updateGroup(input: $group) {
              group {
                id
              }
            }
          }
          `,
      variables: {
        group: args,
      }
    }).then(r => r.data.updateGroup.group);
  }
  return group;
}


async function linkToPerson({
  context, person,  curator,
}) {
  if (person) {
    await context.userGQL({
      query: gql`mutation addToCuratorBelongsToPerson($input:addToCuratorBelongsToPersonInput!) {
          addToCuratorBelongsToPerson(input:$input){
            curator {
              id
            }
          }
        }`,
      variables: {
        input: {
          curator: toGlobalId('Curator', curator.id),
          person: person.id,
        }
      }
    });
  }
}

async function unlinkFromPerson({
  context, person,  curator,
}) {
  if (person) {
    await context.userGQL({
      query: gql`mutation removeFromCuratorBelongsToPerson($input: removeFromCuratorBelongsToPersonInput!) {
          removeFromCuratorBelongsToPerson(input:$input){
            curator {
              id
            }
          }
        }`,
      variables: {
        input: {
          curator: toGlobalId('Curator', curator.id),
          person: person.id,
        }
      }
    });
  }
}


async function linkToGroups({
  context, groups,  curator,
}) {
  if (groups) {
    await context.userGQL({
      query: gql`mutation addToCuratorHasManyGroups($input:addToCuratorHasManyGroupsInput!) {
          addToCuratorHasManyGroups(input:$input){
            curator {
              id
            }
          }
        }`,
      variables: {
        input: {
          curator: toGlobalId('Curator', curator.id),
          group: groups.id,
        }
      }
    });
  }
}

async function unlinkFromGroups({
  context, groups,  curator,
}) {
  if (groups) {
    await context.userGQL({
      query: gql`mutation removeFromCuratorHasManyGroups($input: removeFromCuratorHasManyGroupsInput!) {
          removeFromCuratorHasManyGroups(input:$input){
            curator {
              id
            }
          }
        }`,
      variables: {
        input: {
          curator: toGlobalId('Curator', curator.id),
          group: groups.id,
        }
      }
    });
  }
}


async function unlinkCuratorFromAll(args:{
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
      fragment UnlinkCurator on Curator {
        id
        personUnlink: person{
          id
        }
        groupsUnlink: groups@_(get: "edges"){
          edges @_(map: "node"){
            node {
              id
            }
          }
        }
      }
    `;
    const input = await context.userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: curator(${pArgs}){
            ...UnlinkCurator
          }
        }
        ${unlinkFragment}
        `,
      variables,
    }).then(r => r.data || r.data.input);

    if(input){
      await context.userGQL({
        query: gql`
        mutation unlink($input: updateCuratorInput!) {
          updateCurator(input: $input) {
            curator {
              ...UnlinkCurator
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
  createCurator: mutateAndGetPayload( async (args: {
      id?: string,
      person?: object/*Person*/,
      groups?: object/*Group*/[],
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('createCurator');
    let create: any = {
    };

    if(args.id) {
      create.id = fromGlobalId(args.id).id;
    }

    let result = await context.connectors.Curator.create(create);

    if (context.pubsub) {
      context.pubsub.publish('Curator', {
        Curator: {
          mutation: 'CREATE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    let curatorEdge = {
      cursor: idToCursor(result.id),
      node: result,
    };


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
          curator: result,
        });
      }
    
    }


    if (args.groups && Array.isArray(args.groups) && args.groups.length > 0 ) {
    
      for (let i = 0, len = args.groups.length; i < len; i++) {
    
      let $item = args.groups[i];
      if ($item) {
        let groups = await ensureGroup({
          args: $item,
          context,
          create: true,
        });

        await linkToGroups({
          context,
          groups,
          curator: result,
        });
      }
    
      }
    
    }

    return {
      curator: curatorEdge,
    };
  }),

  updateCurator:  mutateAndGetPayload( async (args:  {
      id?: string,
      person?: object/*Person*/,
      personUnlink?: object/*Person*/,
      personCreate?: object/*Person*/,
      groups?: object/*Group*/[],
      groupsUnlink?: object/*Group*/[],
      groupsCreate?: object/*Group*/[],
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('updateCurator');
    let payload = {
    };

    let result;
    let previous;
    try {
      if (args.id) {
        previous = await context.connectors.Curator.findOneById(fromGlobalId(args.id).id);
        result = await context.connectors.Curator.findOneByIdAndUpdate(fromGlobalId(args.id).id, payload);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('Curator', {
        Curator: {
          mutation: 'UPDATE',
          node: result,
          previous,
          updatedFields: Object.keys(payload).filter(f => payload[f]!== undefined),
          payload: args,
        }
      });
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
          curator: result,
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
          curator: result,
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
          curator: result,
        });
      }
    
    }

    if (args.groupsUnlink && Array.isArray(args.groupsUnlink) && args.groupsUnlink.length > 0 ) {
    
      for (let i = 0, len = args.groupsUnlink.length; i < len; i++) {
    
      let $item = args.groupsUnlink[i];
      if ($item) {
        let groups = await ensureGroup({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromGroups({
          context,
          groups,
          curator: result,
        });
      }
    
      }
    
    }

    if (args.groupsCreate && Array.isArray(args.groupsCreate) && args.groupsCreate.length > 0 ) {
    
      for (let i = 0, len = args.groupsCreate.length; i < len; i++) {
    
      let $item = args.groupsCreate[i];
      if ($item) {
        let groups = await ensureGroup({
          args: $item,
          context,
          create: true,
        });

        await linkToGroups({
          context,
          groups,
          curator: result,
        });
      }
    
      }
    
    }

    if (args.groups && Array.isArray(args.groups) && args.groups.length > 0 ) {
    
      for (let i = 0, len = args.groups.length; i < len; i++) {
    
      let $item = args.groups[i];
      if ($item) {
        let groups = await ensureGroup({
          args: $item,
          context,
          create: false,
        });

        await linkToGroups({
          context,
          groups,
          curator: result,
        });
      }
    
      }
    
    }

    return {
      curator: result,
    };
  }),

  deleteCurator:  mutateAndGetPayload(async (args: {
      id?: string,
    },
    context: {
      connectors: RegisterConnectors,
      pubsub: PubSubEngine,
      userGQL: (args: any)=>Promise<any> },
    info,
  ) => {
    logger.trace('deleteCurator');
    let result;
    try {
      if (args.id) {

        await unlinkCuratorFromAll([{
          key: 'id',
          type: 'ID',
          value: args.id,
        }],
          context,
        );

        result = await context.connectors.Curator.findOneByIdAndRemove(fromGlobalId(args.id).id);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('Curator', {
        Curator: {
          mutation: 'DELETE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    return {
      deletedItemId: toGlobalId('Curator', result.id),
      curator: result,
    };
  }),
}
;
