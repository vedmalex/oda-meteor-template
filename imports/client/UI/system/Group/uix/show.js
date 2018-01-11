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
  const Title = uix.Group.Title;
  const { translate } = context;
  const {
    Student,
  } = uix;
  return (
    <Show title={<Title />} {...props} >
      <SimpleShowLayout {...props}>
        <DependentField resolve={showIfExists('name')}>
          <TextField label="resources.Group.fields.name" source="name" />
        </DependentField>

        <DependentField resolve={showIfNotEmptyRel('courseId')} source="courseId" >
          <ReferenceField label="resources.Group.fields.course" source="courseId" reference="Course" allowEmpty linkType="show" >
            <TextField source="name" allowEmpty />
          </ReferenceField>
        </DependentField>

        <ReferenceManyField label="resources.Group.fields.students" reference="Student" target="group" allowEmpty >
          <Student.Grid />
        </ReferenceManyField>

        <DependentField resolve={showIfNotEmptyRel('curatorId')} source="curatorId" >
          <ReferenceField label="resources.Group.fields.curator" source="curatorId" reference="Curator" allowEmpty linkType="show" >
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
