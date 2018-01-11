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
        <TextInput label="resources.Person.fields.spiritualName" source="spiritualName"  validate={required} />
        <TextInput label="resources.Person.fields.fullName" source="fullName"  validate={required} />
        <DateInput label="resources.Person.fields.dateOfBirth" source="dateOfBirth"  allowEmpty />
        <RichTextInput label="resources.Person.fields.specialNotes" source="specialNotes"  allowEmpty />

        <Label text="resources.Person.fields.user" />
        <DependentInput resolve={selectorFor('user')} scoped >
          <ReferenceInput label="resources.Person.fields.user" source="userId" reference="User" allowEmpty >
            <AutocompleteInput optionText="userName" />
          </ReferenceInput>
        </DependentInput>
        <SelectInput
          source="userType"
          label="uix.actionType.ExpectedTo"
          choices={singleRelActions}
          defaultValue={actionType.USE}
        />

        <DependentInput resolve={detailsFor('user')} >
          <EmbeddedInput label="resources.Person.fields.user" source="user" addLabel={false}>
            <TextInput label="resources.User.fields.userName" source="userName" validate={required} />
            <TextInput label="resources.User.fields.password" source="password" validate={required} />
            <BooleanInput label="resources.User.fields.isAdmin" source="isAdmin" allowEmpty />
            <BooleanInput label="resources.User.fields.isSystem" source="isSystem" allowEmpty />
            <BooleanInput label="resources.User.fields.enabled" source="enabled" allowEmpty />
          </EmbeddedInput>
        </DependentInput>


        <EmbeddedArrayInput label="resources.Person.fields.socialNetworks" source="socialNetworksValues" allowEmpty >
          <SelectInput
            source="socialNetworksType"
            label="uix.actionType.ExpectedTo"
            choices={manyRelAction}
            defaultValue={actionType.USE}
          />
          <DependentInput resolve={selectorFor('socialNetworks')} scoped >
            <ReferenceInput label={translate("resources.SocialNetwork.name", { smart_count: 1})} source="id" reference="SocialNetwork" allowEmpty >
              <SelectInput optionText="account" />
            </ReferenceInput>
          </DependentInput>
          <DependentInput resolve={detailsFor('socialNetworks')} scoped >
            <TextInput label="resources.SocialNetwork.fields.account" source="account" validate={required} />
            <TextInput label="resources.SocialNetwork.fields.url" source="url" allowEmpty />
          </DependentInput>
        </EmbeddedArrayInput>


        <EmbeddedArrayInput label="resources.Person.fields.phones" source="phonesValues" allowEmpty >
          <SelectInput
            source="phonesType"
            label="uix.actionType.ExpectedTo"
            choices={manyRelAction}
            defaultValue={actionType.USE}
          />
          <DependentInput resolve={selectorFor('phones')} scoped >
            <ReferenceInput label={translate("resources.Phone.name", { smart_count: 1})} source="id" reference="Phone" allowEmpty >
              <SelectInput optionText="phoneNumber" />
            </ReferenceInput>
          </DependentInput>
          <DependentInput resolve={detailsFor('phones')} scoped >
            <TextInput label="resources.Phone.fields.phoneNumber" source="phoneNumber" validate={required} />
          </DependentInput>
        </EmbeddedArrayInput>


        <EmbeddedArrayInput label="resources.Person.fields.emails" source="emailsValues" allowEmpty >
          <SelectInput
            source="emailsType"
            label="uix.actionType.ExpectedTo"
            choices={manyRelAction}
            defaultValue={actionType.USE}
          />
          <DependentInput resolve={selectorFor('emails')} scoped >
            <ReferenceInput label={translate("resources.Email.name", { smart_count: 1})} source="id" reference="Email" allowEmpty >
              <SelectInput optionText="email" />
            </ReferenceInput>
          </DependentInput>
          <DependentInput resolve={detailsFor('emails')} scoped >
            <TextInput label="resources.Email.fields.email" source="email" validate={required} />
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
      user: selector(state, 'user'),
      userId: selector(state, 'userId'),
      userType: selector(state, 'userType'),
    }), {
      initForm: initForm('record-form', {
        user: {
          resource: 'User',
          single: true,
        },
        socialNetworks: {
          resource: 'SocialNetwork',
          single: false,
        },
        phones: {
          resource: 'Phone',
          single: false,
        },
        emails: {
          resource: 'Email',
          single: false,
        },
      }),
      finalizeForm,
    }),
)(Form);
