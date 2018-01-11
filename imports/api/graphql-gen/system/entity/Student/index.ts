
import { common } from 'oda-gen-graphql';

let { fillDefaults, deepMerge } = common.lib;

import { query } from './query/resolver';
import { viewer } from './viewer/resolver';
import { resolver } from './type/resolver';
import { mutation as connectionMutation } from './connections/mutations/resolver';
import { mutation as entityMutation } from './mutations/resolver';
import { subscriptions as entitySubscription, resolver as subscriptionsUnions } from './subscriptions/resolver';

export class StudentEntity extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._query = fillDefaults(this._query, query);
    this._viewer = fillDefaults(this._viewer, viewer);
    this._resolver = fillDefaults(this._resolver, resolver, subscriptionsUnions);

    this._typeDef = fillDefaults(this._typeDef, {
      'enums': [`enum StudentSortOrder {
  idAsc
  idDesc
}`],
      'type': [`
# # Person Role To Be Student


input EmbedStudentFilter {
  or: [EmbedStudentFilterItem]
  and: [EmbedStudentFilterItem]
  some: StudentFilter
  none: StudentFilter
  every: StudentFilter
}

input EmbedStudentFilterItem {
  some: StudentFilter
  none: StudentFilter
  every: StudentFilter
}

input StudentFilter {
  or: [StudentFilterItem]
  and: [StudentFilterItem]
  person: WhereID
  group: WhereID
  id: WhereID
}

input StudentComplexFilter {
  or: [StudentComplexFilter]
  and: [StudentComplexFilter]
  person: WhereID
  group: WhereID
  id: WhereID
}

input StudentFilterItem {
  person: WhereID
  group: WhereID
  id: WhereID
}

input StudentFilterSubscriptionsItem {
  person: WhereID
  group: WhereID
  id: WhereID
}

input StudentFilterSubscriptions {
  or: [StudentFilterSubscriptions]
  and: [StudentFilterSubscriptions]
  mutation: WhereMutationKind
  node: StudentFilterSubscriptionsItem
  previous: StudentFilterSubscriptionsItem
  updatedFields: WhereListOfStrings
}

type Student implements Node{
  # # Id
  id: ID!
  # # Person
  person: Person

  # # Group
  group: Group

}


`],
      'mutationTypes': [`# Input types for basic CUD

# input type for Student
input createStudentInput {
  clientMutationId: String
  id: ID
  person: embedPersonInput
  group: embedGroupInput
}

input embedStudentInput {
  clientMutationId: String
  id: ID
  person: embedPersonInput
  group: embedGroupInput
}

# Payload type for Student
type createStudentPayload {
  clientMutationId: String
  viewer: Viewer
  student: StudentsEdge
}

# input type for Student
input updateStudentInput {
  clientMutationId: String
  id: ID
  person: embedPersonInput
  personUnlink: embedPersonInput
  personCreate: createPersonInput
  group: embedGroupInput
  groupUnlink: embedGroupInput
  groupCreate: createGroupInput
}

# Payload type for Student
type updateStudentPayload {
  clientMutationId: String
  viewer: Viewer
  student: Student
}

# input type for Student
input deleteStudentInput {
  clientMutationId: String
  id: ID
}

# Payload type for Student
type deleteStudentPayload {
  clientMutationId: String
  viewer: Viewer
  deletedItemId: ID
  student: Student
}
`],
      'subscriptionsTypes': [`# Input types for basic CUD

# input type for Student

type UpdateStudentSubscriptionPayload {

  id: ID
}

type StudentSubscription {
  mutation: MutationKind!
  node: Student!
  payload: StudentSubscriptionPayload
  updatedFields: [String]
  previous: UpdateStudentSubscriptionPayload
}

type StudentBelongsToPersonArgsSubscriptionPayload {
  student:ID!
  person:ID!
}

type StudentBelongsToPersonSubscriptionPayload {
  args:StudentBelongsToPersonArgsSubscriptionPayload
  relation: String
}

type StudentBelongsToGroupArgsSubscriptionPayload {
  student:ID!
  group:ID!
}

type StudentBelongsToGroupSubscriptionPayload {
  args:StudentBelongsToGroupArgsSubscriptionPayload
  relation: String
}

union StudentSubscriptionPayload = UpdateStudentSubscriptionPayload | StudentBelongsToPersonSubscriptionPayload | StudentBelongsToGroupSubscriptionPayload`],
      'connectionsTypes': [`type StudentsConnection {
  pageInfo: PageInfo!
  edges: [StudentsEdge]
  # put here your additional connection fields
}

type StudentsEdge {
  node: Student
  cursor: String!
  # put here your additiona edge fields
}


`],
      'connectionsMutation': [`
input addToStudentBelongsToPersonInput {
  clientMutationId: String
  student:ID!
  person:ID!
  #additional Edge fields
}

type addToStudentBelongsToPersonPayload {
  clientMutationId: String
  viewer: Viewer
  student: Student
 }

input removeFromStudentBelongsToPersonInput {
  clientMutationId: String
  person:ID!
  student:ID!
 }

type removeFromStudentBelongsToPersonPayload {
  clientMutationId: String
  viewer: Viewer
  student: Student
 }

input addToStudentBelongsToGroupInput {
  clientMutationId: String
  student:ID!
  group:ID!
  #additional Edge fields
}

type addToStudentBelongsToGroupPayload {
  clientMutationId: String
  viewer: Viewer
  student: Student
 }

input removeFromStudentBelongsToGroupInput {
  clientMutationId: String
  group:ID!
  student:ID!
 }

type removeFromStudentBelongsToGroupPayload {
  clientMutationId: String
  viewer: Viewer
  student: Student
 }
`],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      'mutationEntry': [`createStudent(input: createStudentInput!): createStudentPayload
updateStudent(input: updateStudentInput!): updateStudentPayload
deleteStudent(input: deleteStudentInput!): deleteStudentPayload`],
      'connectionsMutationEntry': [`addToStudentBelongsToPerson(input: addToStudentBelongsToPersonInput):addToStudentBelongsToPersonPayload
removeFromStudentBelongsToPerson(input: removeFromStudentBelongsToPersonInput):removeFromStudentBelongsToPersonPayload
addToStudentBelongsToGroup(input: addToStudentBelongsToGroupInput):addToStudentBelongsToGroupPayload
removeFromStudentBelongsToGroup(input: removeFromStudentBelongsToGroupInput):removeFromStudentBelongsToGroupPayload
`],
    });

    this._subscriptionEntry = fillDefaults(this._subscriptionEntry, {
      'subscriptionEntry': [`Student(filter: StudentFilterSubscriptions): StudentSubscription
`],
    });

    this._queryEntry = fillDefaults(this._queryEntry, {
      'queryEntry': [`  students( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [StudentSortOrder], filter: StudentComplexFilter): StudentsConnection

  student(id: ID): Student`],
    });

    this._mutation = fillDefaults(this._mutation, deepMerge(entityMutation, connectionMutation));
    this._subscription = fillDefaults(this._subscription, entitySubscription);

    this._viewerEntry = fillDefaults(this._viewerEntry, {
      'viewerEntry': [`  students( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [StudentSortOrder], filter: StudentFilter): StudentsConnection
  student(id: ID): Student`],
    });
  }
}
