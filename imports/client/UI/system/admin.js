import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { client } from 'oda-aor-rest';
import Loading from 'react-loading-animation'
import { Admin, Resource, Delete } from 'admin-on-rest';
import { englishMessages } from 'admin-on-rest';
import translation from './i18n';
import merge from 'lodash/merge';

const messages = {
  'en': {
    ...merge(
        {},
        englishMessages,
        translation
      ),
  },
};

class OdaClientApp extends Component {
  render() {
    const { restClient, authClient, uix } = this.context;
    if (!restClient) {
      return <div className="loading-component"><Loading /></div>;
    }

    return (
      <Admin
        {...this.props}
        messages={messages}
        locale="en"
        authClient={authClient}
        restClient={restClient}>
        {Object.keys(uix).map(resource =>
          <Resource
            key={resource}
            show={uix[resource].Show}
            name={resource}
            edit={uix[resource].Edit}
            create={uix[resource].Create}
            list={uix[resource].List}
            remove={Delete}
          />
        )}
      </Admin>
    );
  }
}

OdaClientApp.contextTypes = {
  uix: PropTypes.object.isRequired,
  authClient: PropTypes.func.isRequired,
  restClient: PropTypes.func.isRequired,
}

export default OdaClientApp;
