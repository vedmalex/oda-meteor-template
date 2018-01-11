import loadable from 'loadable-components'

const Filter = loadable(() => import('./filter'));
const Form = loadable(() => import('./form'));
const Show = loadable(() => import('./show'));
const Title = loadable(() => import('./title'));
const Grid = loadable(() => import('./grid'));

export default {
  Filter,
  Form,
  Show,
  Grid,
  Title,
};
