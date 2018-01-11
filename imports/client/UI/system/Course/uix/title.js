import React from "react";
import PropTypes from 'prop-types';

const Title = ({ record },{translate}) => (
  <span>
    {translate('resources.Course.name', {smart_count : 1})} {record ? `"${record.name}"` : ""}
  </span>
);

Title.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default Title;
