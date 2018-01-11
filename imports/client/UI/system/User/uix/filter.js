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

    <NullableBooleanInput label={translate("uix.filter.exists",{ name: translate('resources.User.fields.userName')})} source="userName-exists" />

    <TextInput label={translate("uix.filter.exists",{ name: translate('resources.User.fields.userName')})} source="userName-imatch" allowEmpty />
    <SelectArrayInput label={translate("uix.filter.in",{ name: translate('resources.User.fields.userName')})} source="userName-in" allowEmpty />
    <SelectArrayInput label={translate("uix.filter.nin",{ name: translate('resources.User.fields.userName')})} source="userName-nin" allowEmpty />
    <NullableBooleanInput label={translate("uix.filter.exists",{ name: translate('resources.User.fields.isAdmin')})} source="isAdmin-exists" />

    <BooleanInput label={translate("uix.filter.eq",{ name: translate('resources.User.fields.isAdmin')})} source="isAdmin-eq" allowEmpty />
    <NullableBooleanInput label={translate("uix.filter.exists",{ name: translate('resources.User.fields.isSystem')})} source="isSystem-exists" />

    <BooleanInput label={translate("uix.filter.eq",{ name: translate('resources.User.fields.isSystem')})} source="isSystem-eq" allowEmpty />
    <NullableBooleanInput label={translate("uix.filter.exists",{ name: translate('resources.User.fields.enabled')})} source="enabled-exists" />

    <BooleanInput label={translate("uix.filter.eq",{ name: translate('resources.User.fields.enabled')})} source="enabled-eq" allowEmpty />

  </Filter>
);

FilterPanel.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default FilterPanel;
