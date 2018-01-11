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
    <TextField sortable={true} label="resources.User.fields.userName" source="userName" />
    <BooleanField sortable={true} label="resources.User.fields.isAdmin" source="isAdmin" allowEmpty />
    <BooleanField sortable={true} label="resources.User.fields.isSystem" source="isSystem" allowEmpty />
    <BooleanField sortable={true} label="resources.User.fields.enabled" source="enabled" allowEmpty />

    <ShowButton />
    <EditButton />
    <DeleteButton />
  </Datagrid>
);

Grid.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default Grid;
