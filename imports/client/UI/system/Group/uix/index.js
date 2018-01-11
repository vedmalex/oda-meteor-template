import loadable from 'loadable-components'

const Title = loadable(() => import('./title'));
const Filter = loadable(() => import('./filter'));
const Form = loadable(() => import('./form'));
const Create = loadable(() => import('./create'));
const Show = loadable(() => import('./show'));
const Edit = loadable(() => import('./edit'));
const List = loadable(() => import('./list'));
const Grid = loadable(() => import('./grid'));

export default {
  Title,
  Filter,
  Form,
  Create,
  Show,
  Edit,
  List,
  Grid,
};
