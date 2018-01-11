import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { changeLocale as changeLocaleAction } from 'admin-on-rest';

class LocaleSwitcher extends Component {
  switchToRussian = () => this.changeLocale('ru');
  switchToEnglish = () => this.changeLocale('en');

  render() {
    const { changeLocale } = this.props;
    const { translate } = this.context;
    return (
      <div>
        <div style={styles.label}>{translate('uix.locale.language')}</div>
        <RaisedButton style={styles.button} label={translate('uix.locale.en')} onClick={this.switchToEnglish} />
        <RaisedButton style={styles.button} label={translate('uix.locale.ru')} onClick={this.switchToRussian} />
      </div>
    );
  }
}

EditForm.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default connect(undefined, { changeLocale: changeLocaleAction })(LocaleSwitcher);