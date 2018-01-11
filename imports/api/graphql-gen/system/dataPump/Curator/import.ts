

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
      Curator: {
        filter:`
          id`,
        uploader: {
          findQuery: {
            id: 'Curator/findById.graphql',
          },
          // createQuery: 'Curator/create.graphql',
          // updateQuery: 'Curator/update.graphql',
          // dataPropName: 'curator',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
          }
        }
      }
    },
    relate : {
      Curator: {
        filter:`
          id
          person
          groups`,
        uploader: {
          findQuery: {
            id: 'Curator/findById.graphql',
          },
          // createQuery: 'Curator/create.graphql',
          // updateQuery: 'Curator/update.graphql',
          // dataPropName: 'curator',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
          }
        }
      }
    },
  },
}
