import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Phone');
import gql from 'graphql-tag';
import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

async function ensurePhoneType({
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
  let phoneType;
  if (filter) {
    phoneType = await context.userGQL({
      query: gql`query findPhoneType(${fArgs}){
            phoneType(${filter}){
              id
            }
          }
          `,
      variables,
    }).then(r => r.data.phoneType);
  }

  if (!phoneType) {
    if (create) {
      phoneType = await context.userGQL({
        query: gql`mutation createPhoneType($phoneType: createPhoneTypeInput!) {
            createPhoneType(input: $phoneType) {
              phoneType {
                node {
                  id
                }
              }
            }
          }
          `,
        variables: {
          phoneType: args,
        }
      }).then(r => r.data.createPhoneType.phoneType.node);
    }
  } else {
    // update
    phoneType = await context.userGQL({
      query: gql`mutation updatePhoneType($phoneType: updatePhoneTypeInput!) {
            updatePhoneType(input: $phoneType) {
              phoneType {
                id
              }
            }
          }
          `,
      variables: {
        phoneType: args,
      }
    }).then(r => r.data.updatePhoneType.phoneType);
  }
  return phoneType;
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
  context, type,  phone,
}) {
  if (type) {
    await context.userGQL({
      query: gql`mutation addToPhoneBelongsToType($input:addToPhoneBelongsToTypeInput!) {
          addToPhoneBelongsToType(input:$input){
            phone {
              id
            }
          }
        }`,
      variables: {
        input: {
          phone: toGlobalId('Phone', phone.id),
          phoneType: type.id,
        }
      }
    });
  }
}

async function unlinkFromType({
  context, type,  phone,
}) {
  if (type) {
    await context.userGQL({
      query: gql`mutation removeFromPhoneBelongsToType($input: removeFromPhoneBelongsToTypeInput!) {
          removeFromPhoneBelongsToType(input:$input){
            phone {
              id
            }
          }
        }`,
      variables: {
        input: {
          phone: toGlobalId('Phone', phone.id),
          phoneType: type.id,
        }
      }
    });
  }
}


async function linkToPerson({
  context, person,  phone,
}) {
  if (person) {
    await context.userGQL({
      query: gql`mutation addToPhoneBelongsToPerson($input:addToPhoneBelongsToPersonInput!) {
          addToPhoneBelongsToPerson(input:$input){
            phone {
              id
            }
          }
        }`,
      variables: {
        input: {
          phone: toGlobalId('Phone', phone.id),
          person: person.id,
        }
      }
    });
  }
}

async function unlinkFromPerson({
  context, person,  phone,
}) {
  if (person) {
    await context.userGQL({
      query: gql`mutation removeFromPhoneBelongsToPerson($input: removeFromPhoneBelongsToPersonInput!) {
          removeFromPhoneBelongsToPerson(input:$input){
            phone {
              id
            }
          }
        }`,
      variables: {
        input: {
          phone: toGlobalId('Phone', phone.id),
          person: person.id,
        }
      }
    });
  }
}


async function unlinkPhoneFromAll(args:{
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
      fragment UnlinkPhone on Phone {
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
          input: phone(${pArgs}){
            ...UnlinkPhone
          }
        }
        ${unlinkFragment}
        `,
      variables,
    }).then(r => r.data || r.data.input);

    if(input){
      await context.userGQL({
        query: gql`
        mutation unlink($input: updatePhoneInput!) {
          updatePhone(input: $input) {
            phone {
              ...UnlinkPhone
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
  createPhone: mutateAndGetPayload( async (args: {
      id?: string,
      phoneNumber?: string,
      type?: object/*PhoneType*/,
      person?: object/*Person*/,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('createPhone');
    let create: any = {
      phoneNumber: args.phoneNumber,
    };

    if(args.id) {
      create.id = fromGlobalId(args.id).id;
    }

    let result = await context.connectors.Phone.create(create);

    if (context.pubsub) {
      context.pubsub.publish('Phone', {
        Phone: {
          mutation: 'CREATE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    let phoneEdge = {
      cursor: idToCursor(result.id),
      node: result,
    };


    if (args.type ) {
    
      let $item = args.type;
      if ($item) {
        let type = await ensurePhoneType({
          args: $item,
          context,
          create: true,
        });

        await linkToType({
          context,
          type,
          phone: result,
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
          phone: result,
        });
      }
    
    }

    return {
      phone: phoneEdge,
    };
  }),

  updatePhone:  mutateAndGetPayload( async (args:  {
      id?: string,
      phoneNumber?: string,
      type?: object/*PhoneType*/,
      typeUnlink?: object/*PhoneType*/,
      typeCreate?: object/*PhoneType*/,
      person?: object/*Person*/,
      personUnlink?: object/*Person*/,
      personCreate?: object/*Person*/,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('updatePhone');
    let payload = {
      phoneNumber: args.phoneNumber,
    };

    let result;
    let previous;
    try {
      if (args.id) {
        previous = await context.connectors.Phone.findOneById(fromGlobalId(args.id).id);
        result = await context.connectors.Phone.findOneByIdAndUpdate(fromGlobalId(args.id).id, payload);
      } else if (args.phoneNumber) {
        delete payload.phoneNumber;
        previous = await context.connectors.Phone.findOneByPhoneNumber(args.phoneNumber);
        result = await context.connectors.Phone.findOneByPhoneNumberAndUpdate(args.phoneNumber, payload);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('Phone', {
        Phone: {
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
        let type = await ensurePhoneType({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromType({
          context,
          type,
          phone: result,
        });
      }
    
    }

    if (args.typeCreate ) {
    
      let $item = args.typeCreate;
      if ($item) {
        let type = await ensurePhoneType({
          args: $item,
          context,
          create: true,
        });

        await linkToType({
          context,
          type,
          phone: result,
        });
      }
    
    }

    if (args.type ) {
    
      let $item = args.type;
      if ($item) {
        let type = await ensurePhoneType({
          args: $item,
          context,
          create: false,
        });

        await linkToType({
          context,
          type,
          phone: result,
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
          phone: result,
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
          phone: result,
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
          phone: result,
        });
      }
    
    }

    return {
      phone: result,
    };
  }),

  deletePhone:  mutateAndGetPayload(async (args: {
      id?: string,
      phoneNumber?: string,
    },
    context: {
      connectors: RegisterConnectors,
      pubsub: PubSubEngine,
      userGQL: (args: any)=>Promise<any> },
    info,
  ) => {
    logger.trace('deletePhone');
    let result;
    try {
      if (args.id) {

        await unlinkPhoneFromAll([{
          key: 'id',
          type: 'ID',
          value: args.id,
        }],
          context,
        );

        result = await context.connectors.Phone.findOneByIdAndRemove(fromGlobalId(args.id).id);
      } else if (args.phoneNumber) {

        await unlinkPhoneFromAll([{
          key: 'phoneNumber',
          type: 'String',
          value: args.phoneNumber,
        }],
          context,
        );

        result = await context.connectors.Phone.findOneByPhoneNumberAndRemove(args.phoneNumber);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('Phone', {
        Phone: {
          mutation: 'DELETE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    return {
      deletedItemId: toGlobalId('Phone', result.id),
      phone: result,
    };
  }),
}
;
