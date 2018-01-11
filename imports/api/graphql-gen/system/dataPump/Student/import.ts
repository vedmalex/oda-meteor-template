

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
      Student: {
        filter:`
          id`,
        uploader: {
          findQuery: {
            id: 'Student/findById.graphql',
          },
          // createQuery: 'Student/create.graphql',
          // updateQuery: 'Student/update.graphql',
          // dataPropName: 'student',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
          }
        }
      }
    },
    relate : {
      Student: {
        filter:`
          id
          person
          group`,
        uploader: {
          findQuery: {
            id: 'Student/findById.graphql',
          },
          // createQuery: 'Student/create.graphql',
          // updateQuery: 'Student/update.graphql',
          // dataPropName: 'student',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
          }
        }
      }
    },
  },
}
