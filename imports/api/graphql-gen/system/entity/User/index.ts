
import { common } from 'oda-gen-graphql';

let { fillDefaults, deepMerge } = common.lib;

import { query } from './query/resolver';
import { viewer } from './viewer/resolver';
import { resolver } from './type/resolver';
import { mutation as connectionMutation } from './connections/mutations/resolver';
import { mutation as entityMutation } from './mutations/resolver';
import { subscriptions as entitySubscription, resolver as subscriptionsUnions } from './subscriptions/resolver';

export class UserEntity extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._query = fillDefaults(this._query, query);
    this._viewer = fillDefaults(this._viewer, viewer);
    this._resolver = fillDefaults(this._resolver, resolver, subscriptionsUnions);

    this._typeDef = fillDefaults(this._typeDef, {
      'enums': [`enum UserSortOrder {
  userNameAsc
  userNameDesc
  passwordAsc
  passwordDesc
  isAdminAsc
  isAdminDesc
  isSystemAsc
  isSystemDesc
  enabledAsc
  enabledDesc
  idAsc
  idDesc
}`],
      'type': [`
# # Person Role To Be User Identified In The System


input EmbedUserFilter {
  or: [EmbedUserFilterItem]
  and: [EmbedUserFilterItem]
  some: UserFilter
  none: UserFilter
  every: UserFilter
}

input EmbedUserFilterItem {
  some: UserFilter
  none: UserFilter
  every: UserFilter
}

input UserFilter {
  or: [UserFilterItem]
  and: [UserFilterItem]
  userName: WhereString
  password: WhereString
  isAdmin: WhereBoolean
  isSystem: WhereBoolean
  enabled: WhereBoolean
  id: WhereID
}

input UserComplexFilter {
  or: [UserComplexFilter]
  and: [UserComplexFilter]
  userName: WhereString
  password: WhereString
  isAdmin: WhereBoolean
  isSystem: WhereBoolean
  enabled: WhereBoolean
  id: WhereID
}

input UserFilterItem {
  userName: WhereString
  password: WhereString
  isAdmin: WhereBoolean
  isSystem: WhereBoolean
  enabled: WhereBoolean
  id: WhereID
}

input UserFilterSubscriptionsItem {
  userName: WhereString
  password: WhereString
  isAdmin: WhereBoolean
  isSystem: WhereBoolean
  enabled: WhereBoolean
  id: WhereID
}

input UserFilterSubscriptions {
  or: [UserFilterSubscriptions]
  and: [UserFilterSubscriptions]
  mutation: WhereMutationKind
  node: UserFilterSubscriptionsItem
  previous: UserFilterSubscriptionsItem
  updatedFields: WhereListOfStrings
}

type User implements Node{
  # # User Name
  userName: String!
  # # Password
  password: String!
  # # Is Admin
  isAdmin: Boolean
  # # Is System
  isSystem: Boolean
  # # Enabled
  enabled: Boolean
  # # Id
  id: ID!
}


`],
      'mutationTypes': [`# Input types for basic CUD

# input type for User
input createUserInput {
  clientMutationId: String
  id: ID
  userName: String!
  password: String!
  isAdmin: Boolean
  isSystem: Boolean
  enabled: Boolean
}

input embedUserInput {
  clientMutationId: String
  id: ID
  userName: String
  password: String
  isAdmin: Boolean
  isSystem: Boolean
  enabled: Boolean
}

# Payload type for User
type createUserPayload {
  clientMutationId: String
  viewer: Viewer
  user: UsersEdge
}

# input type for User
input updateUserInput {
  clientMutationId: String
  id: ID
  userName: String
  password: String
  isAdmin: Boolean
  isSystem: Boolean
  enabled: Boolean
}

# Payload type for User
type updateUserPayload {
  clientMutationId: String
  viewer: Viewer
  user: User
}

# input type for User
input deleteUserInput {
  clientMutationId: String
  id: ID
  userName: String
}

# Payload type for User
type deleteUserPayload {
  clientMutationId: String
  viewer: Viewer
  deletedItemId: ID
  user: User
}
`],
      'subscriptionsTypes': [`# Input types for basic CUD

# input type for User

type UserSubscriptionPayload {

  id: ID
  userName: String
  password: String
  isAdmin: Boolean
  isSystem: Boolean
  enabled: Boolean
}

type UserSubscription {
  mutation: MutationKind!
  node: User!
  payload: UserSubscriptionPayload
  updatedFields: [String]
  previous: UserSubscriptionPayload
}
`],
      'connectionsTypes': [`type UsersConnection {
  pageInfo: PageInfo!
  edges: [UsersEdge]
  # put here your additional connection fields
}

type UsersEdge {
  node: User
  cursor: String!
  # put here your additiona edge fields
}


`],
      'connectionsMutation': [``],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      'mutationEntry': [`createUser(input: createUserInput!): createUserPayload
updateUser(input: updateUserInput!): updateUserPayload
deleteUser(input: deleteUserInput!): deleteUserPayload`],
      'connectionsMutationEntry': [``],
    });

    this._subscriptionEntry = fillDefaults(this._subscriptionEntry, {
      'subscriptionEntry': [`User(filter: UserFilterSubscriptions): UserSubscription
`],
    });

    this._queryEntry = fillDefaults(this._queryEntry, {
      'queryEntry': [`  users( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [UserSortOrder], filter: UserComplexFilter): UsersConnection

  user(id: ID, userName: String): User`],
    });

    this._mutation = fillDefaults(this._mutation, deepMerge(entityMutation, connectionMutation));
    this._subscription = fillDefaults(this._subscription, entitySubscription);

    this._viewerEntry = fillDefaults(this._viewerEntry, {
      'viewerEntry': [`  users( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [UserSortOrder], filter: UserFilter): UsersConnection
  user(id: ID, userName: String): User`],
    });
  }
}
