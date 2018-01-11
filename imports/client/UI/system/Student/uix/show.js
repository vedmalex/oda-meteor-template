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
  const Title = uix.Student.Title;
  const { translate } = context;
  const {
    Meeting,
  } = uix;
  return (
    <Show title={<Title />} {...props} >
      <SimpleShowLayout {...props}>

        <DependentField resolve={showIfNotEmptyRel('personId')} source="personId" >
          <ReferenceField label="resources.Student.fields.person" source="personId" reference="Person" allowEmpty linkType="show" >
            <TextField source="fullName" allowEmpty />
          </ReferenceField>
        </DependentField>

        <DependentField resolve={showIfNotEmptyRel('groupId')} source="groupId" >
          <ReferenceField label="resources.Student.fields.group" source="groupId" reference="Group" allowEmpty linkType="show" >
            <TextField source="name" allowEmpty />
          </ReferenceField>
        </DependentField>

        <ReferenceManyField label="resources.Student.fields.meetings" reference="Meeting" target="students" allowEmpty >
          <Meeting.Grid />
        </ReferenceManyField>

      </SimpleShowLayout>
    </Show>
  );
};

ShowView.contextTypes = {
  uix: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
}

export default ShowView;
