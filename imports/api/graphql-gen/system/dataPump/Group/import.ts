

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
      Group: {
        filter:`
          id
          name`,
        uploader: {
          findQuery: {
            id: 'Group/findById.graphql',
            name: 'Group/findByName.graphql',
          },
          // createQuery: 'Group/create.graphql',
          // updateQuery: 'Group/update.graphql',
          // dataPropName: 'group',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            name : (f) => f.hasOwnProperty('name') ? { name: f.name } : null,
          }
        }
      }
    },
    relate : {
      Group: {
        filter:`
          id
          students
          curator`,
        uploader: {
          findQuery: {
            id: 'Group/findById.graphql',
            name: 'Group/findByName.graphql',
          },
          // createQuery: 'Group/create.graphql',
          // updateQuery: 'Group/update.graphql',
          // dataPropName: 'group',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            name : (f) => f.hasOwnProperty('name') ? { name: f.name } : null,
          }
        }
      }
    },
  },
}
