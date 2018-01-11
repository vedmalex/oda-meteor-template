

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
      Phone: {
        filter:`
          id
          phoneNumber`,
        uploader: {
          findQuery: {
            id: 'Phone/findById.graphql',
            phoneNumber: 'Phone/findByPhoneNumber.graphql',
          },
          // createQuery: 'Phone/create.graphql',
          // updateQuery: 'Phone/update.graphql',
          // dataPropName: 'phone',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            phoneNumber : (f) => f.hasOwnProperty('phoneNumber') ? { phoneNumber: f.phoneNumber } : null,
          }
        }
      }
    },
    relate : {
      Phone: {
        filter:`
          id
          type
          person`,
        uploader: {
          findQuery: {
            id: 'Phone/findById.graphql',
            phoneNumber: 'Phone/findByPhoneNumber.graphql',
          },
          // createQuery: 'Phone/create.graphql',
          // updateQuery: 'Phone/update.graphql',
          // dataPropName: 'phone',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            phoneNumber : (f) => f.hasOwnProperty('phoneNumber') ? { phoneNumber: f.phoneNumber } : null,
          }
        }
      }
    },
  },
}
