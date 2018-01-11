import loadable from 'loadable-components'

const Title = loadable(() => import('./title'));
const Grid = loadable(() => import('./grid'));

export default {
  Grid,
  Title,
};
