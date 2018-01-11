import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import App from '../imports/client/App';
import { Resources, uix } from '../imports/client/UIoverride';
// import { Resources, uix } from '../imports/client/UI/system';
import apolloClient from '../imports/client/lib/apollo';

const client = apolloClient({ uri: 'http://localhost:3003/graphql' });
ReactDOM.render(
  <App client={client} resources={new Resources()} uix={uix} />
  , document.getElementById('root'));