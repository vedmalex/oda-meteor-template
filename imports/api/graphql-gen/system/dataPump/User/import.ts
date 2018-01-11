

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
      User: {
        filter:`
          id
          userName
          password
          isAdmin
          isSystem
          enabled`,
        uploader: {
          findQuery: {
            id: 'User/findById.graphql',
            userName: 'User/findByUserName.graphql',
          },
          // createQuery: 'User/create.graphql',
          // updateQuery: 'User/update.graphql',
          // dataPropName: 'user',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            userName : (f) => f.hasOwnProperty('userName') ? { userName: f.userName } : null,
          }
        }
      }
    },
    relate : {
      User: {
        filter:`
          id`,
        uploader: {
          findQuery: {
            id: 'User/findById.graphql',
            userName: 'User/findByUserName.graphql',
          },
          // createQuery: 'User/create.graphql',
          // updateQuery: 'User/update.graphql',
          // dataPropName: 'user',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            userName : (f) => f.hasOwnProperty('userName') ? { userName: f.userName } : null,
          }
        }
      }
    },
  },
}
