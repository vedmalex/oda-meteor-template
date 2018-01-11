import React from "react";
import PropTypes from 'prop-types';

const Title = ({ record },{translate}) => (
  <span>
    {translate('resources.SocialNetwork.account', {smart_count : 1})} {record ? `"${record.account}"` : ""}
  </span>
);

Title.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default Title;
