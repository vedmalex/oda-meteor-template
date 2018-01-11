
import { common } from 'oda-gen-graphql';

let { fillDefaults, deepMerge } = common.lib;

import { query } from './query/resolver';
import { viewer } from './viewer/resolver';
import { resolver } from './type/resolver';
import { mutation as connectionMutation } from './connections/mutations/resolver';
import { mutation as entityMutation } from './mutations/resolver';
import { subscriptions as entitySubscription, resolver as subscriptionsUnions } from './subscriptions/resolver';

export class PhoneEntity extends common.types.GQLModule {
  constructor(_args) {
    super(_args);
    this._query = fillDefaults(this._query, query);
    this._viewer = fillDefaults(this._viewer, viewer);
    this._resolver = fillDefaults(this._resolver, resolver, subscriptionsUnions);

    this._typeDef = fillDefaults(this._typeDef, {
      'enums': [`enum PhoneSortOrder {
  phoneNumberAsc
  phoneNumberDesc
  idAsc
  idDesc
}`],
      'type': [`
# # Phone


input EmbedPhoneFilter {
  or: [EmbedPhoneFilterItem]
  and: [EmbedPhoneFilterItem]
  some: PhoneFilter
  none: PhoneFilter
  every: PhoneFilter
}

input EmbedPhoneFilterItem {
  some: PhoneFilter
  none: PhoneFilter
  every: PhoneFilter
}

input PhoneFilter {
  or: [PhoneFilterItem]
  and: [PhoneFilterItem]
  phoneNumber: WhereString
  type: WhereString
  person: WhereID
  id: WhereID
}

input PhoneComplexFilter {
  or: [PhoneComplexFilter]
  and: [PhoneComplexFilter]
  phoneNumber: WhereString
  type: WhereString
  person: WhereID
  id: WhereID
}

input PhoneFilterItem {
  phoneNumber: WhereString
  type: WhereString
  person: WhereID
  id: WhereID
}

input PhoneFilterSubscriptionsItem {
  phoneNumber: WhereString
  type: WhereString
  person: WhereID
  id: WhereID
}

input PhoneFilterSubscriptions {
  or: [PhoneFilterSubscriptions]
  and: [PhoneFilterSubscriptions]
  mutation: WhereMutationKind
  node: PhoneFilterSubscriptionsItem
  previous: PhoneFilterSubscriptionsItem
  updatedFields: WhereListOfStrings
}

type Phone implements Node{
  # # Phone Number
  phoneNumber: String!
  # # Id
  id: ID!
  # # Type
  type: PhoneType

  # # Person
  person: Person

}


`],
      'mutationTypes': [`# Input types for basic CUD

# input type for Phone
input createPhoneInput {
  clientMutationId: String
  id: ID
  phoneNumber: String!
  type: embedPhoneTypeInput
  person: embedPersonInput
}

input embedPhoneInput {
  clientMutationId: String
  id: ID
  phoneNumber: String
  type: embedPhoneTypeInput
  person: embedPersonInput
}

# Payload type for Phone
type createPhonePayload {
  clientMutationId: String
  viewer: Viewer
  phone: PhonesEdge
}

# input type for Phone
input updatePhoneInput {
  clientMutationId: String
  id: ID
  phoneNumber: String
  type: embedPhoneTypeInput
  typeUnlink: embedPhoneTypeInput
  typeCreate: createPhoneTypeInput
  person: embedPersonInput
  personUnlink: embedPersonInput
  personCreate: createPersonInput
}

# Payload type for Phone
type updatePhonePayload {
  clientMutationId: String
  viewer: Viewer
  phone: Phone
}

# input type for Phone
input deletePhoneInput {
  clientMutationId: String
  id: ID
  phoneNumber: String
}

# Payload type for Phone
type deletePhonePayload {
  clientMutationId: String
  viewer: Viewer
  deletedItemId: ID
  phone: Phone
}
`],
      'subscriptionsTypes': [`# Input types for basic CUD

# input type for Phone

type UpdatePhoneSubscriptionPayload {

  id: ID
  phoneNumber: String
}

type PhoneSubscription {
  mutation: MutationKind!
  node: Phone!
  payload: PhoneSubscriptionPayload
  updatedFields: [String]
  previous: UpdatePhoneSubscriptionPayload
}

type PhoneBelongsToTypeArgsSubscriptionPayload {
  phone:ID!
  phoneType:ID!
}

type PhoneBelongsToTypeSubscriptionPayload {
  args:PhoneBelongsToTypeArgsSubscriptionPayload
  relation: String
}

type PhoneBelongsToPersonArgsSubscriptionPayload {
  phone:ID!
  person:ID!
}

type PhoneBelongsToPersonSubscriptionPayload {
  args:PhoneBelongsToPersonArgsSubscriptionPayload
  relation: String
}

union PhoneSubscriptionPayload = UpdatePhoneSubscriptionPayload | PhoneBelongsToTypeSubscriptionPayload | PhoneBelongsToPersonSubscriptionPayload`],
      'connectionsTypes': [`type PhonesConnection {
  pageInfo: PageInfo!
  edges: [PhonesEdge]
  # put here your additional connection fields
}

type PhonesEdge {
  node: Phone
  cursor: String!
  # put here your additiona edge fields
}


`],
      'connectionsMutation': [`
input addToPhoneBelongsToTypeInput {
  clientMutationId: String
  phone:ID!
  phoneType:ID!
  #additional Edge fields
}

type addToPhoneBelongsToTypePayload {
  clientMutationId: String
  viewer: Viewer
  phone: Phone
 }

input removeFromPhoneBelongsToTypeInput {
  clientMutationId: String
  phoneType:ID!
  phone:ID!
 }

type removeFromPhoneBelongsToTypePayload {
  clientMutationId: String
  viewer: Viewer
  phone: Phone
 }

input addToPhoneBelongsToPersonInput {
  clientMutationId: String
  phone:ID!
  person:ID!
  #additional Edge fields
}

type addToPhoneBelongsToPersonPayload {
  clientMutationId: String
  viewer: Viewer
  phone: Phone
 }

input removeFromPhoneBelongsToPersonInput {
  clientMutationId: String
  person:ID!
  phone:ID!
 }

type removeFromPhoneBelongsToPersonPayload {
  clientMutationId: String
  viewer: Viewer
  phone: Phone
 }
`],
    });

    this._mutationEntry = fillDefaults(this._mutationEntry, {
      'mutationEntry': [`createPhone(input: createPhoneInput!): createPhonePayload
updatePhone(input: updatePhoneInput!): updatePhonePayload
deletePhone(input: deletePhoneInput!): deletePhonePayload`],
      'connectionsMutationEntry': [`addToPhoneBelongsToType(input: addToPhoneBelongsToTypeInput):addToPhoneBelongsToTypePayload
removeFromPhoneBelongsToType(input: removeFromPhoneBelongsToTypeInput):removeFromPhoneBelongsToTypePayload
addToPhoneBelongsToPerson(input: addToPhoneBelongsToPersonInput):addToPhoneBelongsToPersonPayload
removeFromPhoneBelongsToPerson(input: removeFromPhoneBelongsToPersonInput):removeFromPhoneBelongsToPersonPayload
`],
    });

    this._subscriptionEntry = fillDefaults(this._subscriptionEntry, {
      'subscriptionEntry': [`Phone(filter: PhoneFilterSubscriptions): PhoneSubscription
`],
    });

    this._queryEntry = fillDefaults(this._queryEntry, {
      'queryEntry': [`  phones( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [PhoneSortOrder], filter: PhoneComplexFilter): PhonesConnection

  phone(id: ID, phoneNumber: String): Phone`],
    });

    this._mutation = fillDefaults(this._mutation, deepMerge(entityMutation, connectionMutation));
    this._subscription = fillDefaults(this._subscription, entitySubscription);

    this._viewerEntry = fillDefaults(this._viewerEntry, {
      'viewerEntry': [`  phones( after: String, first: Int, before: String, last: Int, limit: Int, skip: Int, orderBy: [PhoneSortOrder], filter: PhoneFilter): PhonesConnection
  phone(id: ID, phoneNumber: String): Phone`],
    });
  }
}
