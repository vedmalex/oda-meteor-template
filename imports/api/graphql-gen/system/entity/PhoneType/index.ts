
import { common } from 'oda-gen-graphql';

let { fillDefaults, deepMerge } = common.lib;

import { query } from './query/resolver';
import { viewer } from './viewer/resolver';
import { resolver } from './type/resolver';
import { mutation as connectionMutation } from './connections/mutations/resolver';
import { mutation as entityMutation } from './mutations/resolver';
import { subscriptions as entitySubscription, resolver as subscriptionsUnions } from './subscriptions/resolver';

export class PhoneTypeEntity extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._query = fillDefaults(this._query, query);
    this._viewer = fillDefaults(this._viewer, viewer);
    this._resolver = fillDefaults(this._resolver, resolver, subscriptionsUnions);

    this._typeDef = fillDefaults(this._typeDef, {
      'enums': [`enum PhoneTypeSortOrder {
  nameAsc
  nameDesc
  idAsc
  idDesc
}`],
      'type': [`
# # Phone Type


input EmbedPhoneTypeFilter {
  or: [EmbedPhoneTypeFilterItem]
  and: [EmbedPhoneTypeFilterItem]
  some: PhoneTypeFilter
  none: PhoneTypeFilter
  every: PhoneTypeFilter
}

input EmbedPhoneTypeFilterItem {
  some: PhoneTypeFilter
  none: PhoneTypeFilter
  every: PhoneTypeFilter
}

input PhoneTypeFilter {
  or: [PhoneTypeFilterItem]
  and: [PhoneTypeFilterItem]
  name: WhereString
  id: WhereID
}

input PhoneTypeComplexFilter {
  or: [PhoneTypeComplexFilter]
  and: [PhoneTypeComplexFilter]
  name: WhereString
  id: WhereID
}

input PhoneTypeFilterItem {
  name: WhereString
  id: WhereID
}

input PhoneTypeFilterSubscriptionsItem {
  name: WhereString
  id: WhereID
}

input PhoneTypeFilterSubscriptions {
  or: [PhoneTypeFilterSubscriptions]
  and: [PhoneTypeFilterSubscriptions]
  mutation: WhereMutationKind
  node: PhoneTypeFilterSubscriptionsItem
  previous: PhoneTypeFilterSubscriptionsItem
  updatedFields: WhereListOfStrings
}

type PhoneType implements Node{
  # # Name
  name: String!
  # # Id
  id: ID!
}


`],
      'mutationTypes': [`# Input types for basic CUD

# input type for PhoneType
input createPhoneTypeInput {
  clientMutationId: String
  id: ID
  name: String!
}

input embedPhoneTypeInput {
  clientMutationId: String
  id: ID
  name: String
}

# Payload type for PhoneType
type createPhoneTypePayload {
  clientMutationId: String
  viewer: Viewer
  phoneType: PhoneTypesEdge
}

# input type for PhoneType
input updatePhoneTypeInput {
  clientMutationId: String
  id: ID
  name: String
}

# Payload type for PhoneType
type updatePhoneTypePayload {
  clientMutationId: String
  viewer: Viewer
  phoneType: PhoneType
}

# input type for PhoneType
input deletePhoneTypeInput {
  clientMutationId: String
  id: ID
  name: String
}

# Payload type for PhoneType
type deletePhoneTypePayload {
  clientMutationId: String
  viewer: Viewer
  deletedItemId: ID
  phoneType: PhoneType
}
`],
      'subscriptionsTypes': [`# Input types for basic CUD

# input type for PhoneType

type PhoneTypeSubscriptionPayload {

  id: ID
  name: String
}

type PhoneTypeSubscription {
  mutation: MutationKind!
  node: PhoneType!
  payload: PhoneTypeSubscriptionPayload
  updatedFields: [String]
  previous: PhoneTypeSubscriptionPayload
}
`],
      'connectionsTypes': [`type PhoneTypesConnection {
  pageInfo: PageInfo!
  edges: [PhoneTypesEdge]
  # put here your additional connection fields
}

type PhoneTypesEdge {
  node: PhoneType
  cursor: String!
  # put here your additiona edge fields
}


`],
      'connectionsMutation': [``],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      'mutationEntry': [`createPhoneType(input: createPhoneTypeInput!): createPhoneTypePayload
updatePhoneType(input: updatePhoneTypeInput!): updatePhoneTypePayload
deletePhoneType(input: deletePhoneTypeInput!): deletePhoneTypePayload`],
      'connectionsMutationEntry': [``],
    });

    this._subscriptionEntry = fillDefaults(this._subscriptionEntry, {
      'subscriptionEntry': [`PhoneType(filter: PhoneTypeFilterSubscriptions): PhoneTypeSubscription
`],
    });

    this._queryEntry = fillDefaults(this._queryEntry, {
      'queryEntry': [`  phoneTypes( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [PhoneTypeSortOrder], filter: PhoneTypeComplexFilter): PhoneTypesConnection

  phoneType(id: ID, name: String): PhoneType`],
    });

    this._mutation = fillDefaults(this._mutation, deepMerge(entityMutation, connectionMutation));
    this._subscription = fillDefaults(this._subscription, entitySubscription);

    this._viewerEntry = fillDefaults(this._viewerEntry, {
      'viewerEntry': [`  phoneTypes( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [PhoneTypeSortOrder], filter: PhoneTypeFilter): PhoneTypesConnection
  phoneType(id: ID, name: String): PhoneType`],
    });
  }
}
