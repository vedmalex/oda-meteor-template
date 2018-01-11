import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutations:Person');

import {
  fromGlobalId,
  toGlobalId,
} from 'graphql-relay';

import RegisterConnectors from '../../../../../data/registerConnectors';
import { mutateAndGetPayload, idToCursor } from 'oda-api-graphql';
import { PubSubEngine } from 'graphql-subscriptions';

export const mutation = {
  addToPersonBelongsToUser: mutateAndGetPayload(
    async (
      args: {
        person?: string,
        user?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToPersonBelongsToUser');
      let { id: person } = fromGlobalId(args.person);
      let { id: user } = fromGlobalId(args.user);
      let payload = {
        person,
        user,
      };

      await context.connectors.Person.addToUser(payload);

      let source = await context.connectors.Person.findOneById(person);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                user: args.user,
              },
              relation: 'user'
            }
          }
        });
      

      return {
        person: source,
      };
      }
    }),

  removeFromPersonBelongsToUser: mutateAndGetPayload(
    async (
      args: {
        person?: string,
        user?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromPersonBelongsToUser');
      let { id: person } = fromGlobalId(args.person);
      let { id: user } = fromGlobalId(args.user);
      let payload = {
        person,
        user,
      };
      await context.connectors.Person.removeFromUser(payload);

      let source = await context.connectors.Person.findOneById(person);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                user: args.user,
              },
              relation: 'user'
            }
          }
        });

      

      return {
        person: source,
      };
    }
  }),

  addToPersonHasManySocialNetworks: mutateAndGetPayload(
    async (
      args: {
        person?: string,
        socialNetwork?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToPersonHasManySocialNetworks');
      let { id: person } = fromGlobalId(args.person);
      let { id: socialNetwork } = fromGlobalId(args.socialNetwork);
      let payload = {
        person,
        socialNetwork,
      };

      await context.connectors.Person.addToSocialNetworks(payload);

      let source = await context.connectors.Person.findOneById(person);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                socialNetwork: args.socialNetwork,
              },
              relation: 'socialNetworks'
            }
          }
        });
      
        let dest = await context.connectors.SocialNetwork.findOneById(socialNetwork);

        context.pubsub.publish('SocialNetwork', {
          SocialNetwork: {
            mutation: 'LINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                socialNetwork: args.socialNetwork,
              },
              relation: 'person'
            }
          }
        });
      

      return {
        person: source,
      };
      }
    }),

  removeFromPersonHasManySocialNetworks: mutateAndGetPayload(
    async (
      args: {
        person?: string,
        socialNetwork?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromPersonHasManySocialNetworks');
      let { id: person } = fromGlobalId(args.person);
      let { id: socialNetwork } = fromGlobalId(args.socialNetwork);
      let payload = {
        person,
        socialNetwork,
      };
      await context.connectors.Person.removeFromSocialNetworks(payload);

      let source = await context.connectors.Person.findOneById(person);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                socialNetwork: args.socialNetwork,
              },
              relation: 'socialNetworks'
            }
          }
        });

      
        let dest = await context.connectors.SocialNetwork.findOneById(socialNetwork);

        context.pubsub.publish('SocialNetwork', {
          SocialNetwork: {
            mutation: 'UNLINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                socialNetwork: args.socialNetwork,
              },
              relation: 'person'
            }
          }
        });
      

      return {
        person: source,
      };
    }
  }),

  addToPersonHasManyPhones: mutateAndGetPayload(
    async (
      args: {
        person?: string,
        phone?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToPersonHasManyPhones');
      let { id: person } = fromGlobalId(args.person);
      let { id: phone } = fromGlobalId(args.phone);
      let payload = {
        person,
        phone,
      };

      await context.connectors.Person.addToPhones(payload);

      let source = await context.connectors.Person.findOneById(person);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                phone: args.phone,
              },
              relation: 'phones'
            }
          }
        });
      
        let dest = await context.connectors.Phone.findOneById(phone);

        context.pubsub.publish('Phone', {
          Phone: {
            mutation: 'LINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                phone: args.phone,
              },
              relation: 'person'
            }
          }
        });
      

      return {
        person: source,
      };
      }
    }),

  removeFromPersonHasManyPhones: mutateAndGetPayload(
    async (
      args: {
        person?: string,
        phone?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromPersonHasManyPhones');
      let { id: person } = fromGlobalId(args.person);
      let { id: phone } = fromGlobalId(args.phone);
      let payload = {
        person,
        phone,
      };
      await context.connectors.Person.removeFromPhones(payload);

      let source = await context.connectors.Person.findOneById(person);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                phone: args.phone,
              },
              relation: 'phones'
            }
          }
        });

      
        let dest = await context.connectors.Phone.findOneById(phone);

        context.pubsub.publish('Phone', {
          Phone: {
            mutation: 'UNLINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                phone: args.phone,
              },
              relation: 'person'
            }
          }
        });
      

      return {
        person: source,
      };
    }
  }),

  addToPersonHasManyEmails: mutateAndGetPayload(
    async (
      args: {
        person?: string,
        email?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToPersonHasManyEmails');
      let { id: person } = fromGlobalId(args.person);
      let { id: email } = fromGlobalId(args.email);
      let payload = {
        person,
        email,
      };

      await context.connectors.Person.addToEmails(payload);

      let source = await context.connectors.Person.findOneById(person);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                email: args.email,
              },
              relation: 'emails'
            }
          }
        });
      
        let dest = await context.connectors.Email.findOneById(email);

        context.pubsub.publish('Email', {
          Email: {
            mutation: 'LINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                email: args.email,
              },
              relation: 'person'
            }
          }
        });
      

      return {
        person: source,
      };
      }
    }),

  removeFromPersonHasManyEmails: mutateAndGetPayload(
    async (
      args: {
        person?: string,
        email?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromPersonHasManyEmails');
      let { id: person } = fromGlobalId(args.person);
      let { id: email } = fromGlobalId(args.email);
      let payload = {
        person,
        email,
      };
      await context.connectors.Person.removeFromEmails(payload);

      let source = await context.connectors.Person.findOneById(person);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                email: args.email,
              },
              relation: 'emails'
            }
          }
        });

      
        let dest = await context.connectors.Email.findOneById(email);

        context.pubsub.publish('Email', {
          Email: {
            mutation: 'UNLINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                email: args.email,
              },
              relation: 'person'
            }
          }
        });
      

      return {
        person: source,
      };
    }
  }),

  addToPersonHasManyAsStudents: mutateAndGetPayload(
    async (
      args: {
        person?: string,
        student?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToPersonHasManyAsStudents');
      let { id: person } = fromGlobalId(args.person);
      let { id: student } = fromGlobalId(args.student);
      let payload = {
        person,
        student,
      };

      await context.connectors.Person.addToAsStudents(payload);

      let source = await context.connectors.Person.findOneById(person);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                student: args.student,
              },
              relation: 'asStudents'
            }
          }
        });
      
        let dest = await context.connectors.Student.findOneById(student);

        context.pubsub.publish('Student', {
          Student: {
            mutation: 'LINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                student: args.student,
              },
              relation: 'person'
            }
          }
        });
      

      return {
        person: source,
      };
      }
    }),

  removeFromPersonHasManyAsStudents: mutateAndGetPayload(
    async (
      args: {
        person?: string,
        student?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromPersonHasManyAsStudents');
      let { id: person } = fromGlobalId(args.person);
      let { id: student } = fromGlobalId(args.student);
      let payload = {
        person,
        student,
      };
      await context.connectors.Person.removeFromAsStudents(payload);

      let source = await context.connectors.Person.findOneById(person);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                student: args.student,
              },
              relation: 'asStudents'
            }
          }
        });

      
        let dest = await context.connectors.Student.findOneById(student);

        context.pubsub.publish('Student', {
          Student: {
            mutation: 'UNLINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                student: args.student,
              },
              relation: 'person'
            }
          }
        });
      

      return {
        person: source,
      };
    }
  }),

  addToPersonHasOneAsCurator: mutateAndGetPayload(
    async (
      args: {
        person?: string,
        curator?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('addToPersonHasOneAsCurator');
      let { id: person } = fromGlobalId(args.person);
      let { id: curator } = fromGlobalId(args.curator);
      let payload = {
        person,
        curator,
      };

      await context.connectors.Person.addToAsCurator(payload);

      let source = await context.connectors.Person.findOneById(person);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                curator: args.curator,
              },
              relation: 'asCurator'
            }
          }
        });
      
        let dest = await context.connectors.Curator.findOneById(curator);

        context.pubsub.publish('Curator', {
          Curator: {
            mutation: 'LINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                curator: args.curator,
              },
              relation: 'person'
            }
          }
        });
      

      return {
        person: source,
      };
      }
    }),

  removeFromPersonHasOneAsCurator: mutateAndGetPayload(
    async (
      args: {
        person?: string,
        curator?: string,
      },
      context: { connectors: RegisterConnectors, pubsub: PubSubEngine },
      info
    ) => {
      logger.trace('removeFromPersonHasOneAsCurator');
      let { id: person } = fromGlobalId(args.person);
      let { id: curator } = fromGlobalId(args.curator);
      let payload = {
        person,
        curator,
      };
      await context.connectors.Person.removeFromAsCurator(payload);

      let source = await context.connectors.Person.findOneById(person);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                curator: args.curator,
              },
              relation: 'asCurator'
            }
          }
        });

      
        let dest = await context.connectors.Curator.findOneById(curator);

        context.pubsub.publish('Curator', {
          Curator: {
            mutation: 'UNLINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                curator: args.curator,
              },
              relation: 'person'
            }
          }
        });
      

      return {
        person: source,
      };
    }
  }),

};
