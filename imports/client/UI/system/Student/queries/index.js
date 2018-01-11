import { data } from 'oda-aor-rest';
import { fragments, queries } from './queries';
import set from 'lodash/set';

export default {
  queries,
  fragments,
  name: 'Student',
  fields: {
    id: { type: 'string' },
    person: {
      ref: {
        resource: 'Person',
        type: data.resource.interfaces.refType.BelongsTo,
      },
    },
    group: {
      ref: {
        resource: 'Group',
        type: data.resource.interfaces.refType.BelongsTo,
      },
    },
    meetings: {
      ref: {
        resource: 'Meeting',
        type: data.resource.interfaces.refType.BelongsToMany,
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
          return acc;
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
      name:'Meeting',
      fields:{
      }
    },
];
