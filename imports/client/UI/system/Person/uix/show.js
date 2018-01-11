import React from "react";
import PropTypes from 'prop-types';
import {
  Datagrid,
  TextField,
  DateField,
  NumberField,
  FunctionField,
  BooleanField,
  EditButton,
  ReferenceManyField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  required,
  RichTextField,
} from "admin-on-rest";

// import { EmbeddedArrayField } from 'aor-embedded-array';
import { ui } from 'oda-aor-rest';

const LongTextField = TextField;

const {
  DependentField,
  EmbeddedField,
  GrouppedField,
  EmbeddedArrayField,
  EmbeddedRefArrayField,
  EmbeddedRefField,
} = ui.components;

const showIfExists = field => root => !!root[field];

const showIfNotEmptyRel = field => root => !!root[field] || (Array.isArray(root[field]) && root[field].length > 0);

const ShowView = (props, context) => {
  const { uix } = context;
  const Title = uix.Person.Title;
  const { translate } = context;
  const {
    Student,
  } = uix;
  return (
    <Show title={<Title />} {...props} >
      <SimpleShowLayout {...props}>
        <DependentField resolve={showIfExists('spiritualName')}>
          <TextField label="resources.Person.fields.spiritualName" source="spiritualName" />
        </DependentField>
        <DependentField resolve={showIfExists('fullName')}>
          <TextField label="resources.Person.fields.fullName" source="fullName" />
        </DependentField>
        <DependentField resolve={showIfExists('dateOfBirth')}>
          <DateField label="resources.Person.fields.dateOfBirth" source="dateOfBirth" allowEmpty />
        </DependentField>
        <DependentField resolve={showIfExists('ages')}>
          <TextField label="resources.Person.fields.ages" source="ages" allowEmpty />
        </DependentField>
        <DependentField resolve={showIfExists('specialNotes')}>
          <RichTextField label="resources.Person.fields.specialNotes" source="specialNotes" allowEmpty />
        </DependentField>

        <DependentField resolve={showIfNotEmptyRel('userId')} source="user" >
          <EmbeddedRefField label="resources.Person.fields.user" source="userId" reference="User" target="id">
            <DependentField resolve={showIfExists('userName')} scoped >
              <TextField label="resources.User.fields.userName" source="userName"  />
            </DependentField>
            <DependentField resolve={showIfExists('password')} scoped >
              <TextField label="resources.User.fields.password" source="password"  />
            </DependentField>
            <DependentField resolve={showIfExists('isAdmin')} scoped >
              <BooleanField label="resources.User.fields.isAdmin" source="isAdmin"  allowEmpty />
            </DependentField>
            <DependentField resolve={showIfExists('isSystem')} scoped >
              <BooleanField label="resources.User.fields.isSystem" source="isSystem"  allowEmpty />
            </DependentField>
            <DependentField resolve={showIfExists('enabled')} scoped >
              <BooleanField label="resources.User.fields.enabled" source="enabled"  allowEmpty />
            </DependentField>
          </EmbeddedRefField>
        </DependentField>

        <DependentField resolve={showIfNotEmptyRel('socialNetworksValues')} source="socialNetworksValues">
          <EmbeddedArrayField reference="SocialNetwork" target="person" label="resources.Person.fields.socialNetworks" source="socialNetworksValues" allowEmpty >
            <ReferenceField label={translate("resources.SocialNetwork.name", { smart_count: 1})} source="id" reference="SocialNetwork" allowEmpty linkType="show" >
              <TextField source="account" />
            </ReferenceField>
            <DependentField resolve={showIfExists('account')} source="account" scoped >
              <TextField label="resources.SocialNetwork.fields.account" source="account"  />
            </DependentField>
            <DependentField resolve={showIfExists('url')} source="url" scoped >
              <TextField label="resources.SocialNetwork.fields.url" source="url"  allowEmpty />
            </DependentField>
          </EmbeddedArrayField>
        </DependentField>

        <DependentField resolve={showIfNotEmptyRel('phonesValues')} source="phonesValues">
          <EmbeddedArrayField reference="Phone" target="person" label="resources.Person.fields.phones" source="phonesValues" allowEmpty >
            <ReferenceField label={translate("resources.Phone.name", { smart_count: 1})} source="id" reference="Phone" allowEmpty linkType="show" >
              <TextField source="phoneNumber" />
            </ReferenceField>
            <DependentField resolve={showIfExists('phoneNumber')} source="phoneNumber" scoped >
              <TextField label="resources.Phone.fields.phoneNumber" source="phoneNumber"  />
            </DependentField>
          </EmbeddedArrayField>
        </DependentField>

        <DependentField resolve={showIfNotEmptyRel('emailsValues')} source="emailsValues">
          <EmbeddedArrayField reference="Email" target="person" label="resources.Person.fields.emails" source="emailsValues" allowEmpty >
            <ReferenceField label={translate("resources.Email.name", { smart_count: 1})} source="id" reference="Email" allowEmpty linkType="show" >
              <TextField source="email" />
            </ReferenceField>
            <DependentField resolve={showIfExists('email')} source="email" scoped >
              <TextField label="resources.Email.fields.email" source="email"  />
            </DependentField>
          </EmbeddedArrayField>
        </DependentField>

        <ReferenceManyField label="resources.Person.fields.asStudents" reference="Student" target="person" allowEmpty >
          <Student.Grid />
        </ReferenceManyField>

        <DependentField resolve={showIfNotEmptyRel('asCuratorId')} source="asCuratorId" >
          <ReferenceField label="resources.Person.fields.asCurator" source="asCuratorId" reference="Curator" allowEmpty linkType="show" >
            <TextField source="fullName" allowEmpty />
          </ReferenceField>
        </DependentField>

      </SimpleShowLayout>
    </Show>
  );
};

ShowView.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
}

export default ShowView;
