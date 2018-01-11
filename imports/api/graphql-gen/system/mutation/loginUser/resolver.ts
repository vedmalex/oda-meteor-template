import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:mutation:loginUser:');

import { mutateAndGetPayload } from 'oda-api-graphql';
export const resolver = {
  loginUser: mutateAndGetPayload(
    async (
      args: {
        userName?: string,
        password?: string,
      },
      context,
      info
    ) => {
      logger.trace('loginUser');
      let result: {
        // what must be in output
        token?: any; // string,
      };
      result = {};
      // put your code here
      return result;
    }
  ),
};
