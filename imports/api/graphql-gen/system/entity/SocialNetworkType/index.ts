
import { common } from 'oda-gen-graphql';

let { fillDefaults, deepMerge } = common.lib;

import { query } from './query/resolver';
import { viewer } from './viewer/resolver';
import { resolver } from './type/resolver';
import { mutation as connectionMutation } from './connections/mutations/resolver';
import { mutation as entityMutation } from './mutations/resolver';
import { subscriptions as entitySubscription, resolver as subscriptionsUnions } from './subscriptions/resolver';

export class SocialNetworkTypeEntity extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._query = fillDefaults(this._query, query);
    this._viewer = fillDefaults(this._viewer, viewer);
    this._resolver = fillDefaults(this._resolver, resolver, subscriptionsUnions);

    this._typeDef = fillDefaults(this._typeDef, {
      'enums': [`enum SocialNetworkTypeSortOrder {
  nameAsc
  nameDesc
  idAsc
  idDesc
}`],
      'type': [`
# # Social Network Type


input EmbedSocialNetworkTypeFilter {
  or: [EmbedSocialNetworkTypeFilterItem]
  and: [EmbedSocialNetworkTypeFilterItem]
  some: SocialNetworkTypeFilter
  none: SocialNetworkTypeFilter
  every: SocialNetworkTypeFilter
}

input EmbedSocialNetworkTypeFilterItem {
  some: SocialNetworkTypeFilter
  none: SocialNetworkTypeFilter
  every: SocialNetworkTypeFilter
}

input SocialNetworkTypeFilter {
  or: [SocialNetworkTypeFilterItem]
  and: [SocialNetworkTypeFilterItem]
  name: WhereString
  id: WhereID
}

input SocialNetworkTypeComplexFilter {
  or: [SocialNetworkTypeComplexFilter]
  and: [SocialNetworkTypeComplexFilter]
  name: WhereString
  id: WhereID
}

input SocialNetworkTypeFilterItem {
  name: WhereString
  id: WhereID
}

input SocialNetworkTypeFilterSubscriptionsItem {
  name: WhereString
  id: WhereID
}

input SocialNetworkTypeFilterSubscriptions {
  or: [SocialNetworkTypeFilterSubscriptions]
  and: [SocialNetworkTypeFilterSubscriptions]
  mutation: WhereMutationKind
  node: SocialNetworkTypeFilterSubscriptionsItem
  previous: SocialNetworkTypeFilterSubscriptionsItem
  updatedFields: WhereListOfStrings
}

type SocialNetworkType implements Node{
  # # Name
  name: String!
  # # Id
  id: ID!
}


`],
      'mutationTypes': [`# Input types for basic CUD

# input type for SocialNetworkType
input createSocialNetworkTypeInput {
  clientMutationId: String
  id: ID
  name: String!
}

input embedSocialNetworkTypeInput {
  clientMutationId: String
  id: ID
  name: String
}

# Payload type for SocialNetworkType
type createSocialNetworkTypePayload {
  clientMutationId: String
  viewer: Viewer
  socialNetworkType: SocialNetworkTypesEdge
}

# input type for SocialNetworkType
input updateSocialNetworkTypeInput {
  clientMutationId: String
  id: ID
  name: String
}

# Payload type for SocialNetworkType
type updateSocialNetworkTypePayload {
  clientMutationId: String
  viewer: Viewer
  socialNetworkType: SocialNetworkType
}

# input type for SocialNetworkType
input deleteSocialNetworkTypeInput {
  clientMutationId: String
  id: ID
  name: String
}

# Payload type for SocialNetworkType
type deleteSocialNetworkTypePayload {
  clientMutationId: String
  viewer: Viewer
  deletedItemId: ID
  socialNetworkType: SocialNetworkType
}
`],
      'subscriptionsTypes': [`# Input types for basic CUD

# input type for SocialNetworkType

type SocialNetworkTypeSubscriptionPayload {

  id: ID
  name: String
}

type SocialNetworkTypeSubscription {
  mutation: MutationKind!
  node: SocialNetworkType!
  payload: SocialNetworkTypeSubscriptionPayload
  updatedFields: [String]
  previous: SocialNetworkTypeSubscriptionPayload
}
`],
      'connectionsTypes': [`type SocialNetworkTypesConnection {
  pageInfo: PageInfo!
  edges: [SocialNetworkTypesEdge]
  # put here your additional connection fields
}

type SocialNetworkTypesEdge {
  node: SocialNetworkType
  cursor: String!
  # put here your additiona edge fields
}


`],
      'connectionsMutation': [``],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      'mutationEntry': [`createSocialNetworkType(input: createSocialNetworkTypeInput!): createSocialNetworkTypePayload
updateSocialNetworkType(input: updateSocialNetworkTypeInput!): updateSocialNetworkTypePayload
deleteSocialNetworkType(input: deleteSocialNetworkTypeInput!): deleteSocialNetworkTypePayload`],
      'connectionsMutationEntry': [``],
    });

    this._subscriptionEntry = fillDefaults(this._subscriptionEntry, {
      'subscriptionEntry': [`SocialNetworkType(filter: SocialNetworkTypeFilterSubscriptions): SocialNetworkTypeSubscription
`],
    });

    this._queryEntry = fillDefaults(this._queryEntry, {
      'queryEntry': [`  socialNetworkTypes( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [SocialNetworkTypeSortOrder], filter: SocialNetworkTypeComplexFilter): SocialNetworkTypesConnection

  socialNetworkType(id: ID, name: String): SocialNetworkType`],
    });

    this._mutation = fillDefaults(this._mutation, deepMerge(entityMutation, connectionMutation));
    this._subscription = fillDefaults(this._subscription, entitySubscription);

    this._viewerEntry = fillDefaults(this._viewerEntry, {
      'viewerEntry': [`  socialNetworkTypes( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [SocialNetworkTypeSortOrder], filter: SocialNetworkTypeFilter): SocialNetworkTypesConnection
  socialNetworkType(id: ID, name: String): SocialNetworkType`],
    });
  }
}
