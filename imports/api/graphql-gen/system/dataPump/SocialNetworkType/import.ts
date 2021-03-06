

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
      SocialNetworkType: {
        filter:`
          id
          name`,
        uploader: {
          findQuery: {
            id: 'SocialNetworkType/findById.graphql',
            name: 'SocialNetworkType/findByName.graphql',
          },
          // createQuery: 'SocialNetworkType/create.graphql',
          // updateQuery: 'SocialNetworkType/update.graphql',
          // dataPropName: 'socialNetworkType',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            name : (f) => f.hasOwnProperty('name') ? { name: f.name } : null,
          }
        }
      }
    },
    relate : {
      SocialNetworkType: {
        filter:`
          id`,
        uploader: {
          findQuery: {
            id: 'SocialNetworkType/findById.graphql',
            name: 'SocialNetworkType/findByName.graphql',
          },
          // createQuery: 'SocialNetworkType/create.graphql',
          // updateQuery: 'SocialNetworkType/update.graphql',
          // dataPropName: 'socialNetworkType',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            name : (f) => f.hasOwnProperty('name') ? { name: f.name } : null,
          }
        }
      }
    },
  },
}
