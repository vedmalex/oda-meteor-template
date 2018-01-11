
import { common } from 'oda-gen-graphql';

let { fillDefaults, deepMerge } = common.lib;

import { query } from './query/resolver';
import { viewer } from './viewer/resolver';
import { resolver } from './type/resolver';
import { mutation as connectionMutation } from './connections/mutations/resolver';
import { mutation as entityMutation } from './mutations/resolver';
import { subscriptions as entitySubscription, resolver as subscriptionsUnions } from './subscriptions/resolver';

export class CuratorEntity extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._query = fillDefaults(this._query, query);
    this._viewer = fillDefaults(this._viewer, viewer);
    this._resolver = fillDefaults(this._resolver, resolver, subscriptionsUnions);

    this._typeDef = fillDefaults(this._typeDef, {
      'enums': [`enum CuratorSortOrder {
  idAsc
  idDesc
}`],
      'type': [`
# # Person Role To Be Curator


input EmbedCuratorFilter {
  or: [EmbedCuratorFilterItem]
  and: [EmbedCuratorFilterItem]
  some: CuratorFilter
  none: CuratorFilter
  every: CuratorFilter
}

input EmbedCuratorFilterItem {
  some: CuratorFilter
  none: CuratorFilter
  every: CuratorFilter
}

input CuratorFilter {
  or: [CuratorFilterItem]
  and: [CuratorFilterItem]
  person: WhereID
  id: WhereID
}

input CuratorComplexFilter {
  or: [CuratorComplexFilter]
  and: [CuratorComplexFilter]
  person: WhereID
  id: WhereID
}

input CuratorFilterItem {
  person: WhereID
  id: WhereID
}

input CuratorFilterSubscriptionsItem {
  person: WhereID
  id: WhereID
}

input CuratorFilterSubscriptions {
  or: [CuratorFilterSubscriptions]
  and: [CuratorFilterSubscriptions]
  mutation: WhereMutationKind
  node: CuratorFilterSubscriptionsItem
  previous: CuratorFilterSubscriptionsItem
  updatedFields: WhereListOfStrings
}

type Curator implements Node{
  # # Id
  id: ID!
  # # Person
  person: Person

  # # Groups  
  groups(after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [GroupSortOrder], filter:GroupComplexFilter ): CuratorHasManyGroupsConnection  
}


`],
      'mutationTypes': [`# Input types for basic CUD

# input type for Curator
input createCuratorInput {
  clientMutationId: String
  id: ID
  person: embedPersonInput
  groups: [embedGroupInput]
}

input embedCuratorInput {
  clientMutationId: String
  id: ID
  person: embedPersonInput
  groups: [embedGroupInput]
}

# Payload type for Curator
type createCuratorPayload {
  clientMutationId: String
  viewer: Viewer
  curator: CuratorsEdge
}

# input type for Curator
input updateCuratorInput {
  clientMutationId: String
  id: ID
  person: embedPersonInput
  personUnlink: embedPersonInput
  personCreate: createPersonInput
  groups: [embedGroupInput]
  groupsUnlink: [embedGroupInput]
  groupsCreate: [createGroupInput]
}

# Payload type for Curator
type updateCuratorPayload {
  clientMutationId: String
  viewer: Viewer
  curator: Curator
}

# input type for Curator
input deleteCuratorInput {
  clientMutationId: String
  id: ID
}

# Payload type for Curator
type deleteCuratorPayload {
  clientMutationId: String
  viewer: Viewer
  deletedItemId: ID
  curator: Curator
}
`],
      'subscriptionsTypes': [`# Input types for basic CUD

# input type for Curator

type UpdateCuratorSubscriptionPayload {

  id: ID
}

type CuratorSubscription {
  mutation: MutationKind!
  node: Curator!
  payload: CuratorSubscriptionPayload
  updatedFields: [String]
  previous: UpdateCuratorSubscriptionPayload
}

type CuratorBelongsToPersonArgsSubscriptionPayload {
  curator:ID!
  person:ID!
}

type CuratorBelongsToPersonSubscriptionPayload {
  args:CuratorBelongsToPersonArgsSubscriptionPayload
  relation: String
}

type CuratorHasManyGroupsArgsSubscriptionPayload {
  curator:ID!
  group:ID!
}

type CuratorHasManyGroupsSubscriptionPayload {
  args:CuratorHasManyGroupsArgsSubscriptionPayload
  relation: String
}

union CuratorSubscriptionPayload = UpdateCuratorSubscriptionPayload | CuratorBelongsToPersonSubscriptionPayload | CuratorHasManyGroupsSubscriptionPayload`],
      'connectionsTypes': [`type CuratorsConnection {
  pageInfo: PageInfo!
  edges: [CuratorsEdge]
  # put here your additional connection fields
}

type CuratorsEdge {
  node: Curator
  cursor: String!
  # put here your additiona edge fields
}



type CuratorHasManyGroupsConnection {
  pageInfo: PageInfo!
  edges: [CuratorHasManyGroupsEdge]
  # put here your additional connection fields
}

type CuratorHasManyGroupsEdge {
  node: Group
  cursor: String!
  # put here your additiona edge fields
}

`],
      'connectionsMutation': [`
input addToCuratorBelongsToPersonInput {
  clientMutationId: String
  curator:ID!
  person:ID!
  #additional Edge fields
}

type addToCuratorBelongsToPersonPayload {
  clientMutationId: String
  viewer: Viewer
  curator: Curator
 }

input removeFromCuratorBelongsToPersonInput {
  clientMutationId: String
  person:ID!
  curator:ID!
 }

type removeFromCuratorBelongsToPersonPayload {
  clientMutationId: String
  viewer: Viewer
  curator: Curator
 }

input addToCuratorHasManyGroupsInput {
  clientMutationId: String
  curator:ID!
  group:ID!
  #additional Edge fields
}

type addToCuratorHasManyGroupsPayload {
  clientMutationId: String
  viewer: Viewer
  curator: Curator
 }

input removeFromCuratorHasManyGroupsInput {
  clientMutationId: String
  group:ID!
  curator:ID!
 }

type removeFromCuratorHasManyGroupsPayload {
  clientMutationId: String
  viewer: Viewer
  curator: Curator
 }
`],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      'mutationEntry': [`createCurator(input: createCuratorInput!): createCuratorPayload
updateCurator(input: updateCuratorInput!): updateCuratorPayload
deleteCurator(input: deleteCuratorInput!): deleteCuratorPayload`],
      'connectionsMutationEntry': [`addToCuratorBelongsToPerson(input: addToCuratorBelongsToPersonInput):addToCuratorBelongsToPersonPayload
removeFromCuratorBelongsToPerson(input: removeFromCuratorBelongsToPersonInput):removeFromCuratorBelongsToPersonPayload
addToCuratorHasManyGroups(input: addToCuratorHasManyGroupsInput):addToCuratorHasManyGroupsPayload
removeFromCuratorHasManyGroups(input: removeFromCuratorHasManyGroupsInput):removeFromCuratorHasManyGroupsPayload
`],
    });

    this._subscriptionEntry = fillDefaults(this._subscriptionEntry, {
      'subscriptionEntry': [`Curator(filter: CuratorFilterSubscriptions): CuratorSubscription
`],
    });

    this._queryEntry = fillDefaults(this._queryEntry, {
      'queryEntry': [`  curators( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [CuratorSortOrder], filter: CuratorComplexFilter): CuratorsConnection

  curator(id: ID): Curator`],
    });

    this._mutation = fillDefaults(this._mutation, deepMerge(entityMutation, connectionMutation));
    this._subscription = fillDefaults(this._subscription, entitySubscription);

    this._viewerEntry = fillDefaults(this._viewerEntry, {
      'viewerEntry': [`  curators( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [CuratorSortOrder], filter: CuratorFilter): CuratorsConnection
  curator(id: ID): Curator`],
    });
  }
}
