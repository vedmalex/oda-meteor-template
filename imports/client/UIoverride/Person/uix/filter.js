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

const FilterPanel = (props, { translate }) => (
  <Filter {...props} >

    <TextInput label="uix.filter.search" source="q" allowEmpty alwaysOn />
    <NullableBooleanInput label={translate("uix.filter.exists", { name: translate('resources.Person.fields.spiritualName') })} source="spiritualName-exists" />

    <TextInput label={translate("uix.filter.exists", { name: translate('resources.Person.fields.spiritualName') })} source="spiritualName-imatch" allowEmpty />
    <SelectArrayInput label={translate("uix.filter.in", { name: translate('resources.Person.fields.spiritualName') })} source="spiritualName-in" allowEmpty />
    <SelectArrayInput label={translate("uix.filter.nin", { name: translate('resources.Person.fields.spiritualName') })} source="spiritualName-nin" allowEmpty />
    <NullableBooleanInput label={translate("uix.filter.exists", { name: translate('resources.Person.fields.fullName') })} source="fullName-exists" />

    <TextInput label={translate("uix.filter.exists", { name: translate('resources.Person.fields.fullName') })} source="fullName-imatch" allowEmpty />
    <SelectArrayInput label={translate("uix.filter.in", { name: translate('resources.Person.fields.fullName') })} source="fullName-in" allowEmpty />
    <SelectArrayInput label={translate("uix.filter.nin", { name: translate('resources.Person.fields.fullName') })} source="fullName-nin" allowEmpty />

    <NumberInput label={translate("uix.filter.eq", { name: translate('resources.Person.fields.ages') })} source="ages-eq" allowEmpty />
    <NumberInput label={translate("uix.filter.lte", { name: translate('resources.Person.fields.ages') })} source="ages-lte" allowEmpt />
    <NumberInput label={translate("uix.filter.gte", { name: translate('resources.Person.fields.ages') })} source="ages-gte" allowEmpty />

  </Filter>
);

FilterPanel.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default FilterPanel;

