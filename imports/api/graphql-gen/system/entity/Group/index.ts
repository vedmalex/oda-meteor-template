
import { common } from 'oda-gen-graphql';

let { fillDefaults, deepMerge } = common.lib;

import { query } from './query/resolver';
import { viewer } from './viewer/resolver';
import { resolver } from './type/resolver';
import { mutation as connectionMutation } from './connections/mutations/resolver';
import { mutation as entityMutation } from './mutations/resolver';
import { subscriptions as entitySubscription, resolver as subscriptionsUnions } from './subscriptions/resolver';

export class GroupEntity extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._query = fillDefaults(this._query, query);
    this._viewer = fillDefaults(this._viewer, viewer);
    this._resolver = fillDefaults(this._resolver, resolver, subscriptionsUnions);

    this._typeDef = fillDefaults(this._typeDef, {
      'enums': [`enum GroupSortOrder {
  nameAsc
  nameDesc
  idAsc
  idDesc
}`],
      'type': [`
# # Group


input EmbedGroupFilter {
  or: [EmbedGroupFilterItem]
  and: [EmbedGroupFilterItem]
  some: GroupFilter
  none: GroupFilter
  every: GroupFilter
}

input EmbedGroupFilterItem {
  some: GroupFilter
  none: GroupFilter
  every: GroupFilter
}

input GroupFilter {
  or: [GroupFilterItem]
  and: [GroupFilterItem]
  name: WhereString
  curator: WhereID
  id: WhereID
}

input GroupComplexFilter {
  or: [GroupComplexFilter]
  and: [GroupComplexFilter]
  name: WhereString
  curator: WhereID
  id: WhereID
}

input GroupFilterItem {
  name: WhereString
  curator: WhereID
  id: WhereID
}

input GroupFilterSubscriptionsItem {
  name: WhereString
  curator: WhereID
  id: WhereID
}

input GroupFilterSubscriptions {
  or: [GroupFilterSubscriptions]
  and: [GroupFilterSubscriptions]
  mutation: WhereMutationKind
  node: GroupFilterSubscriptionsItem
  previous: GroupFilterSubscriptionsItem
  updatedFields: WhereListOfStrings
}

type Group implements Node{
  # # Name
  name: String!
  # # Id
  id: ID!
  # # Students  
  students(after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [StudentSortOrder], filter:StudentComplexFilter ): GroupHasManyStudentsConnection  
  # # Curator
  curator: Curator

}


`],
      'mutationTypes': [`# Input types for basic CUD

# input type for Group
input createGroupInput {
  clientMutationId: String
  id: ID
  name: String!
  students: [embedStudentInput]
  curator: embedCuratorInput
}

input embedGroupInput {
  clientMutationId: String
  id: ID
  name: String
  students: [embedStudentInput]
  curator: embedCuratorInput
}

# Payload type for Group
type createGroupPayload {
  clientMutationId: String
  viewer: Viewer
  group: GroupsEdge
}

# input type for Group
input updateGroupInput {
  clientMutationId: String
  id: ID
  name: String
  students: [embedStudentInput]
  studentsUnlink: [embedStudentInput]
  studentsCreate: [createStudentInput]
  curator: embedCuratorInput
  curatorUnlink: embedCuratorInput
  curatorCreate: createCuratorInput
}

# Payload type for Group
type updateGroupPayload {
  clientMutationId: String
  viewer: Viewer
  group: Group
}

# input type for Group
input deleteGroupInput {
  clientMutationId: String
  id: ID
  name: String
}

# Payload type for Group
type deleteGroupPayload {
  clientMutationId: String
  viewer: Viewer
  deletedItemId: ID
  group: Group
}
`],
      'subscriptionsTypes': [`# Input types for basic CUD

# input type for Group

type UpdateGroupSubscriptionPayload {

  id: ID
  name: String
}

type GroupSubscription {
  mutation: MutationKind!
  node: Group!
  payload: GroupSubscriptionPayload
  updatedFields: [String]
  previous: UpdateGroupSubscriptionPayload
}

type GroupHasManyStudentsArgsSubscriptionPayload {
  group:ID!
  student:ID!
}

type GroupHasManyStudentsSubscriptionPayload {
  args:GroupHasManyStudentsArgsSubscriptionPayload
  relation: String
}

type GroupBelongsToCuratorArgsSubscriptionPayload {
  group:ID!
  curator:ID!
}

type GroupBelongsToCuratorSubscriptionPayload {
  args:GroupBelongsToCuratorArgsSubscriptionPayload
  relation: String
}

union GroupSubscriptionPayload = UpdateGroupSubscriptionPayload | GroupHasManyStudentsSubscriptionPayload | GroupBelongsToCuratorSubscriptionPayload`],
      'connectionsTypes': [`type GroupsConnection {
  pageInfo: PageInfo!
  edges: [GroupsEdge]
  # put here your additional connection fields
}

type GroupsEdge {
  node: Group
  cursor: String!
  # put here your additiona edge fields
}



type GroupHasManyStudentsConnection {
  pageInfo: PageInfo!
  edges: [GroupHasManyStudentsEdge]
  # put here your additional connection fields
}

type GroupHasManyStudentsEdge {
  node: Student
  cursor: String!
  # put here your additiona edge fields
}

`],
      'connectionsMutation': [`
input addToGroupHasManyStudentsInput {
  clientMutationId: String
  group:ID!
  student:ID!
  #additional Edge fields
}

type addToGroupHasManyStudentsPayload {
  clientMutationId: String
  viewer: Viewer
  group: Group
 }

input removeFromGroupHasManyStudentsInput {
  clientMutationId: String
  student:ID!
  group:ID!
 }

type removeFromGroupHasManyStudentsPayload {
  clientMutationId: String
  viewer: Viewer
  group: Group
 }

input addToGroupBelongsToCuratorInput {
  clientMutationId: String
  group:ID!
  curator:ID!
  #additional Edge fields
}

type addToGroupBelongsToCuratorPayload {
  clientMutationId: String
  viewer: Viewer
  group: Group
 }

input removeFromGroupBelongsToCuratorInput {
  clientMutationId: String
  curator:ID!
  group:ID!
 }

type removeFromGroupBelongsToCuratorPayload {
  clientMutationId: String
  viewer: Viewer
  group: Group
 }
`],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      'mutationEntry': [`createGroup(input: createGroupInput!): createGroupPayload
updateGroup(input: updateGroupInput!): updateGroupPayload
deleteGroup(input: deleteGroupInput!): deleteGroupPayload`],
      'connectionsMutationEntry': [`addToGroupHasManyStudents(input: addToGroupHasManyStudentsInput):addToGroupHasManyStudentsPayload
removeFromGroupHasManyStudents(input: removeFromGroupHasManyStudentsInput):removeFromGroupHasManyStudentsPayload
addToGroupBelongsToCurator(input: addToGroupBelongsToCuratorInput):addToGroupBelongsToCuratorPayload
removeFromGroupBelongsToCurator(input: removeFromGroupBelongsToCuratorInput):removeFromGroupBelongsToCuratorPayload
`],
    });

    this._subscriptionEntry = fillDefaults(this._subscriptionEntry, {
      'subscriptionEntry': [`Group(filter: GroupFilterSubscriptions): GroupSubscription
`],
    });

    this._queryEntry = fillDefaults(this._queryEntry, {
      'queryEntry': [`  groups( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [GroupSortOrder], filter: GroupComplexFilter): GroupsConnection

  group(id: ID, name: String): Group`],
    });

    this._mutation = fillDefaults(this._mutation, deepMerge(entityMutation, connectionMutation));
    this._subscription = fillDefaults(this._subscription, entitySubscription);

    this._viewerEntry = fillDefaults(this._viewerEntry, {
      'viewerEntry': [`  groups( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [GroupSortOrder], filter: GroupFilter): GroupsConnection
  group(id: ID, name: String): Group`],
    });
  }
}
