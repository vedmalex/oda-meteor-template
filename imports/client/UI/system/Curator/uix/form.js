import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ReferenceInput,
  SelectInput,
  ReferenceArrayInput,
  SelectArrayInput,
  SimpleForm,
  TextInput,
  LongTextInput,
  DateInput,
  NumberInput,
  BooleanInput,
  required,
} from "admin-on-rest";
import RichTextInput from 'aor-rich-text-input';

import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import compose from 'recompose/compose';
import { ui } from 'oda-aor-rest';
import { EmbeddedArrayInput } from 'aor-embedded-array';

const {
  DependentInput,
  EmbeddedInput,
  GrouppedInput,
  Label,
  AutocompleteInput
} = ui.components;

const actionType = ui.consts.actionType;
const initForm = ui.actions.initForm;
const finalizeForm = ui.actions.finalizeForm;
const { selectorFor, detailsFor } = ui.show;

class Form extends Component {
  componentWillMount() {
    this.props.initForm();
  }
  componentWillUnmount() {
    this.props.finalizeForm();
  }

  render() {
    const { props } = this;
    const singleRelActions = props.singleRelActions;
    const manyRelAction = props.manyRelActions;
    const { translate } = this.context;
    return (
      <SimpleForm {...props} >

        <Label text="resources.Curator.fields.person" />
        <ReferenceInput label="" source="personId" reference="Person" allowEmpty >
          <AutocompleteInput optionText="fullName" />
        </ReferenceInput>


        <Label text="resources.Curator.fields.groups" />
        <ReferenceArrayInput label="" source="groupsIds" reference="Group" allowEmpty >
          <SelectArrayInput options={{ fullWidth: true }} optionText="name" optionValue="id" />
        </ReferenceArrayInput>

      </SimpleForm>);
  }
}

const formName = 'record-form';
const selector = formValueSelector(formName);

Form.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default compose(
  connect(
    state => ({
    }), {
      initForm: initForm('record-form', {
      }),
      finalizeForm,
    }),
)(Form);
