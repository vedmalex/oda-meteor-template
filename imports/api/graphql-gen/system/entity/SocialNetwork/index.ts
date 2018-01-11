
import { common } from 'oda-gen-graphql';

let { fillDefaults, deepMerge } = common.lib;

import { query } from './query/resolver';
import { viewer } from './viewer/resolver';
import { resolver } from './type/resolver';
import { mutation as connectionMutation } from './connections/mutations/resolver';
import { mutation as entityMutation } from './mutations/resolver';
import { subscriptions as entitySubscription, resolver as subscriptionsUnions } from './subscriptions/resolver';

export class SocialNetworkEntity extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._query = fillDefaults(this._query, query);
    this._viewer = fillDefaults(this._viewer, viewer);
    this._resolver = fillDefaults(this._resolver, resolver, subscriptionsUnions);

    this._typeDef = fillDefaults(this._typeDef, {
      'enums': [`enum SocialNetworkSortOrder {
  accountAsc
  accountDesc
  urlAsc
  urlDesc
  idAsc
  idDesc
}`],
      'type': [`
# # Social Network


input EmbedSocialNetworkFilter {
  or: [EmbedSocialNetworkFilterItem]
  and: [EmbedSocialNetworkFilterItem]
  some: SocialNetworkFilter
  none: SocialNetworkFilter
  every: SocialNetworkFilter
}

input EmbedSocialNetworkFilterItem {
  some: SocialNetworkFilter
  none: SocialNetworkFilter
  every: SocialNetworkFilter
}

input SocialNetworkFilter {
  or: [SocialNetworkFilterItem]
  and: [SocialNetworkFilterItem]
  account: WhereString
  url: WhereString
  type: WhereString
  person: WhereID
  id: WhereID
}

input SocialNetworkComplexFilter {
  or: [SocialNetworkComplexFilter]
  and: [SocialNetworkComplexFilter]
  account: WhereString
  url: WhereString
  type: WhereString
  person: WhereID
  id: WhereID
}

input SocialNetworkFilterItem {
  account: WhereString
  url: WhereString
  type: WhereString
  person: WhereID
  id: WhereID
}

input SocialNetworkFilterSubscriptionsItem {
  account: WhereString
  url: WhereString
  type: WhereString
  person: WhereID
  id: WhereID
}

input SocialNetworkFilterSubscriptions {
  or: [SocialNetworkFilterSubscriptions]
  and: [SocialNetworkFilterSubscriptions]
  mutation: WhereMutationKind
  node: SocialNetworkFilterSubscriptionsItem
  previous: SocialNetworkFilterSubscriptionsItem
  updatedFields: WhereListOfStrings
}

type SocialNetwork implements Node{
  # # Account
  account: String!
  # # Url
  url: String
  # # Id
  id: ID!
  # # Type
  type: SocialNetworkType

  # # Person
  person: Person

}


`],
      'mutationTypes': [`# Input types for basic CUD

# input type for SocialNetwork
input createSocialNetworkInput {
  clientMutationId: String
  id: ID
  account: String!
  url: String
  type: embedSocialNetworkTypeInput
  person: embedPersonInput
}

input embedSocialNetworkInput {
  clientMutationId: String
  id: ID
  account: String
  url: String
  type: embedSocialNetworkTypeInput
  person: embedPersonInput
}

# Payload type for SocialNetwork
type createSocialNetworkPayload {
  clientMutationId: String
  viewer: Viewer
  socialNetwork: SocialNetworksEdge
}

# input type for SocialNetwork
input updateSocialNetworkInput {
  clientMutationId: String
  id: ID
  account: String
  url: String
  type: embedSocialNetworkTypeInput
  typeUnlink: embedSocialNetworkTypeInput
  typeCreate: createSocialNetworkTypeInput
  person: embedPersonInput
  personUnlink: embedPersonInput
  personCreate: createPersonInput
}

# Payload type for SocialNetwork
type updateSocialNetworkPayload {
  clientMutationId: String
  viewer: Viewer
  socialNetwork: SocialNetwork
}

# input type for SocialNetwork
input deleteSocialNetworkInput {
  clientMutationId: String
  id: ID
  account: String
}

# Payload type for SocialNetwork
type deleteSocialNetworkPayload {
  clientMutationId: String
  viewer: Viewer
  deletedItemId: ID
  socialNetwork: SocialNetwork
}
`],
      'subscriptionsTypes': [`# Input types for basic CUD

# input type for SocialNetwork

type UpdateSocialNetworkSubscriptionPayload {

  id: ID
  account: String
  url: String
}

type SocialNetworkSubscription {
  mutation: MutationKind!
  node: SocialNetwork!
  payload: SocialNetworkSubscriptionPayload
  updatedFields: [String]
  previous: UpdateSocialNetworkSubscriptionPayload
}

type SocialNetworkBelongsToTypeArgsSubscriptionPayload {
  socialNetwork:ID!
  socialNetworkType:ID!
}

type SocialNetworkBelongsToTypeSubscriptionPayload {
  args:SocialNetworkBelongsToTypeArgsSubscriptionPayload
  relation: String
}

type SocialNetworkBelongsToPersonArgsSubscriptionPayload {
  socialNetwork:ID!
  person:ID!
}

type SocialNetworkBelongsToPersonSubscriptionPayload {
  args:SocialNetworkBelongsToPersonArgsSubscriptionPayload
  relation: String
}

union SocialNetworkSubscriptionPayload = UpdateSocialNetworkSubscriptionPayload | SocialNetworkBelongsToTypeSubscriptionPayload | SocialNetworkBelongsToPersonSubscriptionPayload`],
      'connectionsTypes': [`type SocialNetworksConnection {
  pageInfo: PageInfo!
  edges: [SocialNetworksEdge]
  # put here your additional connection fields
}

type SocialNetworksEdge {
  node: SocialNetwork
  cursor: String!
  # put here your additiona edge fields
}


`],
      'connectionsMutation': [`
input addToSocialNetworkBelongsToTypeInput {
  clientMutationId: String
  socialNetwork:ID!
  socialNetworkType:ID!
  #additional Edge fields
}

type addToSocialNetworkBelongsToTypePayload {
  clientMutationId: String
  viewer: Viewer
  socialNetwork: SocialNetwork
 }

input removeFromSocialNetworkBelongsToTypeInput {
  clientMutationId: String
  socialNetworkType:ID!
  socialNetwork:ID!
 }

type removeFromSocialNetworkBelongsToTypePayload {
  clientMutationId: String
  viewer: Viewer
  socialNetwork: SocialNetwork
 }

input addToSocialNetworkBelongsToPersonInput {
  clientMutationId: String
  socialNetwork:ID!
  person:ID!
  #additional Edge fields
}

type addToSocialNetworkBelongsToPersonPayload {
  clientMutationId: String
  viewer: Viewer
  socialNetwork: SocialNetwork
 }

input removeFromSocialNetworkBelongsToPersonInput {
  clientMutationId: String
  person:ID!
  socialNetwork:ID!
 }

type removeFromSocialNetworkBelongsToPersonPayload {
  clientMutationId: String
  viewer: Viewer
  socialNetwork: SocialNetwork
 }
`],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      'mutationEntry': [`createSocialNetwork(input: createSocialNetworkInput!): createSocialNetworkPayload
updateSocialNetwork(input: updateSocialNetworkInput!): updateSocialNetworkPayload
deleteSocialNetwork(input: deleteSocialNetworkInput!): deleteSocialNetworkPayload`],
      'connectionsMutationEntry': [`addToSocialNetworkBelongsToType(input: addToSocialNetworkBelongsToTypeInput):addToSocialNetworkBelongsToTypePayload
removeFromSocialNetworkBelongsToType(input: removeFromSocialNetworkBelongsToTypeInput):removeFromSocialNetworkBelongsToTypePayload
addToSocialNetworkBelongsToPerson(input: addToSocialNetworkBelongsToPersonInput):addToSocialNetworkBelongsToPersonPayload
removeFromSocialNetworkBelongsToPerson(input: removeFromSocialNetworkBelongsToPersonInput):removeFromSocialNetworkBelongsToPersonPayload
`],
    });

    this._subscriptionEntry = fillDefaults(this._subscriptionEntry, {
      'subscriptionEntry': [`SocialNetwork(filter: SocialNetworkFilterSubscriptions): SocialNetworkSubscription
`],
    });

    this._queryEntry = fillDefaults(this._queryEntry, {
      'queryEntry': [`  socialNetworks( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [SocialNetworkSortOrder], filter: SocialNetworkComplexFilter): SocialNetworksConnection

  socialNetwork(id: ID, account: String): SocialNetwork`],
    });

    this._mutation = fillDefaults(this._mutation, deepMerge(entityMutation, connectionMutation));
    this._subscription = fillDefaults(this._subscription, entitySubscription);

    this._viewerEntry = fillDefaults(this._viewerEntry, {
      'viewerEntry': [`  socialNetworks( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [SocialNetworkSortOrder], filter: SocialNetworkFilter): SocialNetworksConnection
  socialNetwork(id: ID, account: String): SocialNetwork`],
    });
  }
}
