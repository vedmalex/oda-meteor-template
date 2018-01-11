import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Person');
import gql from 'graphql-tag';
import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

async function ensureUser({
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

  } else if (args.userName) {
    fArgs = '$userName: String';
    filter = 'userName: $userName';
    variables = {
      userName: args.userName,
    };
  }
  let user;
  if (filter) {
    user = await context.userGQL({
      query: gql`query findUser(${fArgs}){
            user(${filter}){
              id
            }
          }
          `,
      variables,
    }).then(r => r.data.user);
  }

  if (!user) {
    if (create) {
      user = await context.userGQL({
        query: gql`mutation createUser($user: createUserInput!) {
            createUser(input: $user) {
              user {
                node {
                  id
                }
              }
            }
          }
          `,
        variables: {
          user: args,
        }
      }).then(r => r.data.createUser.user.node);
    }
  } else {
    // update
    user = await context.userGQL({
      query: gql`mutation updateUser($user: updateUserInput!) {
            updateUser(input: $user) {
              user {
                id
              }
            }
          }
          `,
      variables: {
        user: args,
      }
    }).then(r => r.data.updateUser.user);
  }
  return user;
}
async function ensureSocialNetwork({
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

  } else if (args.account) {
    fArgs = '$account: String';
    filter = 'account: $account';
    variables = {
      account: args.account,
    };
  }
  let socialNetwork;
  if (filter) {
    socialNetwork = await context.userGQL({
      query: gql`query findSocialNetwork(${fArgs}){
            socialNetwork(${filter}){
              id
            }
          }
          `,
      variables,
    }).then(r => r.data.socialNetwork);
  }

  if (!socialNetwork) {
    if (create) {
      socialNetwork = await context.userGQL({
        query: gql`mutation createSocialNetwork($socialNetwork: createSocialNetworkInput!) {
            createSocialNetwork(input: $socialNetwork) {
              socialNetwork {
                node {
                  id
                }
              }
            }
          }
          `,
        variables: {
          socialNetwork: args,
        }
      }).then(r => r.data.createSocialNetwork.socialNetwork.node);
    }
  } else {
    // update
    socialNetwork = await context.userGQL({
      query: gql`mutation updateSocialNetwork($socialNetwork: updateSocialNetworkInput!) {
            updateSocialNetwork(input: $socialNetwork) {
              socialNetwork {
                id
              }
            }
          }
          `,
      variables: {
        socialNetwork: args,
      }
    }).then(r => r.data.updateSocialNetwork.socialNetwork);
  }
  return socialNetwork;
}
async function ensurePhone({
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

  } else if (args.phoneNumber) {
    fArgs = '$phoneNumber: String';
    filter = 'phoneNumber: $phoneNumber';
    variables = {
      phoneNumber: args.phoneNumber,
    };
  }
  let phone;
  if (filter) {
    phone = await context.userGQL({
      query: gql`query findPhone(${fArgs}){
            phone(${filter}){
              id
            }
          }
          `,
      variables,
    }).then(r => r.data.phone);
  }

  if (!phone) {
    if (create) {
      phone = await context.userGQL({
        query: gql`mutation createPhone($phone: createPhoneInput!) {
            createPhone(input: $phone) {
              phone {
                node {
                  id
                }
              }
            }
          }
          `,
        variables: {
          phone: args,
        }
      }).then(r => r.data.createPhone.phone.node);
    }
  } else {
    // update
    phone = await context.userGQL({
      query: gql`mutation updatePhone($phone: updatePhoneInput!) {
            updatePhone(input: $phone) {
              phone {
                id
              }
            }
          }
          `,
      variables: {
        phone: args,
      }
    }).then(r => r.data.updatePhone.phone);
  }
  return phone;
}
async function ensureEmail({
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

  } else if (args.email) {
    fArgs = '$email: String';
    filter = 'email: $email';
    variables = {
      email: args.email,
    };
  }
  let email;
  if (filter) {
    email = await context.userGQL({
      query: gql`query findEmail(${fArgs}){
            email(${filter}){
              id
            }
          }
          `,
      variables,
    }).then(r => r.data.email);
  }

  if (!email) {
    if (create) {
      email = await context.userGQL({
        query: gql`mutation createEmail($email: createEmailInput!) {
            createEmail(input: $email) {
              email {
                node {
                  id
                }
              }
            }
          }
          `,
        variables: {
          email: args,
        }
      }).then(r => r.data.createEmail.email.node);
    }
  } else {
    // update
    email = await context.userGQL({
      query: gql`mutation updateEmail($email: updateEmailInput!) {
            updateEmail(input: $email) {
              email {
                id
              }
            }
          }
          `,
      variables: {
        email: args,
      }
    }).then(r => r.data.updateEmail.email);
  }
  return email;
}
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


