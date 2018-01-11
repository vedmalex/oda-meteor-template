import React from "react";
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

export default props => (
  <Datagrid {...props} >
    <TextField sortable={false} source="personFullName" />
    <TextField sortable={false} source="personSpiritualName" />
    <TextField sortable={false} source="groupName" />

    <ShowButton />
    <EditButton />
    <DeleteButton />
  </Datagrid>
);
