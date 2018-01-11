import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Email');
import gql from 'graphql-tag';
import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

async function ensureEmailType({
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
  let emailType;
  if (filter) {
    emailType = await context.userGQL({
      query: gql`query findEmailType(${fArgs}){
            emailType(${filter}){
              id
            }
          }
          `,
      variables,
    }).then(r => r.data.emailType);
  }

  if (!emailType) {
    if (create) {
      emailType = await context.userGQL({
        query: gql`mutation createEmailType($emailType: createEmailTypeInput!) {
            createEmailType(input: $emailType) {
              emailType {
                node {
                  id
                }
              }
            }
          }
          `,
        variables: {
          emailType: args,
        }
      }).then(r => r.data.createEmailType.emailType.node);
    }
  } else {
    // update
    emailType = await context.userGQL({
      query: gql`mutation updateEmailType($emailType: updateEmailTypeInput!) {
            updateEmailType(input: $emailType) {
              emailType {
                id
              }
            }
          }
          `,
      variables: {
        emailType: args,
      }
    }).then(r => r.data.updateEmailType.emailType);
  }
  return emailType;
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
  context, type,  email,
}) {
  if (type) {
    await context.userGQL({
      query: gql`mutation addToEmailBelongsToType($input:addToEmailBelongsToTypeInput!) {
          addToEmailBelongsToType(input:$input){
            email {
              id
            }
          }
        }`,
      variables: {
        input: {
          email: toGlobalId('Email', email.id),
          emailType: type.id,
        }
      }
    });
  }
}

async function unlinkFromType({
  context, type,  email,
}) {
  if (type) {
    await context.userGQL({
      query: gql`mutation removeFromEmailBelongsToType($input: removeFromEmailBelongsToTypeInput!) {
          removeFromEmailBelongsToType(input:$input){
            email {
              id
            }
          }
        }`,
      variables: {
        input: {
          email: toGlobalId('Email', email.id),
          emailType: type.id,
        }
      }
    });
  }
}


async function linkToPerson({
  context, person,  email,
}) {
  if (person) {
    await context.userGQL({
      query: gql`mutation addToEmailBelongsToPerson($input:addToEmailBelongsToPersonInput!) {
          addToEmailBelongsToPerson(input:$input){
            email {
              id
            }
          }
        }`,
      variables: {
        input: {
          email: toGlobalId('Email', email.id),
          person: person.id,
        }
      }
    });
  }
}

async function unlinkFromPerson({
  context, person,  email,
}) {
  if (person) {
    await context.userGQL({
      query: gql`mutation removeFromEmailBelongsToPerson($input: removeFromEmailBelongsToPersonInput!) {
          removeFromEmailBelongsToPerson(input:$input){
            email {
              id
            }
          }
        }`,
      variables: {
        input: {
          email: toGlobalId('Email', email.id),
          person: person.id,
        }
      }
    });
  }
}


async function unlinkEmailFromAll(args:{
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
      fragment UnlinkEmail on Email {
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
          input: email(${pArgs}){
            ...UnlinkEmail
          }
        }
        ${unlinkFragment}
        `,
      variables,
    }).then(r => r.data || r.data.input);

    if(input){
      await context.userGQL({
        query: gql`
        mutation unlink($input: updateEmailInput!) {
          updateEmail(input: $input) {
            email {
              ...UnlinkEmail
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
  createEmail: mutateAndGetPayload( async (args: {
      id?: string,
      email?: string,
      type?: object/*EmailType*/,
      person?: object/*Person*/,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('createEmail');
    let create: any = {
      email: args.email,
    };

    if(args.id) {
      create.id = fromGlobalId(args.id).id;
    }

    let result = await context.connectors.Email.create(create);

    if (context.pubsub) {
      context.pubsub.publish('Email', {
        Email: {
          mutation: 'CREATE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    let emailEdge = {
      cursor: idToCursor(result.id),
      node: result,
    };


    if (args.type ) {
    
      let $item = args.type;
      if ($item) {
        let type = await ensureEmailType({
          args: $item,
          context,
          create: true,
        });

        await linkToType({
          context,
          type,
          email: result,
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
          email: result,
        });
      }
    
    }

    return {
      email: emailEdge,
    };
  }),

  updateEmail:  mutateAndGetPayload( async (args:  {
      id?: string,
      email?: string,
      type?: object/*EmailType*/,
      typeUnlink?: object/*EmailType*/,
      typeCreate?: object/*EmailType*/,
      person?: object/*Person*/,
      personUnlink?: object/*Person*/,
      personCreate?: object/*Person*/,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('updateEmail');
    let payload = {
      email: args.email,
    };

    let result;
    let previous;
    try {
      if (args.id) {
        previous = await context.connectors.Email.findOneById(fromGlobalId(args.id).id);
        result = await context.connectors.Email.findOneByIdAndUpdate(fromGlobalId(args.id).id, payload);
      } else if (args.email) {
        delete payload.email;
        previous = await context.connectors.Email.findOneByEmail(args.email);
        result = await context.connectors.Email.findOneByEmailAndUpdate(args.email, payload);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('Email', {
        Email: {
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
        let type = await ensureEmailType({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromType({
          context,
          type,
          email: result,
        });
      }
    
    }

    if (args.typeCreate ) {
    
      let $item = args.typeCreate;
      if ($item) {
        let type = await ensureEmailType({
          args: $item,
          context,
          create: true,
        });

        await linkToType({
          context,
          type,
          email: result,
        });
      }
    
    }

    if (args.type ) {
    
      let $item = args.type;
      if ($item) {
        let type = await ensureEmailType({
          args: $item,
          context,
          create: false,
        });

        await linkToType({
          context,
          type,
          email: result,
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
          email: result,
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
          email: result,
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
          email: result,
        });
      }
    
    }

    return {
      email: result,
    };
  }),

  deleteEmail:  mutateAndGetPayload(async (args: {
      id?: string,
      email?: string,
    },
    context: {
      connectors: RegisterConnectors,
      pubsub: PubSubEngine,
      userGQL: (args: any)=>Promise<any> },
    info,
  ) => {
    logger.trace('deleteEmail');
    let result;
    try {
      if (args.id) {

        await unlinkEmailFromAll([{
          key: 'id',
          type: 'ID',
          value: args.id,
        }],
          context,
        );

        result = await context.connectors.Email.findOneByIdAndRemove(fromGlobalId(args.id).id);
      } else if (args.email) {

        await unlinkEmailFromAll([{
          key: 'email',
          type: 'String',
          value: args.email,
        }],
          context,
        );

        result = await context.connectors.Email.findOneByEmailAndRemove(args.email);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('Email', {
        Email: {
          mutation: 'DELETE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    return {
      deletedItemId: toGlobalId('Email', result.id),
      email: result,
    };
  }),
}
;