async function linkToUser({
  context, user,  person,
}) {
  if (user) {
    await context.userGQL({
      query: gql`mutation addToPersonBelongsToUser($input:addToPersonBelongsToUserInput!) {
          addToPersonBelongsToUser(input:$input){
            person {
              id
            }
          }
        }`,
      variables: {
        input: {
          person: toGlobalId('Person', person.id),
          user: user.id,
        }
      }
    });
  }
}

async function unlinkFromUser({
  context, user,  person,
}) {
  if (user) {
    await context.userGQL({
      query: gql`mutation removeFromPersonBelongsToUser($input: removeFromPersonBelongsToUserInput!) {
          removeFromPersonBelongsToUser(input:$input){
            person {
              id
            }
          }
        }`,
      variables: {
        input: {
          person: toGlobalId('Person', person.id),
          user: user.id,
        }
      }
    });
  }
}


async function linkToSocialNetworks({
  context, socialNetworks,  person,
}) {
  if (socialNetworks) {
    await context.userGQL({
      query: gql`mutation addToPersonHasManySocialNetworks($input:addToPersonHasManySocialNetworksInput!) {
          addToPersonHasManySocialNetworks(input:$input){
            person {
              id
            }
          }
        }`,
      variables: {
        input: {
          person: toGlobalId('Person', person.id),
          socialNetwork: socialNetworks.id,
        }
      }
    });
  }
}

async function unlinkFromSocialNetworks({
  context, socialNetworks,  person,
}) {
  if (socialNetworks) {
    await context.userGQL({
      query: gql`mutation removeFromPersonHasManySocialNetworks($input: removeFromPersonHasManySocialNetworksInput!) {
          removeFromPersonHasManySocialNetworks(input:$input){
            person {
              id
            }
          }
        }`,
      variables: {
        input: {
          person: toGlobalId('Person', person.id),
          socialNetwork: socialNetworks.id,
        }
      }
    });
  }
}


async function linkToPhones({
  context, phones,  person,
}) {
  if (phones) {
    await context.userGQL({
      query: gql`mutation addToPersonHasManyPhones($input:addToPersonHasManyPhonesInput!) {
          addToPersonHasManyPhones(input:$input){
            person {
              id
            }
          }
        }`,
      variables: {
        input: {
          person: toGlobalId('Person', person.id),
          phone: phones.id,
        }
      }
    });
  }
}

async function unlinkFromPhones({
  context, phones,  person,
}) {
  if (phones) {
    await context.userGQL({
      query: gql`mutation removeFromPersonHasManyPhones($input: removeFromPersonHasManyPhonesInput!) {
          removeFromPersonHasManyPhones(input:$input){
            person {
              id
            }
          }
        }`,
      variables: {
        input: {
          person: toGlobalId('Person', person.id),
          phone: phones.id,
        }
      }
    });
  }
}


async function linkToEmails({
  context, emails,  person,
}) {
  if (emails) {
    await context.userGQL({
      query: gql`mutation addToPersonHasManyEmails($input:addToPersonHasManyEmailsInput!) {
          addToPersonHasManyEmails(input:$input){
            person {
              id
            }
          }
        }`,
      variables: {
        input: {
          person: toGlobalId('Person', person.id),
          email: emails.id,
        }
      }
    });
  }
}

async function unlinkFromEmails({
  context, emails,  person,
}) {
  if (emails) {
    await context.userGQL({
      query: gql`mutation removeFromPersonHasManyEmails($input: removeFromPersonHasManyEmailsInput!) {
          removeFromPersonHasManyEmails(input:$input){
            person {
              id
            }
          }
        }`,
      variables: {
        input: {
          person: toGlobalId('Person', person.id),
          email: emails.id,
        }
      }
    });
  }
}


