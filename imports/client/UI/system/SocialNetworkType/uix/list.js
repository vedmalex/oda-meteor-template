import React from "react";
import PropTypes from 'prop-types';
import {
  List,
} from "admin-on-rest";

const ListView = (props, context) => {
  const Grid = context.uix.SocialNetworkType.Grid;
  const Filter = context.uix.SocialNetworkType.Filter;

  return (
    <List {...props} filters={<Filter />}>
      <Grid {...props} />
    </List>
  )
};

ListView.contextTypes = {
  uix: PropTypes.object.isRequired,
}

export default ListView;
