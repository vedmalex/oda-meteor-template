import React from 'react';
import { connect } from 'react-redux';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { translate, changeLocale as changeLocaleAction, ViewTitle } from 'admin-on-rest';

import { changeTheme as changeThemeAction } from './actions';

const styles = {
  label: { width: '10em', display: 'inline-block' },
  button: { margin: '1em' },
};

const Configuration = ({ theme, locale, changeTheme, changeLocale, translate }) => (
  <Card>
    <ViewTitle title={translate('uix.configuration')} />
    <CardText>
      <div style={styles.label}>{translate('uix.locale.language')}</div>
      <RaisedButton style={styles.button} label={translate('uix.locale.en')} primary={locale === 'en'} onClick={() => changeLocale('en')} />
      <RaisedButton style={styles.button} label={translate('uix.locale.ru')} primary={locale === 'ru'} onClick={() => changeLocale('ru')} />
    </CardText>
  </Card>
);

const mapStateToProps = state => ({
  theme: state.theme,
  locale: state.locale,
});

export default connect(mapStateToProps, {
  changeLocale: changeLocaleAction,
  changeTheme: changeThemeAction,
})(translate(Configuration));