async function linkToAsStudents({
  context, asStudents,  person,
}) {
  if (asStudents) {
    await context.userGQL({
      query: gql`mutation addToPersonHasManyAsStudents($input:addToPersonHasManyAsStudentsInput!) {
          addToPersonHasManyAsStudents(input:$input){
            person {
              id
            }
          }
        }`,
      variables: {
        input: {
          person: toGlobalId('Person', person.id),
          student: asStudents.id,
        }
      }
    });
  }
}

async function unlinkFromAsStudents({
  context, asStudents,  person,
}) {
  if (asStudents) {
    await context.userGQL({
      query: gql`mutation removeFromPersonHasManyAsStudents($input: removeFromPersonHasManyAsStudentsInput!) {
          removeFromPersonHasManyAsStudents(input:$input){
            person {
              id
            }
          }
        }`,
      variables: {
        input: {
          person: toGlobalId('Person', person.id),
          student: asStudents.id,
        }
      }
    });
  }
}


async function linkToAsCurator({
  context, asCurator,  person,
}) {
  if (asCurator) {
    await context.userGQL({
      query: gql`mutation addToPersonHasOneAsCurator($input:addToPersonHasOneAsCuratorInput!) {
          addToPersonHasOneAsCurator(input:$input){
            person {
              id
            }
          }
        }`,
      variables: {
        input: {
          person: toGlobalId('Person', person.id),
          curator: asCurator.id,
        }
      }
    });
  }
}

async function unlinkFromAsCurator({
  context, asCurator,  person,
}) {
  if (asCurator) {
    await context.userGQL({
      query: gql`mutation removeFromPersonHasOneAsCurator($input: removeFromPersonHasOneAsCuratorInput!) {
          removeFromPersonHasOneAsCurator(input:$input){
            person {
              id
            }
          }
        }`,
      variables: {
        input: {
          person: toGlobalId('Person', person.id),
          curator: asCurator.id,
        }
      }
    });
  }
}


