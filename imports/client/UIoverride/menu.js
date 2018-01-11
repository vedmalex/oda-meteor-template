import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import LabelIcon from 'material-ui/svg-icons/action/label';
import { translate, DashboardMenuItem, MenuItemLink } from 'admin-on-rest';
import items from './resources';
import ListIcon from 'material-ui/svg-icons/action/view-list';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
};

const Menu = ({ onMenuTap, translate, logout }) => (
  <div style={styles.main}>
    <DashboardMenuItem onClick={onMenuTap} />
    {Object.keys(items)
      .filter(item => items[item].visible)
      .map(item => (
        <MenuItemLink
          key={item}
          to={`/${item}`}
          primaryText={translate(`resources.${item}.name`, { smart_count: 2 })}
          leftIcon={items[item].icon || <ListIcon />}
          onClick={onMenuTap}
        />
      ))}
    <MenuItemLink
      to="/configuration"
      primaryText={translate('uix.configuration')}
      leftIcon={<SettingsIcon />}
      onClick={onMenuTap}
    />
    {logout}
  </div>
);

const enhance = compose(
  connect(state => ({
    theme: state.theme,
    locale: state.locale,
  })),
  translate,
);

export default enhance(Menu);
