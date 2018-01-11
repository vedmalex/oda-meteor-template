import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Group');
import gql from 'graphql-tag';
import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

async function ensureStudent({
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

  }
  let student;
  if (filter) {
    student = await context.userGQL({
      query: gql`query findStudent(${fArgs}){
            student(${filter}){
              id
            }
          }
          `,
      variables,
    }).then(r => r.data.student);
  }

  if (!student) {
    if (create) {
      student = await context.userGQL({
        query: gql`mutation createStudent($student: createStudentInput!) {
            createStudent(input: $student) {
              student {
                node {
                  id
                }
              }
            }
          }
          `,
        variables: {
          student: args,
        }
      }).then(r => r.data.createStudent.student.node);
    }
  } else {
    // update
    student = await context.userGQL({
      query: gql`mutation updateStudent($student: updateStudentInput!) {
            updateStudent(input: $student) {
              student {
                id
              }
            }
          }
          `,
      variables: {
        student: args,
      }
    }).then(r => r.data.updateStudent.student);
  }
  return student;
}
async function ensureCurator({
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

  }
  let curator;
  if (filter) {
    curator = await context.userGQL({
      query: gql`query findCurator(${fArgs}){
            curator(${filter}){
              id
            }
          }
          `,
      variables,
    }).then(r => r.data.curator);
  }

  if (!curator) {
    if (create) {
      curator = await context.userGQL({
        query: gql`mutation createCurator($curator: createCuratorInput!) {
            createCurator(input: $curator) {
              curator {
                node {
                  id
                }
              }
            }
          }
          `,
        variables: {
          curator: args,
        }
      }).then(r => r.data.createCurator.curator.node);
    }
  } else {
    // update
    curator = await context.userGQL({
      query: gql`mutation updateCurator($curator: updateCuratorInput!) {
            updateCurator(input: $curator) {
              curator {
                id
              }
            }
          }
          `,
      variables: {
        curator: args,
      }
    }).then(r => r.data.updateCurator.curator);
  }
  return curator;
}


async function linkToStudents({
  context, students,  group,
}) {
  if (students) {
    await context.userGQL({
      query: gql`mutation addToGroupHasManyStudents($input:addToGroupHasManyStudentsInput!) {
          addToGroupHasManyStudents(input:$input){
            group {
              id
            }
          }
        }`,
      variables: {
        input: {
          group: toGlobalId('Group', group.id),
          student: students.id,
        }
      }
    });
  }
}

async function unlinkFromStudents({
  context, students,  group,
}) {
  if (students) {
    await context.userGQL({
      query: gql`mutation removeFromGroupHasManyStudents($input: removeFromGroupHasManyStudentsInput!) {
          removeFromGroupHasManyStudents(input:$input){
            group {
              id
            }
          }
        }`,
      variables: {
        input: {
          group: toGlobalId('Group', group.id),
          student: students.id,
        }
      }
    });
  }
}


async function linkToCurator({
  context, curator,  group,
}) {
  if (curator) {
    await context.userGQL({
      query: gql`mutation addToGroupBelongsToCurator($input:addToGroupBelongsToCuratorInput!) {
          addToGroupBelongsToCurator(input:$input){
            group {
              id
            }
          }
        }`,
      variables: {
        input: {
          group: toGlobalId('Group', group.id),
          curator: curator.id,
        }
      }
    });
  }
}

async function unlinkFromCurator({
  context, curator,  group,
}) {
  if (curator) {
    await context.userGQL({
      query: gql`mutation removeFromGroupBelongsToCurator($input: removeFromGroupBelongsToCuratorInput!) {
          removeFromGroupBelongsToCurator(input:$input){
            group {
              id
            }
          }
        }`,
      variables: {
        input: {
          group: toGlobalId('Group', group.id),
          curator: curator.id,
        }
      }
    });
  }
}


