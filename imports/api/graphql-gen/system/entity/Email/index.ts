
import { common } from 'oda-gen-graphql';

let { fillDefaults, deepMerge } = common.lib;

import { query } from './query/resolver';
import { viewer } from './viewer/resolver';
import { resolver } from './type/resolver';
import { mutation as connectionMutation } from './connections/mutations/resolver';
import { mutation as entityMutation } from './mutations/resolver';
import { subscriptions as entitySubscription, resolver as subscriptionsUnions } from './subscriptions/resolver';

export class EmailEntity extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._query = fillDefaults(this._query, query);
    this._viewer = fillDefaults(this._viewer, viewer);
    this._resolver = fillDefaults(this._resolver, resolver, subscriptionsUnions);

    this._typeDef = fillDefaults(this._typeDef, {
      'enums': [`enum EmailSortOrder {
  emailAsc
  emailDesc
  idAsc
  idDesc
}`],
      'type': [`
# # Email


input EmbedEmailFilter {
  or: [EmbedEmailFilterItem]
  and: [EmbedEmailFilterItem]
  some: EmailFilter
  none: EmailFilter
  every: EmailFilter
}

input EmbedEmailFilterItem {
  some: EmailFilter
  none: EmailFilter
  every: EmailFilter
}

input EmailFilter {
  or: [EmailFilterItem]
  and: [EmailFilterItem]
  email: WhereString
  type: WhereString
  person: WhereID
  id: WhereID
}

input EmailComplexFilter {
  or: [EmailComplexFilter]
  and: [EmailComplexFilter]
  email: WhereString
  type: WhereString
  person: WhereID
  id: WhereID
}

input EmailFilterItem {
  email: WhereString
  type: WhereString
  person: WhereID
  id: WhereID
}

input EmailFilterSubscriptionsItem {
  email: WhereString
  type: WhereString
  person: WhereID
  id: WhereID
}

input EmailFilterSubscriptions {
  or: [EmailFilterSubscriptions]
  and: [EmailFilterSubscriptions]
  mutation: WhereMutationKind
  node: EmailFilterSubscriptionsItem
  previous: EmailFilterSubscriptionsItem
  updatedFields: WhereListOfStrings
}

type Email implements Node{
  # # Email
  email: String!
  # # Id
  id: ID!
  # # Type
  type: EmailType

  # # Person
  person: Person

}


`],
      'mutationTypes': [`# Input types for basic CUD

# input type for Email
input createEmailInput {
  clientMutationId: String
  id: ID
  email: String!
  type: embedEmailTypeInput
  person: embedPersonInput
}

input embedEmailInput {
  clientMutationId: String
  id: ID
  email: String
  type: embedEmailTypeInput
  person: embedPersonInput
}

# Payload type for Email
type createEmailPayload {
  clientMutationId: String
  viewer: Viewer
  email: EmailsEdge
}

# input type for Email
input updateEmailInput {
  clientMutationId: String
  id: ID
  email: String
  type: embedEmailTypeInput
  typeUnlink: embedEmailTypeInput
  typeCreate: createEmailTypeInput
  person: embedPersonInput
  personUnlink: embedPersonInput
  personCreate: createPersonInput
}

# Payload type for Email
type updateEmailPayload {
  clientMutationId: String
  viewer: Viewer
  email: Email
}

# input type for Email
input deleteEmailInput {
  clientMutationId: String
  id: ID
  email: String
}

# Payload type for Email
type deleteEmailPayload {
  clientMutationId: String
  viewer: Viewer
  deletedItemId: ID
  email: Email
}
`],
      'subscriptionsTypes': [`# Input types for basic CUD

# input type for Email

type UpdateEmailSubscriptionPayload {

  id: ID
  email: String
}

type EmailSubscription {
  mutation: MutationKind!
  node: Email!
  payload: EmailSubscriptionPayload
  updatedFields: [String]
  previous: UpdateEmailSubscriptionPayload
}

type EmailBelongsToTypeArgsSubscriptionPayload {
  email:ID!
  emailType:ID!
}

type EmailBelongsToTypeSubscriptionPayload {
  args:EmailBelongsToTypeArgsSubscriptionPayload
  relation: String
}

type EmailBelongsToPersonArgsSubscriptionPayload {
  email:ID!
  person:ID!
}

type EmailBelongsToPersonSubscriptionPayload {
  args:EmailBelongsToPersonArgsSubscriptionPayload
  relation: String
}

union EmailSubscriptionPayload = UpdateEmailSubscriptionPayload | EmailBelongsToTypeSubscriptionPayload | EmailBelongsToPersonSubscriptionPayload`],
      'connectionsTypes': [`type EmailsConnection {
  pageInfo: PageInfo!
  edges: [EmailsEdge]
  # put here your additional connection fields
}

type EmailsEdge {
  node: Email
  cursor: String!
  # put here your additiona edge fields
}


`],
      'connectionsMutation': [`
input addToEmailBelongsToTypeInput {
  clientMutationId: String
  email:ID!
  emailType:ID!
  #additional Edge fields
}

type addToEmailBelongsToTypePayload {
  clientMutationId: String
  viewer: Viewer
  email: Email
 }

input removeFromEmailBelongsToTypeInput {
  clientMutationId: String
  emailType:ID!
  email:ID!
 }

type removeFromEmailBelongsToTypePayload {
  clientMutationId: String
  viewer: Viewer
  email: Email
 }

input addToEmailBelongsToPersonInput {
  clientMutationId: String
  email:ID!
  person:ID!
  #additional Edge fields
}

type addToEmailBelongsToPersonPayload {
  clientMutationId: String
  viewer: Viewer
  email: Email
 }

input removeFromEmailBelongsToPersonInput {
  clientMutationId: String
  person:ID!
  email:ID!
 }

type removeFromEmailBelongsToPersonPayload {
  clientMutationId: String
  viewer: Viewer
  email: Email
 }
`],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      'mutationEntry': [`createEmail(input: createEmailInput!): createEmailPayload
updateEmail(input: updateEmailInput!): updateEmailPayload
deleteEmail(input: deleteEmailInput!): deleteEmailPayload`],
      'connectionsMutationEntry': [`addToEmailBelongsToType(input: addToEmailBelongsToTypeInput):addToEmailBelongsToTypePayload
removeFromEmailBelongsToType(input: removeFromEmailBelongsToTypeInput):removeFromEmailBelongsToTypePayload
addToEmailBelongsToPerson(input: addToEmailBelongsToPersonInput):addToEmailBelongsToPersonPayload
removeFromEmailBelongsToPerson(input: removeFromEmailBelongsToPersonInput):removeFromEmailBelongsToPersonPayload
`],
    });

    this._subscriptionEntry = fillDefaults(this._subscriptionEntry, {
      'subscriptionEntry': [`Email(filter: EmailFilterSubscriptions): EmailSubscription
`],
    });

    this._queryEntry = fillDefaults(this._queryEntry, {
      'queryEntry': [`  emails( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [EmailSortOrder], filter: EmailComplexFilter): EmailsConnection

  email(id: ID, email: String): Email`],
    });

    this._mutation = fillDefaults(this._mutation, deepMerge(entityMutation, connectionMutation));
    this._subscription = fillDefaults(this._subscription, entitySubscription);

    this._viewerEntry = fillDefaults(this._viewerEntry, {
      'viewerEntry': [`  emails( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [EmailSortOrder], filter: EmailFilter): EmailsConnection
  email(id: ID, email: String): Email`],
    });
  }
}
