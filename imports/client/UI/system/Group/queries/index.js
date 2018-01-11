import { data } from 'oda-aor-rest';
import { fragments, queries } from './queries';
import set from 'lodash/set';

export default {
  queries,
  fragments,
  name: 'Group',
  fields: {
    id: { type: 'string' },
    name: { type: 'string' },
    course: {
      ref: {
        resource: 'Course',
        type: data.resource.interfaces.refType.BelongsTo,
      },
    },
    students: {
      ref: {
        resource: 'Student',
        type: data.resource.interfaces.refType.HasMany,
      },
    },
    curator: {
      ref: {
        resource: 'Curator',
        type: data.resource.interfaces.refType.BelongsTo,
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
              { name: { imatch: params.filter[key] } },
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
