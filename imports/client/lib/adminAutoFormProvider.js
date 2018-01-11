import React, { Component } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import { ApolloProvider } from 'react-apollo';
import authClient from './authClient';
import { client } from 'oda-aor-rest';

export default class AdminAutoFormsProvider extends Component {
  constructor(props, context) {
    super(props, context);
    debugger
    invariant(props.client, 'expected `client` prop initilization');
    invariant(props.uix, 'expected `uix` prop initilization');
    invariant(props.resources, 'expected `resources` prop initilization');
    this.state = {
      authClient: authClient(props.client),
      restClient: client({
        client: props.client,
        resources: props.resources
      }),
    };
  }
  getChildContext() {
    return {
      uix: this.props.uix,
      authClient: this.state.authClient,
      restClient: this.state.restClient,
    }
  }
  render() {
    return (
      <ApolloProvider client={this.props.client}>
        {React.Children.only(this.props.children)}
      </ApolloProvider>
    )
  }
}

AdminAutoFormsProvider.childContextTypes = {
  uix: PropTypes.object.isRequired,
  authClient: PropTypes.func.isRequired,
  restClient: PropTypes.func.isRequired,
}