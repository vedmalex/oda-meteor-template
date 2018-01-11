import React from "react";
import PropTypes from 'prop-types';
import {
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
  SimpleForm,
  TextInput,
  DateInput,
  NumberInput,
  BooleanInput,
  RichTextInput,
  NullableBooleanInput,
  Filter,
} from "admin-on-rest";

const FilterPanel = (props, {translate}) => (
  <Filter {...props} >
    <TextInput label="uix.filter.search" source="q" allowEmpty alwaysOn />

  </Filter>
);

FilterPanel.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default FilterPanel;
