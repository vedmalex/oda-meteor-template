

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
      PhoneType: {
        filter:`
          id
          name`,
        uploader: {
          findQuery: {
            id: 'PhoneType/findById.graphql',
            name: 'PhoneType/findByName.graphql',
          },
          // createQuery: 'PhoneType/create.graphql',
          // updateQuery: 'PhoneType/update.graphql',
          // dataPropName: 'phoneType',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            name : (f) => f.hasOwnProperty('name') ? { name: f.name } : null,
          }
        }
      }
    },
    relate : {
      PhoneType: {
        filter:`
          id`,
        uploader: {
          findQuery: {
            id: 'PhoneType/findById.graphql',
            name: 'PhoneType/findByName.graphql',
          },
          // createQuery: 'PhoneType/create.graphql',
          // updateQuery: 'PhoneType/update.graphql',
          // dataPropName: 'phoneType',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            name : (f) => f.hasOwnProperty('name') ? { name: f.name } : null,
          }
        }
      }
    },
  },
}
