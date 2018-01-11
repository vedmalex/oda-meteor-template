import { common } from 'oda-gen-graphql';
import { resolver } from './resolver';
let { fillDefaults } = common.lib;

export class LoginUserMutation extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._typeDef = fillDefaults(this._typeDef, {
      types: [
        `input loginUserInput {
  clientMutationId: String
  userName: String!
  password: String!
}

type loginUserPayload {
  clientMutationId: String
  viewer: Viewer
  token: String
}
`,
      ],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      entry: [
        `loginUser(input: loginUserInput!): loginUserPayload`,
      ],
    });

    this._mutation = fillDefaults(this._mutation, resolver);
  }
}