async function unlinkPersonFromAll(args:{
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
      fragment UnlinkPerson on Person {
        id
        userUnlink: user{
          id
        }
        socialNetworksUnlink: socialNetworks@_(get: "edges"){
          edges @_(map: "node"){
            node {
              id
            }
          }
        }
        phonesUnlink: phones@_(get: "edges"){
          edges @_(map: "node"){
            node {
              id
            }
          }
        }
        emailsUnlink: emails@_(get: "edges"){
          edges @_(map: "node"){
            node {
              id
            }
          }
        }
        asStudentsUnlink: asStudents@_(get: "edges"){
          edges @_(map: "node"){
            node {
              id
            }
          }
        }
        asCuratorUnlink: asCurator{
          id
        }
      }
    `;
    const input = await context.userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: person(${pArgs}){
            ...UnlinkPerson
          }
        }
        ${unlinkFragment}
        `,
      variables,
    }).then(r => r.data || r.data.input);

    if(input){
      await context.userGQL({
        query: gql`
        mutation unlink($input: updatePersonInput!) {
          updatePerson(input: $input) {
            person {
              ...UnlinkPerson
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
  createPerson: mutateAndGetPayload( async (args: {
      id?: string,
      spiritualName?: string,
      fullName?: string,
      dateOfBirth?: Date,
      specialNotes?: string,
      user?: object/*User*/,
      socialNetworks?: object/*SocialNetwork*/[],
      phones?: object/*Phone*/[],
      emails?: object/*Email*/[],
      asStudents?: object/*Student*/[],
      asCurator?: object/*Curator*/,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('createPerson');
    let create: any = {
      spiritualName: args.spiritualName,
      fullName: args.fullName,
      dateOfBirth: args.dateOfBirth,
      specialNotes: args.specialNotes,
    };

    if(args.id) {
      create.id = fromGlobalId(args.id).id;
    }

    let result = await context.connectors.Person.create(create);

    if (context.pubsub) {
      context.pubsub.publish('Person', {
        Person: {
          mutation: 'CREATE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    let personEdge = {
      cursor: idToCursor(result.id),
      node: result,
    };


    if (args.user ) {
    
      let $item = args.user;
      if ($item) {
        let user = await ensureUser({
          args: $item,
          context,
          create: true,
        });

        await linkToUser({
          context,
          user,
          person: result,
        });
      }
    
    }


    if (args.socialNetworks && Array.isArray(args.socialNetworks) && args.socialNetworks.length > 0 ) {
    
      for (let i = 0, len = args.socialNetworks.length; i < len; i++) {
    
      let $item = args.socialNetworks[i];
      if ($item) {
        let socialNetworks = await ensureSocialNetwork({
          args: $item,
          context,
          create: true,
        });

        await linkToSocialNetworks({
          context,
          socialNetworks,
          person: result,
        });
      }
    
      }
    
    }


    if (args.phones && Array.isArray(args.phones) && args.phones.length > 0 ) {
    
      for (let i = 0, len = args.phones.length; i < len; i++) {
    
      let $item = args.phones[i];
      if ($item) {
        let phones = await ensurePhone({
          args: $item,
          context,
          create: true,
        });

        await linkToPhones({
          context,
          phones,
          person: result,
        });
      }
    
      }
    
    }


    if (args.emails && Array.isArray(args.emails) && args.emails.length > 0 ) {
    
      for (let i = 0, len = args.emails.length; i < len; i++) {
    
      let $item = args.emails[i];
      if ($item) {
        let emails = await ensureEmail({
          args: $item,
          context,
          create: true,
        });

        await linkToEmails({
          context,
          emails,
          person: result,
        });
      }
    
      }
    
    }


    if (args.asStudents && Array.isArray(args.asStudents) && args.asStudents.length > 0 ) {
    
      for (let i = 0, len = args.asStudents.length; i < len; i++) {
    
      let $item = args.asStudents[i];
      if ($item) {
        let asStudents = await ensureStudent({
          args: $item,
          context,
          create: true,
        });

        await linkToAsStudents({
          context,
          asStudents,
          person: result,
        });
      }
    
      }
    
    }


    if (args.asCurator ) {
    
      let $item = args.asCurator;
      if ($item) {
        let asCurator = await ensureCurator({
          args: $item,
          context,
          create: true,
        });

        await linkToAsCurator({
          context,
          asCurator,
          person: result,
        });
      }
    
    }

    return {
      person: personEdge,
    };
  }),

  updatePerson:  mutateAndGetPayload( async (args:  {
      id?: string,
      spiritualName?: string,
      fullName?: string,
      dateOfBirth?: Date,
      specialNotes?: string,
      user?: object/*User*/,
      userUnlink?: object/*User*/,
      userCreate?: object/*User*/,
      socialNetworks?: object/*SocialNetwork*/[],
      socialNetworksUnlink?: object/*SocialNetwork*/[],
      socialNetworksCreate?: object/*SocialNetwork*/[],
      phones?: object/*Phone*/[],
      phonesUnlink?: object/*Phone*/[],
      phonesCreate?: object/*Phone*/[],
      emails?: object/*Email*/[],
      emailsUnlink?: object/*Email*/[],
      emailsCreate?: object/*Email*/[],
      asStudents?: object/*Student*/[],
      asStudentsUnlink?: object/*Student*/[],
      asStudentsCreate?: object/*Student*/[],
      asCurator?: object/*Curator*/,
      asCuratorUnlink?: object/*Curator*/,
      asCuratorCreate?: object/*Curator*/,
    },
    context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
    info,
  ) => {
    logger.trace('updatePerson');
    let payload = {
      spiritualName: args.spiritualName,
      fullName: args.fullName,
      dateOfBirth: args.dateOfBirth,
      specialNotes: args.specialNotes,
    };

    let result;
    let previous;
    try {
      if (args.id) {
        previous = await context.connectors.Person.findOneById(fromGlobalId(args.id).id);
        result = await context.connectors.Person.findOneByIdAndUpdate(fromGlobalId(args.id).id, payload);
      } else if (args.spiritualName) {
        delete payload.spiritualName;
        previous = await context.connectors.Person.findOneBySpiritualName(args.spiritualName);
        result = await context.connectors.Person.findOneBySpiritualNameAndUpdate(args.spiritualName, payload);
      } else if (args.fullName) {
        delete payload.fullName;
        previous = await context.connectors.Person.findOneByFullName(args.fullName);
        result = await context.connectors.Person.findOneByFullNameAndUpdate(args.fullName, payload);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('Person', {
        Person: {
          mutation: 'UPDATE',
          node: result,
          previous,
          updatedFields: Object.keys(payload).filter(f => payload[f]!== undefined),
          payload: args,
        }
      });
    }

    if (args.userUnlink ) {
    
      let $item = args.userUnlink;
      if ($item) {
        let user = await ensureUser({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromUser({
          context,
          user,
          person: result,
        });
      }
    
    }

    if (args.userCreate ) {
    
      let $item = args.userCreate;
      if ($item) {
        let user = await ensureUser({
          args: $item,
          context,
          create: true,
        });

        await linkToUser({
          context,
          user,
          person: result,
        });
      }
    
    }

    if (args.user ) {
    
      let $item = args.user;
      if ($item) {
        let user = await ensureUser({
          args: $item,
          context,
          create: false,
        });

        await linkToUser({
          context,
          user,
          person: result,
        });
      }
    
    }

    if (args.socialNetworksUnlink && Array.isArray(args.socialNetworksUnlink) && args.socialNetworksUnlink.length > 0 ) {
    
      for (let i = 0, len = args.socialNetworksUnlink.length; i < len; i++) {
    
      let $item = args.socialNetworksUnlink[i];
      if ($item) {
        let socialNetworks = await ensureSocialNetwork({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromSocialNetworks({
          context,
          socialNetworks,
          person: result,
        });
      }
    
      }
    
    }

    if (args.socialNetworksCreate && Array.isArray(args.socialNetworksCreate) && args.socialNetworksCreate.length > 0 ) {
    
      for (let i = 0, len = args.socialNetworksCreate.length; i < len; i++) {
    
      let $item = args.socialNetworksCreate[i];
      if ($item) {
        let socialNetworks = await ensureSocialNetwork({
          args: $item,
          context,
          create: true,
        });

        await linkToSocialNetworks({
          context,
          socialNetworks,
          person: result,
        });
      }
    
      }
    
    }

    if (args.socialNetworks && Array.isArray(args.socialNetworks) && args.socialNetworks.length > 0 ) {
    
      for (let i = 0, len = args.socialNetworks.length; i < len; i++) {
    
      let $item = args.socialNetworks[i];
      if ($item) {
        let socialNetworks = await ensureSocialNetwork({
          args: $item,
          context,
          create: false,
        });

        await linkToSocialNetworks({
          context,
          socialNetworks,
          person: result,
        });
      }
    
      }
    
    }

    if (args.phonesUnlink && Array.isArray(args.phonesUnlink) && args.phonesUnlink.length > 0 ) {
    
      for (let i = 0, len = args.phonesUnlink.length; i < len; i++) {
    
      let $item = args.phonesUnlink[i];
      if ($item) {
        let phones = await ensurePhone({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromPhones({
          context,
          phones,
          person: result,
        });
      }
    
      }
    
    }

    if (args.phonesCreate && Array.isArray(args.phonesCreate) && args.phonesCreate.length > 0 ) {
    
      for (let i = 0, len = args.phonesCreate.length; i < len; i++) {
    
      let $item = args.phonesCreate[i];
      if ($item) {
        let phones = await ensurePhone({
          args: $item,
          context,
          create: true,
        });

        await linkToPhones({
          context,
          phones,
          person: result,
        });
      }
    
      }
    
    }

    if (args.phones && Array.isArray(args.phones) && args.phones.length > 0 ) {
    
      for (let i = 0, len = args.phones.length; i < len; i++) {
    
      let $item = args.phones[i];
      if ($item) {
        let phones = await ensurePhone({
          args: $item,
          context,
          create: false,
        });

        await linkToPhones({
          context,
          phones,
          person: result,
        });
      }
    
      }
    
    }

    if (args.emailsUnlink && Array.isArray(args.emailsUnlink) && args.emailsUnlink.length > 0 ) {
    
      for (let i = 0, len = args.emailsUnlink.length; i < len; i++) {
    
      let $item = args.emailsUnlink[i];
      if ($item) {
        let emails = await ensureEmail({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromEmails({
          context,
          emails,
          person: result,
        });
      }
    
      }
    
    }

    if (args.emailsCreate && Array.isArray(args.emailsCreate) && args.emailsCreate.length > 0 ) {
    
      for (let i = 0, len = args.emailsCreate.length; i < len; i++) {
    
      let $item = args.emailsCreate[i];
      if ($item) {
        let emails = await ensureEmail({
          args: $item,
          context,
          create: true,
        });

        await linkToEmails({
          context,
          emails,
          person: result,
        });
      }
    
      }
    
    }

    if (args.emails && Array.isArray(args.emails) && args.emails.length > 0 ) {
    
      for (let i = 0, len = args.emails.length; i < len; i++) {
    
      let $item = args.emails[i];
      if ($item) {
        let emails = await ensureEmail({
          args: $item,
          context,
          create: false,
        });

        await linkToEmails({
          context,
          emails,
          person: result,
        });
      }
    
      }
    
    }

    if (args.asStudentsUnlink && Array.isArray(args.asStudentsUnlink) && args.asStudentsUnlink.length > 0 ) {
    
      for (let i = 0, len = args.asStudentsUnlink.length; i < len; i++) {
    
      let $item = args.asStudentsUnlink[i];
      if ($item) {
        let asStudents = await ensureStudent({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromAsStudents({
          context,
          asStudents,
          person: result,
        });
      }
    
      }
    
    }

    if (args.asStudentsCreate && Array.isArray(args.asStudentsCreate) && args.asStudentsCreate.length > 0 ) {
    
      for (let i = 0, len = args.asStudentsCreate.length; i < len; i++) {
    
      let $item = args.asStudentsCreate[i];
      if ($item) {
        let asStudents = await ensureStudent({
          args: $item,
          context,
          create: true,
        });

        await linkToAsStudents({
          context,
          asStudents,
          person: result,
        });
      }
    
      }
    
    }

    if (args.asStudents && Array.isArray(args.asStudents) && args.asStudents.length > 0 ) {
    
      for (let i = 0, len = args.asStudents.length; i < len; i++) {
    
      let $item = args.asStudents[i];
      if ($item) {
        let asStudents = await ensureStudent({
          args: $item,
          context,
          create: false,
        });

        await linkToAsStudents({
          context,
          asStudents,
          person: result,
        });
      }
    
      }
    
    }

    if (args.asCuratorUnlink ) {
    
      let $item = args.asCuratorUnlink;
      if ($item) {
        let asCurator = await ensureCurator({
          args: $item,
          context,
          create: false,
        });

        await unlinkFromAsCurator({
          context,
          asCurator,
          person: result,
        });
      }
    
    }

    if (args.asCuratorCreate ) {
    
      let $item = args.asCuratorCreate;
      if ($item) {
        let asCurator = await ensureCurator({
          args: $item,
          context,
          create: true,
        });

        await linkToAsCurator({
          context,
          asCurator,
          person: result,
        });
      }
    
    }

    if (args.asCurator ) {
    
      let $item = args.asCurator;
      if ($item) {
        let asCurator = await ensureCurator({
          args: $item,
          context,
          create: false,
        });

        await linkToAsCurator({
          context,
          asCurator,
          person: result,
        });
      }
    
    }

    return {
      person: result,
    };
  }),

  deletePerson:  mutateAndGetPayload(async (args: {
      id?: string,
      spiritualName?: string,
      fullName?: string,
    },
    context: {
      connectors: RegisterConnectors,
      pubsub: PubSubEngine,
      userGQL: (args: any)=>Promise<any> },
    info,
  ) => {
    logger.trace('deletePerson');
    let result;
    try {
      if (args.id) {

        await unlinkPersonFromAll([{
          key: 'id',
          type: 'ID',
          value: args.id,
        }],
          context,
        );

        result = await context.connectors.Person.findOneByIdAndRemove(fromGlobalId(args.id).id);
      } else if (args.spiritualName) {

        await unlinkPersonFromAll([{
          key: 'spiritualName',
          type: 'String',
          value: args.spiritualName,
        }],
          context,
        );

        result = await context.connectors.Person.findOneBySpiritualNameAndRemove(args.spiritualName);
      } else if (args.fullName) {

        await unlinkPersonFromAll([{
          key: 'fullName',
          type: 'String',
          value: args.fullName,
        }],
          context,
        );

        result = await context.connectors.Person.findOneByFullNameAndRemove(args.fullName);
      }
    } catch (err) {
      throw err;
    }

    if (!result) {
      throw new Error('Specified item not found!');
    }

    if (context.pubsub) {
      context.pubsub.publish('Person', {
        Person: {
          mutation: 'DELETE',
          node: result,
          previous: null,
          updatedFields: [],
          payload: args,
        }
      });
    }

    return {
      deletedItemId: toGlobalId('Person', result.id),
      person: result,
    };
  }),
}
;
