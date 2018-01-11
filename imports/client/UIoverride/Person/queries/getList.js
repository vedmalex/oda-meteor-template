import { data, constants } from 'oda-aor-rest';
import set from 'lodash/set';

export default {
  filterBy: params => Object.keys(params.filter).reduce((acc, key) => {
    if (key === 'ids') {
      return { ...acc, id: { in: params.filter[key] } };
    }
    if (key.match('ages')) {
      let value = Number.parseInt(params.filter[key]);
      let from = new Date();
      from.setFullYear(from.getFullYear() - value - 1);
      let to = new Date();
      to.setFullYear(to.getFullYear() - value);
      let operation = key.split('-')[1];
      let result;
      switch (operation) {
        case 'eq':
          set(acc, 'dateOfBirth.gte', from);
          set(acc, 'dateOfBirth.lte', to);
          break;
        case 'lte':
          set(acc, 'dateOfBirth.gte', from);
          break;
        case 'gte':
          set(acc, 'dateOfBirth.lte', from);
          break;
      }
      return acc;
    }
    if (key === 'q') {
      return {
        ...acc,
        or: [
          { fullName: { imatch: params.filter[key] } },

          { spiritualName: { imatch: params.filter[key] } },
        ]
      };
    }
    return set(acc, key.replace('-', '.'), params.filter[key]);
  }, {}),
  orderBy: params => {
    if (params.sort.field === 'ages') {
      return `dateOfBirth${constants.SortReverseOrder[params.sort.order]}`;
    } else {
      return params.sort.field !== 'id' ? `${params.sort.field}${constants.SortOrder[params.sort.order]}` : undefined
    }
  }
}
