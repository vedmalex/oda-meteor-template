import { data } from 'oda-aor-rest';
import { fragments, queries } from './queries';
import set from 'lodash/set';

export default {
  queries,
  fragments,
  name: 'Course',
  fields: {
    id: { type: 'string' },
    name: { type: 'string' },
    subjects: {
      ref: {
        resource: 'Subject',
        type: data.resource.interfaces.refType.BelongsToMany,
      },
    },
    groups: {
      ref: {
        resource: 'Group',
        type: data.resource.interfaces.refType.HasMany,
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
    {
      name:'Subject',
      fields:{
      }
    },
];
