import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Student');
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
  context, person,  student,
}) {
  if (person) {
    await context.userGQL({
      query: gql`mutation addToStudentBelongsToPerson($input:addToStudentBelongsToPersonInput!) {
          addToStudentBelongsToPerson(input:$input){
            student {
              id
            }
          }
        }`,
      variables: {
        input: {
          student: toGlobalId('Student', student.id),
          person: person.id,
        }
      }
    });
  }
}

async function unlinkFromPerson({
  context, person,  student,
}) {
  if (person) {
    await context.userGQL({
      query: gql`mutation removeFromStudentBelongsToPerson($input: removeFromStudentBelongsToPersonInput!) {
          removeFromStudentBelongsToPerson(input:$input){
            student {
              id
            }
          }
        }`,
      variables: {
        input: {
          student: toGlobalId('Student', student.id),
          person: person.id,
        }
      }
    });
  }
}


async function linkToGroup({
  context, group,  student,
}) {
  if (group) {
    await context.userGQL({
      query: gql`mutation addToStudentBelongsToGroup($input:addToStudentBelongsToGroupInput!) {
          addToStudentBelongsToGroup(input:$input){
            student {
              id
            }
          }
        }`,
      variables: {
        input: {
          student: toGlobalId('Student', student.id),
          group: group.id,
        }
      }
    });
  }
}

async function unlinkFromGroup({
  context, group,  student,
}) {
  if (group) {
    await context.userGQL({
      query: gql`mutation removeFromStudentBelongsToGroup($input: removeFromStudentBelongsToGroupInput!) {
          removeFromStudentBelongsToGroup(input:$input){
            student {
              id
            }
          }
        }`,
      variables: {
        input: {
          student: toGlobalId('Student', student.id),
          group: group.id,
        }
      }
    });
  }
}


async function unlinkStudentFromAll(args:{
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
      fragment UnlinkStudent on Student {
        id
        personUnlink: person{
          id
        }
        groupUnlink: group{
          id
        }
      }
    `;
    const input = await context.userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: student(${pArgs}){
            ...UnlinkStudent
          }
        }
        ${unlinkFragment}
        `,
      variables,
    }).then(r => r.data || r.data.input);

    if(input){
      await context.userGQL({
        query: gql`
        mutation unlink($input: updateStudentInput!) {
          updateStudent(input: $input) {
            student {
              ...UnlinkStudent
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
  createStudent: mutateAndGetPayload( async (args: {
      id?: string,
      person?: object/*Person*/,
      group?: object/*Group*/,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('createStudent');
    let create: any = {
    };

    if(args.id) {
      create.id = fromGlobalId(args.id).id;
    }

    let result = await context.connectors.Student.create(create);

    if (context.pubsub) {
      context.pubsub.publish('Student', {
        Student: {
          mutation: 'CREATE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    let studentEdge = {
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
          student: result,
        });
      }
    
    }


    if (args.group ) {
    
      let $item = args.group;
      if ($item) {
        let group = await ensureGroup({
          args: $item,
          context,
          create: true,
        });

        await linkToGroup({
          context,
          group,
          student: result,
        });
      }
    
    }

    return {
      student: studentEdge,
    };
  }),

  updateStudent:  mutateAndGetPayload( async (args:  {
      id?: string,
      person?: object/*Person*/,
      personUnlink?: object/*Person*/,
      personCreate?: object/*Person*/,
      group?: object/*Group*/,
      groupUnlink?: object/*Group*/,
      groupCreate?: object/*Group*/,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('updateStudent');
    let payload = {
    };

    let result;
    let previous;
    try {
      if (args.id) {
        previous = await context.connectors.Student.findOneById(fromGlobalId(args.id).id);
        result = await context.connectors.Student.findOneByIdAndUpdate(fromGlobalId(args.id).id, payload);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('Student', {
        Student: {
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
          student: result,
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
          student: result,
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
          student: result,
        });
      }
    
    }

    if (args.groupUnlink ) {
    
      let $item = args.groupUnlink;
      if ($item) {
        let group = await ensureGroup({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromGroup({
          context,
          group,
          student: result,
        });
      }
    
    }

    if (args.groupCreate ) {
    
      let $item = args.groupCreate;
      if ($item) {
        let group = await ensureGroup({
          args: $item,
          context,
          create: true,
        });

        await linkToGroup({
          context,
          group,
          student: result,
        });
      }
    
    }

    if (args.group ) {
    
      let $item = args.group;
      if ($item) {
        let group = await ensureGroup({
          args: $item,
          context,
          create: false,
        });

        await linkToGroup({
          context,
          group,
          student: result,
        });
      }
    
    }

    return {
      student: result,
    };
  }),

  deleteStudent:  mutateAndGetPayload(async (args: {
      id?: string,
    },
    context: {
      connectors: RegisterConnectors,
      pubsub: PubSubEngine,
      userGQL: (args: any)=>Promise<any> },
    info,
  ) => {
    logger.trace('deleteStudent');
    let result;
    try {
      if (args.id) {

        await unlinkStudentFromAll([{
          key: 'id',
          type: 'ID',
          value: args.id,
        }],
          context,
        );

        result = await context.connectors.Student.findOneByIdAndRemove(fromGlobalId(args.id).id);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('Student', {
        Student: {
          mutation: 'DELETE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    return {
      deletedItemId: toGlobalId('Student', result.id),
      student: result,
    };
  }),
}
;
