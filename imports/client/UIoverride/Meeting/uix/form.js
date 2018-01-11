import React, { Component } from 'react';
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
  required,
} from "admin-on-rest";

import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import compose from 'recompose/compose';
import { ui } from 'oda-aor-rest';
import { EmbeddedArrayInput } from 'aor-embedded-array';
import RichTextInput from 'aor-rich-text-input';

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
        <DateInput label="resources.Meeting.fields.date" source="date" allowEmpty />

        <Label text="resources.Meeting.fields.curator" />
        <ReferenceInput label="" source="curatorId" reference="Curator" allowEmpty >
          <AutocompleteInput optionText="fullName" />
        </ReferenceInput>

        <Label text="resources.Meeting.fields.group" />
        <ReferenceInput label="" source="groupId" reference="Group" allowEmpty >
          <AutocompleteInput optionText="name" />
        </ReferenceInput>


        <EmbeddedArrayInput label="resources.Meeting.fields.students" source="studentsValues" allowEmpty >
          <SelectInput
            source="studentsType"
            label="uix.actionType.ExpectedTo"
            choices={manyRelAction}
            defaultValue={actionType.USE}
          />
          <DependentInput resolve={selectorFor('students', true)} scoped >
            <ReferenceInput label={translate("resources.Student.name", { smart_count: 1 })} source="id" reference="Student" allowEmpty >
              <SelectInput optionText="personFullName" />
            </ReferenceInput>
          </DependentInput>
          <DependentInput resolve={detailsFor('students')} scoped >
            <BooleanInput label="resources.StudentAttendance.fields.present" source="present" allowEmpty />
            <RichTextInput label="resources.StudentAttendance.fields.specialNotes" source="specialNotes" allowEmpty />
          </DependentInput>
        </EmbeddedArrayInput>
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
        students: {
          resource: 'Student',
          single: false,
        },
      }),
      finalizeForm,
    }),
)(Form);
