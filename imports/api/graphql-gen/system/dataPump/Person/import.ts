

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
      Person: {
        filter:`
          id
          spiritualName
          fullName
          dateOfBirth
          specialNotes`,
        uploader: {
          findQuery: {
            id: 'Person/findById.graphql',
            spiritualName: 'Person/findBySpiritualName.graphql',
            fullName: 'Person/findByFullName.graphql',
          },
          // createQuery: 'Person/create.graphql',
          // updateQuery: 'Person/update.graphql',
          // dataPropName: 'person',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            spiritualName : (f) => f.hasOwnProperty('spiritualName') ? { spiritualName: f.spiritualName } : null,
            fullName : (f) => f.hasOwnProperty('fullName') ? { fullName: f.fullName } : null,
          }
        }
      }
    },
    relate : {
      Person: {
        filter:`
          id
          user
          socialNetworks
          phones
          emails
          asStudents
          asCurator`,
        uploader: {
          findQuery: {
            id: 'Person/findById.graphql',
            spiritualName: 'Person/findBySpiritualName.graphql',
            fullName: 'Person/findByFullName.graphql',
          },
          // createQuery: 'Person/create.graphql',
          // updateQuery: 'Person/update.graphql',
          // dataPropName: 'person',
          findVars: {
            id : (f) => f.hasOwnProperty('id') ? { id: getValue(f.id) } : null,
            spiritualName : (f) => f.hasOwnProperty('spiritualName') ? { spiritualName: f.spiritualName } : null,
            fullName : (f) => f.hasOwnProperty('fullName') ? { fullName: f.fullName } : null,
          }
        }
      }
    },
  },
}
