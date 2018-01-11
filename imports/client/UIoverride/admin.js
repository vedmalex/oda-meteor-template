import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { client } from 'oda-aor-rest';
import Loading from 'react-loading-animation'
import { Admin, Resource, Delete } from 'admin-on-rest';

import merge from 'lodash/merge';
import russianMessages from 'aor-language-russian';
import { englishMessages } from 'admin-on-rest';
import translationRu from './i18n/ru'
import translationEn from '../UI/system/i18n';

import menu from './menu';

const messages = {
  'en': {
    ...merge(
      englishMessages,
      translationEn,
      {
        uix: {
          locale: {
            language: "Language",
            en: 'EN',
            ru: 'RU'
          },
          configuration: 'Configuration',
        }
      },
    ),
  },
  'ru': {
    ...merge(
      russianMessages,
      translationRu,
      {
        uix: {
          locale: {
            language: "Язык",
            en: 'АНГЛ',
            ru: 'РУС'
          },
          configuration: 'Настройки',
        },
      }
    ),
  }
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
        menu={menu}
        messages={messages}
        locale="ru"
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
