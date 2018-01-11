import loadable from 'loadable-components'

const Form = loadable(() => import('./form'));
const Show = loadable(() => import('./show'));

export default {
  Form,
  Show,
};
