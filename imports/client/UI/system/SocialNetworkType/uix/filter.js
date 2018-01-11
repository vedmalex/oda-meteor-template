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

    <NullableBooleanInput label={translate("uix.filter.exists",{ name: translate('resources.SocialNetworkType.fields.name')})} source="name-exists" />

    <TextInput label={translate("uix.filter.exists",{ name: translate('resources.SocialNetworkType.fields.name')})} source="name-imatch" allowEmpty />
    <SelectArrayInput label={translate("uix.filter.in",{ name: translate('resources.SocialNetworkType.fields.name')})} source="name-in" allowEmpty />
    <SelectArrayInput label={translate("uix.filter.nin",{ name: translate('resources.SocialNetworkType.fields.name')})} source="name-nin" allowEmpty />

  </Filter>
);

FilterPanel.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default FilterPanel;
