
import { common } from 'oda-gen-graphql';

let { fillDefaults, deepMerge } = common.lib;

import { query } from './query/resolver';
import { viewer } from './viewer/resolver';
import { resolver } from './type/resolver';
import { mutation as connectionMutation } from './connections/mutations/resolver';
import { mutation as entityMutation } from './mutations/resolver';
import { subscriptions as entitySubscription, resolver as subscriptionsUnions } from './subscriptions/resolver';

export class EmailTypeEntity extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._query = fillDefaults(this._query, query);
    this._viewer = fillDefaults(this._viewer, viewer);
    this._resolver = fillDefaults(this._resolver, resolver, subscriptionsUnions);

    this._typeDef = fillDefaults(this._typeDef, {
      'enums': [`enum EmailTypeSortOrder {
  nameAsc
  nameDesc
  idAsc
  idDesc
}`],
      'type': [`
# # Email Type


input EmbedEmailTypeFilter {
  or: [EmbedEmailTypeFilterItem]
  and: [EmbedEmailTypeFilterItem]
  some: EmailTypeFilter
  none: EmailTypeFilter
  every: EmailTypeFilter
}

input EmbedEmailTypeFilterItem {
  some: EmailTypeFilter
  none: EmailTypeFilter
  every: EmailTypeFilter
}

input EmailTypeFilter {
  or: [EmailTypeFilterItem]
  and: [EmailTypeFilterItem]
  name: WhereString
  id: WhereID
}

input EmailTypeComplexFilter {
  or: [EmailTypeComplexFilter]
  and: [EmailTypeComplexFilter]
  name: WhereString
  id: WhereID
}

input EmailTypeFilterItem {
  name: WhereString
  id: WhereID
}

input EmailTypeFilterSubscriptionsItem {
  name: WhereString
  id: WhereID
}

input EmailTypeFilterSubscriptions {
  or: [EmailTypeFilterSubscriptions]
  and: [EmailTypeFilterSubscriptions]
  mutation: WhereMutationKind
  node: EmailTypeFilterSubscriptionsItem
  previous: EmailTypeFilterSubscriptionsItem
  updatedFields: WhereListOfStrings
}

type EmailType implements Node{
  # # Name
  name: String!
  # # Id
  id: ID!
}


`],
      'mutationTypes': [`# Input types for basic CUD

# input type for EmailType
input createEmailTypeInput {
  clientMutationId: String
  id: ID
  name: String!
}

input embedEmailTypeInput {
  clientMutationId: String
  id: ID
  name: String
}

# Payload type for EmailType
type createEmailTypePayload {
  clientMutationId: String
  viewer: Viewer
  emailType: EmailTypesEdge
}

# input type for EmailType
input updateEmailTypeInput {
  clientMutationId: String
  id: ID
  name: String
}

# Payload type for EmailType
type updateEmailTypePayload {
  clientMutationId: String
  viewer: Viewer
  emailType: EmailType
}

# input type for EmailType
input deleteEmailTypeInput {
  clientMutationId: String
  id: ID
  name: String
}

# Payload type for EmailType
type deleteEmailTypePayload {
  clientMutationId: String
  viewer: Viewer
  deletedItemId: ID
  emailType: EmailType
}
`],
      'subscriptionsTypes': [`# Input types for basic CUD

# input type for EmailType

type EmailTypeSubscriptionPayload {

  id: ID
  name: String
}

type EmailTypeSubscription {
  mutation: MutationKind!
  node: EmailType!
  payload: EmailTypeSubscriptionPayload
  updatedFields: [String]
  previous: EmailTypeSubscriptionPayload
}
`],
      'connectionsTypes': [`type EmailTypesConnection {
  pageInfo: PageInfo!
  edges: [EmailTypesEdge]
  # put here your additional connection fields
}

type EmailTypesEdge {
  node: EmailType
  cursor: String!
  # put here your additiona edge fields
}


`],
      'connectionsMutation': [``],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      'mutationEntry': [`createEmailType(input: createEmailTypeInput!): createEmailTypePayload
updateEmailType(input: updateEmailTypeInput!): updateEmailTypePayload
deleteEmailType(input: deleteEmailTypeInput!): deleteEmailTypePayload`],
      'connectionsMutationEntry': [``],
    });

    this._subscriptionEntry = fillDefaults(this._subscriptionEntry, {
      'subscriptionEntry': [`EmailType(filter: EmailTypeFilterSubscriptions): EmailTypeSubscription
`],
    });

    this._queryEntry = fillDefaults(this._queryEntry, {
      'queryEntry': [`  emailTypes( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [EmailTypeSortOrder], filter: EmailTypeComplexFilter): EmailTypesConnection

  emailType(id: ID, name: String): EmailType`],
    });

    this._mutation = fillDefaults(this._mutation, deepMerge(entityMutation, connectionMutation));
    this._subscription = fillDefaults(this._subscription, entitySubscription);

    this._viewerEntry = fillDefaults(this._viewerEntry, {
      'viewerEntry': [`  emailTypes( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [EmailTypeSortOrder], filter: EmailTypeFilter): EmailTypesConnection
  emailType(id: ID, name: String): EmailType`],
    });
  }
}
