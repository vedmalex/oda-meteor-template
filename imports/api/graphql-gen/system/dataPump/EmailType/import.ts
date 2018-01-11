

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
      EmailType: {
        filter:`
          id
          name`,
        uploader: {
          findQuery: {
            id: 'EmailType/findById.graphql',
            name: 'EmailType/findByName.graphql',
          },
          // createQuery: 'EmailType/create.graphql',
          // updateQuery: 'EmailType/update.graphql',
          // dataPropName: 'emailType',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            name : (f) => f.hasOwnProperty('name') ? { name: f.name } : null,
          }
        }
      }
    },
    relate : {
      EmailType: {
        filter:`
          id`,
        uploader: {
          findQuery: {
            id: 'EmailType/findById.graphql',
            name: 'EmailType/findByName.graphql',
          },
          // createQuery: 'EmailType/create.graphql',
          // updateQuery: 'EmailType/update.graphql',
          // dataPropName: 'emailType',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            name : (f) => f.hasOwnProperty('name') ? { name: f.name } : null,
          }
        }
      }
    },
  },
}
