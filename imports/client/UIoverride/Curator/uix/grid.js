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
    <TextField sortable={false} source="spiritualName" />
    <TextField sortable={false} source="fullName" />

    <ShowButton />
    <EditButton />
    <DeleteButton />
  </Datagrid>
);

Grid.contextTypes = {
  translate: PropTypes.func.isRequired,
}

export default Grid;