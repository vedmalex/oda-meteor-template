

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
      SocialNetwork: {
        filter:`
          id
          account
          url`,
        uploader: {
          findQuery: {
            id: 'SocialNetwork/findById.graphql',
            account: 'SocialNetwork/findByAccount.graphql',
          },
          // createQuery: 'SocialNetwork/create.graphql',
          // updateQuery: 'SocialNetwork/update.graphql',
          // dataPropName: 'socialNetwork',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            account : (f) => f.hasOwnProperty('account') ? { account: f.account } : null,
          }
        }
      }
    },
    relate : {
      SocialNetwork: {
        filter:`
          id
          type
          person`,
        uploader: {
          findQuery: {
            id: 'SocialNetwork/findById.graphql',
            account: 'SocialNetwork/findByAccount.graphql',
          },
          // createQuery: 'SocialNetwork/create.graphql',
          // updateQuery: 'SocialNetwork/update.graphql',
          // dataPropName: 'socialNetwork',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            account : (f) => f.hasOwnProperty('account') ? { account: f.account } : null,
          }
        }
      }
    },
  },
}
