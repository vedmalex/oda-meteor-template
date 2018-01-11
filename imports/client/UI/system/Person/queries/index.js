import { data } from 'oda-aor-rest';
import { fragments, queries } from './queries';
import set from 'lodash/set';

export default {
  queries,
  fragments,
  name: 'Person',
  fields: {
    id: { type: 'string' },
    spiritualName: { type: 'string' },
    fullName: { type: 'string' },
    dateOfBirth: { type: 'date' },
    ages: { type: 'number' },
    specialNotes: { type: 'string' },
    user: {
      ref: {
        resource: 'User',
        type: data.resource.interfaces.refType.BelongsTo,
      },
    },
    socialNetworks: {
      ref: {
        resource: 'SocialNetwork',
        type: data.resource.interfaces.refType.HasMany,
      },
    },
    phones: {
      ref: {
        resource: 'Phone',
        type: data.resource.interfaces.refType.HasMany,
      },
    },
    emails: {
      ref: {
        resource: 'Email',
        type: data.resource.interfaces.refType.HasMany,
      },
    },
    asStudents: {
      ref: {
        resource: 'Student',
        type: data.resource.interfaces.refType.HasMany,
      },
    },
    asCurator: {
      ref: {
        resource: 'Curator',
        type: data.resource.interfaces.refType.HasOne,
      },
    },
  },
  operations: {
    GET_LIST: {
      filterBy: (params) => Object.keys(params.filter).reduce((acc, key) => {
        if (key === 'ids') {
          return { ...acc, id: { in: params.filter[key] } };
        }
        if (key === 'q') {
          return { ...acc,
            or: [
              { fullName: { imatch: params.filter[key] } },

              { spiritualName: { imatch: params.filter[key] } },
            ]
          };
        }
        return set(acc, key.replace('-', '.'), params.filter[key]);
      }, {}),
    },
    // GET_ONE: {},
    // GET_MANY: {},
    // GET_MANY_REFERENCE: {},
    // CREATE: {},
    // UPDATE: {},
    // DELETE: {},
  },
};

export const extension = [
];