async function unlinkGroupFromAll(args:{
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
      fragment UnlinkGroup on Group {
        id
        studentsUnlink: students@_(get: "edges"){
          edges @_(map: "node"){
            node {
              id
            }
          }
        }
        curatorUnlink: curator{
          id
        }
      }
    `;
    const input = await context.userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: group(${pArgs}){
            ...UnlinkGroup
          }
        }
        ${unlinkFragment}
        `,
      variables,
    }).then(r => r.data || r.data.input);

    if(input){
      await context.userGQL({
        query: gql`
        mutation unlink($input: updateGroupInput!) {
          updateGroup(input: $input) {
            group {
              ...UnlinkGroup
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
  createGroup: mutateAndGetPayload( async (args: {
      id?: string,
      name?: string,
      students?: object/*Student*/[],
      curator?: object/*Curator*/,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('createGroup');
    let create: any = {
      name: args.name,
    };

    if(args.id) {
      create.id = fromGlobalId(args.id).id;
    }

    let result = await context.connectors.Group.create(create);

    if (context.pubsub) {
      context.pubsub.publish('Group', {
        Group: {
          mutation: 'CREATE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    let groupEdge = {
      cursor: idToCursor(result.id),
      node: result,
    };


    if (args.students && Array.isArray(args.students) && args.students.length > 0 ) {
    
      for (let i = 0, len = args.students.length; i < len; i++) {
    
      let $item = args.students[i];
      if ($item) {
        let students = await ensureStudent({
          args: $item,
          context,
          create: true,
        });

        await linkToStudents({
          context,
          students,
          group: result,
        });
      }
    
      }
    
    }


    if (args.curator ) {
    
      let $item = args.curator;
      if ($item) {
        let curator = await ensureCurator({
          args: $item,
          context,
          create: true,
        });

        await linkToCurator({
          context,
          curator,
          group: result,
        });
      }
    
    }

    return {
      group: groupEdge,
    };
  }),

  updateGroup:  mutateAndGetPayload( async (args:  {
      id?: string,
      name?: string,
      students?: object/*Student*/[],
      studentsUnlink?: object/*Student*/[],
      studentsCreate?: object/*Student*/[],
      curator?: object/*Curator*/,
      curatorUnlink?: object/*Curator*/,
      curatorCreate?: object/*Curator*/,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('updateGroup');
    let payload = {
      name: args.name,
    };

    let result;
    let previous;
    try {
      if (args.id) {
        previous = await context.connectors.Group.findOneById(fromGlobalId(args.id).id);
        result = await context.connectors.Group.findOneByIdAndUpdate(fromGlobalId(args.id).id, payload);
      } else if (args.name) {
        delete payload.name;
        previous = await context.connectors.Group.findOneByName(args.name);
        result = await context.connectors.Group.findOneByNameAndUpdate(args.name, payload);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('Group', {
        Group: {
          mutation: 'UPDATE',
          node: result,
          previous,
          updatedFields: Object.keys(payload).filter(f => payload[f]!== undefined),
          payload: args,
        }
      });
    }

    if (args.studentsUnlink && Array.isArray(args.studentsUnlink) && args.studentsUnlink.length > 0 ) {
    
      for (let i = 0, len = args.studentsUnlink.length; i < len; i++) {
    
      let $item = args.studentsUnlink[i];
      if ($item) {
        let students = await ensureStudent({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromStudents({
          context,
          students,
          group: result,
        });
      }
    
      }
    
    }

    if (args.studentsCreate && Array.isArray(args.studentsCreate) && args.studentsCreate.length > 0 ) {
    
      for (let i = 0, len = args.studentsCreate.length; i < len; i++) {
    
      let $item = args.studentsCreate[i];
      if ($item) {
        let students = await ensureStudent({
          args: $item,
          context,
          create: true,
        });

        await linkToStudents({
          context,
          students,
          group: result,
        });
      }
    
      }
    
    }

    if (args.students && Array.isArray(args.students) && args.students.length > 0 ) {
    
      for (let i = 0, len = args.students.length; i < len; i++) {
    
      let $item = args.students[i];
      if ($item) {
        let students = await ensureStudent({
          args: $item,
          context,
          create: false,
        });

        await linkToStudents({
          context,
          students,
          group: result,
        });
      }
    
      }
    
    }

    if (args.curatorUnlink ) {
    
      let $item = args.curatorUnlink;
      if ($item) {
        let curator = await ensureCurator({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromCurator({
          context,
          curator,
          group: result,
        });
      }
    
    }

    if (args.curatorCreate ) {
    
      let $item = args.curatorCreate;
      if ($item) {
        let curator = await ensureCurator({
          args: $item,
          context,
          create: true,
        });

        await linkToCurator({
          context,
          curator,
          group: result,
        });
      }
    
    }

    if (args.curator ) {
    
      let $item = args.curator;
      if ($item) {
        let curator = await ensureCurator({
          args: $item,
          context,
          create: false,
        });

        await linkToCurator({
          context,
          curator,
          group: result,
        });
      }
    
    }

    return {
      group: result,
    };
  }),

  deleteGroup:  mutateAndGetPayload(async (args: {
      id?: string,
      name?: string,
    },
    context: {
      connectors: RegisterConnectors,
      pubsub: PubSubEngine,
      userGQL: (args: any)=>Promise<any> },
    info,
  ) => {
    logger.trace('deleteGroup');
    let result;
    try {
      if (args.id) {

        await unlinkGroupFromAll([{
          key: 'id',
          type: 'ID',
          value: args.id,
        }],
          context,
        );

        result = await context.connectors.Group.findOneByIdAndRemove(fromGlobalId(args.id).id);
      } else if (args.name) {

        await unlinkGroupFromAll([{
          key: 'name',
          type: 'String',
          value: args.name,
        }],
          context,
        );

        result = await context.connectors.Group.findOneByNameAndRemove(args.name);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('Group', {
        Group: {
          mutation: 'DELETE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    return {
      deletedItemId: toGlobalId('Group', result.id),
      group: result,
    };
  }),
}
;
