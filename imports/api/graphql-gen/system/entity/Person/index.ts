
import { common } from 'oda-gen-graphql';

let { fillDefaults, deepMerge } = common.lib;

import { query } from './query/resolver';
import { viewer } from './viewer/resolver';
import { resolver } from './type/resolver';
import { mutation as connectionMutation } from './connections/mutations/resolver';
import { mutation as entityMutation } from './mutations/resolver';
import { subscriptions as entitySubscription, resolver as subscriptionsUnions } from './subscriptions/resolver';

export class PersonEntity extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._query = fillDefaults(this._query, query);
    this._viewer = fillDefaults(this._viewer, viewer);
    this._resolver = fillDefaults(this._resolver, resolver, subscriptionsUnions);

    this._typeDef = fillDefaults(this._typeDef, {
      'enums': [`enum PersonSortOrder {
  spiritualNameAsc
  spiritualNameDesc
  fullNameAsc
  fullNameDesc
  dateOfBirthAsc
  dateOfBirthDesc
  specialNotesAsc
  specialNotesDesc
  idAsc
  idDesc
}`],
      'type': [`
# # Person


input EmbedPersonFilter {
  or: [EmbedPersonFilterItem]
  and: [EmbedPersonFilterItem]
  some: PersonFilter
  none: PersonFilter
  every: PersonFilter
}

input EmbedPersonFilterItem {
  some: PersonFilter
  none: PersonFilter
  every: PersonFilter
}

input PersonFilter {
  or: [PersonFilterItem]
  and: [PersonFilterItem]
  spiritualName: WhereString
  fullName: WhereString
  dateOfBirth: WhereDate
  ages: WhereFloat
  user: WhereID
  specialNotes: WhereString
  id: WhereID
}

input PersonComplexFilter {
  or: [PersonComplexFilter]
  and: [PersonComplexFilter]
  spiritualName: WhereString
  fullName: WhereString
  dateOfBirth: WhereDate
  ages: WhereFloat
  user: WhereID
  specialNotes: WhereString
  id: WhereID
}

input PersonFilterItem {
  spiritualName: WhereString
  fullName: WhereString
  dateOfBirth: WhereDate
  ages: WhereFloat
  user: WhereID
  specialNotes: WhereString
  id: WhereID
}

input PersonFilterSubscriptionsItem {
  spiritualName: WhereString
  fullName: WhereString
  dateOfBirth: WhereDate
  ages: WhereFloat
  user: WhereID
  specialNotes: WhereString
  id: WhereID
}

input PersonFilterSubscriptions {
  or: [PersonFilterSubscriptions]
  and: [PersonFilterSubscriptions]
  mutation: WhereMutationKind
  node: PersonFilterSubscriptionsItem
  previous: PersonFilterSubscriptionsItem
  updatedFields: WhereListOfStrings
}

type Person implements Node{
  # # Spiritual Name
  spiritualName: String!
  # # Full Name
  fullName: String!
  # # Date Of Birth
  dateOfBirth: Date
  # # Ages
  ages: Float
  # # Special Notes
  specialNotes: String
  # # Id
  id: ID!
  # # User
  user: User

  # # Social Networks  
  socialNetworks(after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [SocialNetworkSortOrder], filter:SocialNetworkComplexFilter ): PersonHasManySocialNetworksConnection  
  # # Phones  
  phones(after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [PhoneSortOrder], filter:PhoneComplexFilter ): PersonHasManyPhonesConnection  
  # # Emails  
  emails(after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [EmailSortOrder], filter:EmailComplexFilter ): PersonHasManyEmailsConnection  
  # # As Students  
  asStudents(after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [StudentSortOrder], filter:StudentComplexFilter ): PersonHasManyAsStudentsConnection  
  # # As Curator
  asCurator: Curator

}


`],
      'mutationTypes': [`# Input types for basic CUD

# input type for Person
input createPersonInput {
  clientMutationId: String
  id: ID
  spiritualName: String!
  fullName: String!
  dateOfBirth: Date
  specialNotes: String
  user: embedUserInput
  socialNetworks: [embedSocialNetworkInput]
  phones: [embedPhoneInput]
  emails: [embedEmailInput]
  asStudents: [embedStudentInput]
  asCurator: embedCuratorInput
}

input embedPersonInput {
  clientMutationId: String
  id: ID
  spiritualName: String
  fullName: String
  dateOfBirth: Date
  specialNotes: String
  user: embedUserInput
  socialNetworks: [embedSocialNetworkInput]
  phones: [embedPhoneInput]
  emails: [embedEmailInput]
  asStudents: [embedStudentInput]
  asCurator: embedCuratorInput
}

# Payload type for Person
type createPersonPayload {
  clientMutationId: String
  viewer: Viewer
  person: PeopleEdge
}

# input type for Person
input updatePersonInput {
  clientMutationId: String
  id: ID
  spiritualName: String
  fullName: String
  dateOfBirth: Date
  specialNotes: String
  user: embedUserInput
  userUnlink: embedUserInput
  userCreate: createUserInput
  socialNetworks: [embedSocialNetworkInput]
  socialNetworksUnlink: [embedSocialNetworkInput]
  socialNetworksCreate: [createSocialNetworkInput]
  phones: [embedPhoneInput]
  phonesUnlink: [embedPhoneInput]
  phonesCreate: [createPhoneInput]
  emails: [embedEmailInput]
  emailsUnlink: [embedEmailInput]
  emailsCreate: [createEmailInput]
  asStudents: [embedStudentInput]
  asStudentsUnlink: [embedStudentInput]
  asStudentsCreate: [createStudentInput]
  asCurator: embedCuratorInput
  asCuratorUnlink: embedCuratorInput
  asCuratorCreate: createCuratorInput
}

# Payload type for Person
type updatePersonPayload {
  clientMutationId: String
  viewer: Viewer
  person: Person
}

# input type for Person
input deletePersonInput {
  clientMutationId: String
  id: ID
  spiritualName: String
  fullName: String
}

# Payload type for Person
type deletePersonPayload {
  clientMutationId: String
  viewer: Viewer
  deletedItemId: ID
  person: Person
}
`],
      'subscriptionsTypes': [`# Input types for basic CUD

# input type for Person

type UpdatePersonSubscriptionPayload {

  id: ID
  spiritualName: String
  fullName: String
  dateOfBirth: Date
  specialNotes: String
}

type PersonSubscription {
  mutation: MutationKind!
  node: Person!
  payload: PersonSubscriptionPayload
  updatedFields: [String]
  previous: UpdatePersonSubscriptionPayload
}

type PersonBelongsToUserArgsSubscriptionPayload {
  person:ID!
  user:ID!
}

type PersonBelongsToUserSubscriptionPayload {
  args:PersonBelongsToUserArgsSubscriptionPayload
  relation: String
}

type PersonHasManySocialNetworksArgsSubscriptionPayload {
  person:ID!
  socialNetwork:ID!
}

type PersonHasManySocialNetworksSubscriptionPayload {
  args:PersonHasManySocialNetworksArgsSubscriptionPayload
  relation: String
}

type PersonHasManyPhonesArgsSubscriptionPayload {
  person:ID!
  phone:ID!
}

type PersonHasManyPhonesSubscriptionPayload {
  args:PersonHasManyPhonesArgsSubscriptionPayload
  relation: String
}

type PersonHasManyEmailsArgsSubscriptionPayload {
  person:ID!
  email:ID!
}

type PersonHasManyEmailsSubscriptionPayload {
  args:PersonHasManyEmailsArgsSubscriptionPayload
  relation: String
}

type PersonHasManyAsStudentsArgsSubscriptionPayload {
  person:ID!
  student:ID!
}

type PersonHasManyAsStudentsSubscriptionPayload {
  args:PersonHasManyAsStudentsArgsSubscriptionPayload
  relation: String
}

type PersonHasOneAsCuratorArgsSubscriptionPayload {
  person:ID!
  curator:ID!
}

type PersonHasOneAsCuratorSubscriptionPayload {
  args:PersonHasOneAsCuratorArgsSubscriptionPayload
  relation: String
}

union PersonSubscriptionPayload = UpdatePersonSubscriptionPayload | PersonBelongsToUserSubscriptionPayload | PersonHasManySocialNetworksSubscriptionPayload | PersonHasManyPhonesSubscriptionPayload | PersonHasManyEmailsSubscriptionPayload | PersonHasManyAsStudentsSubscriptionPayload | PersonHasOneAsCuratorSubscriptionPayload`],
      'connectionsTypes': [`type PeopleConnection {
  pageInfo: PageInfo!
  edges: [PeopleEdge]
  # put here your additional connection fields
}

type PeopleEdge {
  node: Person
  cursor: String!
  # put here your additiona edge fields
}



type PersonHasManySocialNetworksConnection {
  pageInfo: PageInfo!
  edges: [PersonHasManySocialNetworksEdge]
  # put here your additional connection fields
}

type PersonHasManySocialNetworksEdge {
  node: SocialNetwork
  cursor: String!
  # put here your additiona edge fields
}


type PersonHasManyPhonesConnection {
  pageInfo: PageInfo!
  edges: [PersonHasManyPhonesEdge]
  # put here your additional connection fields
}

type PersonHasManyPhonesEdge {
  node: Phone
  cursor: String!
  # put here your additiona edge fields
}


type PersonHasManyEmailsConnection {
  pageInfo: PageInfo!
  edges: [PersonHasManyEmailsEdge]
  # put here your additional connection fields
}

type PersonHasManyEmailsEdge {
  node: Email
  cursor: String!
  # put here your additiona edge fields
}


type PersonHasManyAsStudentsConnection {
  pageInfo: PageInfo!
  edges: [PersonHasManyAsStudentsEdge]
  # put here your additional connection fields
}

type PersonHasManyAsStudentsEdge {
  node: Student
  cursor: String!
  # put here your additiona edge fields
}

`],
      'connectionsMutation': [`
input addToPersonBelongsToUserInput {
  clientMutationId: String
  person:ID!
  user:ID!
  #additional Edge fields
}

type addToPersonBelongsToUserPayload {
  clientMutationId: String
  viewer: Viewer
  person: Person
 }

input removeFromPersonBelongsToUserInput {
  clientMutationId: String
  user:ID!
  person:ID!
 }

type removeFromPersonBelongsToUserPayload {
  clientMutationId: String
  viewer: Viewer
  person: Person
 }

input addToPersonHasManySocialNetworksInput {
  clientMutationId: String
  person:ID!
  socialNetwork:ID!
  #additional Edge fields
}

type addToPersonHasManySocialNetworksPayload {
  clientMutationId: String
  viewer: Viewer
  person: Person
 }

input removeFromPersonHasManySocialNetworksInput {
  clientMutationId: String
  socialNetwork:ID!
  person:ID!
 }

type removeFromPersonHasManySocialNetworksPayload {
  clientMutationId: String
  viewer: Viewer
  person: Person
 }

input addToPersonHasManyPhonesInput {
  clientMutationId: String
  person:ID!
  phone:ID!
  #additional Edge fields
}

type addToPersonHasManyPhonesPayload {
  clientMutationId: String
  viewer: Viewer
  person: Person
 }

input removeFromPersonHasManyPhonesInput {
  clientMutationId: String
  phone:ID!
  person:ID!
 }

type removeFromPersonHasManyPhonesPayload {
  clientMutationId: String
  viewer: Viewer
  person: Person
 }

input addToPersonHasManyEmailsInput {
  clientMutationId: String
  person:ID!
  email:ID!
  #additional Edge fields
}

type addToPersonHasManyEmailsPayload {
  clientMutationId: String
  viewer: Viewer
  person: Person
 }

input removeFromPersonHasManyEmailsInput {
  clientMutationId: String
  email:ID!
  person:ID!
 }

type removeFromPersonHasManyEmailsPayload {
  clientMutationId: String
  viewer: Viewer
  person: Person
 }

input addToPersonHasManyAsStudentsInput {
  clientMutationId: String
  person:ID!
  student:ID!
  #additional Edge fields
}

type addToPersonHasManyAsStudentsPayload {
  clientMutationId: String
  viewer: Viewer
  person: Person
 }

input removeFromPersonHasManyAsStudentsInput {
  clientMutationId: String
  student:ID!
  person:ID!
 }

type removeFromPersonHasManyAsStudentsPayload {
  clientMutationId: String
  viewer: Viewer
  person: Person
 }

input addToPersonHasOneAsCuratorInput {
  clientMutationId: String
  person:ID!
  curator:ID!
  #additional Edge fields
}

type addToPersonHasOneAsCuratorPayload {
  clientMutationId: String
  viewer: Viewer
  person: Person
 }

input removeFromPersonHasOneAsCuratorInput {
  clientMutationId: String
  curator:ID!
  person:ID!
 }

type removeFromPersonHasOneAsCuratorPayload {
  clientMutationId: String
  viewer: Viewer
  person: Person
 }
`],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      'mutationEntry': [`createPerson(input: createPersonInput!): createPersonPayload
updatePerson(input: updatePersonInput!): updatePersonPayload
deletePerson(input: deletePersonInput!): deletePersonPayload`],
      'connectionsMutationEntry': [`addToPersonBelongsToUser(input: addToPersonBelongsToUserInput):addToPersonBelongsToUserPayload
removeFromPersonBelongsToUser(input: removeFromPersonBelongsToUserInput):removeFromPersonBelongsToUserPayload
addToPersonHasManySocialNetworks(input: addToPersonHasManySocialNetworksInput):addToPersonHasManySocialNetworksPayload
removeFromPersonHasManySocialNetworks(input: removeFromPersonHasManySocialNetworksInput):removeFromPersonHasManySocialNetworksPayload
addToPersonHasManyPhones(input: addToPersonHasManyPhonesInput):addToPersonHasManyPhonesPayload
removeFromPersonHasManyPhones(input: removeFromPersonHasManyPhonesInput):removeFromPersonHasManyPhonesPayload
addToPersonHasManyEmails(input: addToPersonHasManyEmailsInput):addToPersonHasManyEmailsPayload
removeFromPersonHasManyEmails(input: removeFromPersonHasManyEmailsInput):removeFromPersonHasManyEmailsPayload
addToPersonHasManyAsStudents(input: addToPersonHasManyAsStudentsInput):addToPersonHasManyAsStudentsPayload
removeFromPersonHasManyAsStudents(input: removeFromPersonHasManyAsStudentsInput):removeFromPersonHasManyAsStudentsPayload
addToPersonHasOneAsCurator(input: addToPersonHasOneAsCuratorInput):addToPersonHasOneAsCuratorPayload
removeFromPersonHasOneAsCurator(input: removeFromPersonHasOneAsCuratorInput):removeFromPersonHasOneAsCuratorPayload
`],
    });

    this._subscriptionEntry = fillDefaults(this._subscriptionEntry, {
      'subscriptionEntry': [`Person(filter: PersonFilterSubscriptions): PersonSubscription
`],
    });

    this._queryEntry = fillDefaults(this._queryEntry, {
      'queryEntry': [`  people( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [PersonSortOrder], filter: PersonComplexFilter): PeopleConnection

  person(id: ID, spiritualName: String, fullName: String): Person`],
    });

    this._mutation = fillDefaults(this._mutation, deepMerge(entityMutation, connectionMutation));
    this._subscription = fillDefaults(this._subscription, entitySubscription);

    this._viewerEntry = fillDefaults(this._viewerEntry, {
      'viewerEntry': [`  people( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [PersonSortOrder], filter: PersonFilter): PeopleConnection
  person(id: ID, spiritualName: String, fullName: String): Person`],
    });
  }
}
