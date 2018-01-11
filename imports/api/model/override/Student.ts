import { common } from 'oda-gen-graphql';

import * as log4js from 'log4js';
import * as _ from 'lodash';
import * as get from 'lodash/get';

let logger = log4js.getLogger('graphql:query:Student');
import {
  globalIdField,
} from 'graphql-relay';

import RegisterConnectors from '../connectors';
import { idToCursor, emptyConnection, pagination, detectCursorDirection, consts, Filter } from 'oda-api-graphql';

import { lib } from 'oda-gen-common';
const { selectionTree: traverse } = lib;

export class StudentEntity extends common.types.GQLModule {
  protected _resolver = {
    Student: {
      fullName: async (
        { _id: id }, // owner id
        args,
        context: { connectors: RegisterConnectors },
        info) => {
        let student = await context.connectors.Student.findOneById(id);
        return `${student.firstName} ${student.middleName} ${student.lastName}`;
      },
      ages: async (
        { _id: id,
          dateOfBirth,
        }, // owner id
        args,
        context: { connectors: RegisterConnectors },
        info) => {
        let dob = dateOfBirth ? new Date(dateOfBirth) : undefined;
        if (dob) {
          let now = new Date();
          let years = now.getFullYear() - dob.getFullYear();
          let months = now.getMonth() - dob.getMonth();
          let days = now.getDate() - dob.getDate();

          if (years >= 0 && (months < 0 || (months <= 0 && days < 0))) {
            years -= 1;
          }
          return years;
        }
      },
    },
  };
}
