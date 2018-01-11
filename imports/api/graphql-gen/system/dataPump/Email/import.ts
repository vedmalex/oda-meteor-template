

let mongoose = require('mongoose');
import { fromGlobalId } from 'graphql-relay';
import { utils } from 'oda-api-graphql';

const { validId } = utils;

export function getValue(value) {
    if (typeof value === 'string') {
      return validId(value) ? value : fromGlobalId(value).id;
    } else {
      return value;
    }
}

export default {
  import: {
    queries : {
      Email: {
        filter:`
          id
          email`,
        uploader: {
          findQuery: {
            id: 'Email/findById.graphql',
            email: 'Email/findByEmail.graphql',
          },
          // createQuery: 'Email/create.graphql',
          // updateQuery: 'Email/update.graphql',
          // dataPropName: 'email',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            email : (f) => f.hasOwnProperty('email') ? { email: f.email } : null,
          }
        }
      }
    },
    relate : {
      Email: {
        filter:`
          id
          type
          person`,
        uploader: {
          findQuery: {
            id: 'Email/findById.graphql',
            email: 'Email/findByEmail.graphql',
          },
          // createQuery: 'Email/create.graphql',
          // updateQuery: 'Email/update.graphql',
          // dataPropName: 'email',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            email : (f) => f.hasOwnProperty('email') ? { email: f.email } : null,
          }
        }
      }
    },
  },
}
