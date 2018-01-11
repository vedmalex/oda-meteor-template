import { data } from 'oda-aor-rest';
import { fragments, queries } from './queries';
import set from 'lodash/set';

export default {
  queries,
  fragments,
  name: 'SubjectCourse',
  fields: {
    id: { type: 'string' },
    description: { type: 'string' },
    subject: { type: 'string' },
    course: { type: 'string' },
    hours: { type: 'number' },
    level: { type: 'string' },
    subjectLink: {
      ref: {
        resource: 'Subject',
        type: data.resource.interfaces.refType.BelongsTo,
      },
    },
    courseLink: {
      ref: {
        resource: 'Course',
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
];
