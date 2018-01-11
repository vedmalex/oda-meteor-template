import React from "react";
import PropTypes from 'prop-types';

const Title = ({ record },{translate}) => (
  <span>
    {translate('resources.User.userName', {smart_count : 1})} {record ? `"${record.userName}"` : ""}
  </span>
);

Title.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default Title;
