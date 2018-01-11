import React from "react";
import PropTypes from 'prop-types';

import {
  Datagrid,
  TextField,
  DateField,
  NumberField,
  BooleanField,
  EditButton,
  DeleteButton,
  ShowButton,
  ReferenceField,
} from "admin-on-rest";

const Grid = (props, context) => (
  <Datagrid {...props} >
    <TextField sortable={true} label="resources.Person.fields.spiritualName" source="spiritualName" />
    <TextField sortable={true} label="resources.Person.fields.fullName" source="fullName" />
    <NumberField sortable={true} label="resources.Person.fields.ages" source="ages" allowEmpty />

    <ShowButton />
    <EditButton />
    <DeleteButton />
  </Datagrid>
);

Grid.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default Grid;
