import gql from 'graphql-tag';
// fragments

export const fragments = {
  resultFragment: gql`fragment PersonResult on Person {
    id
    spiritualName
    fullName
    dateOfBirth
    ages
    specialNotes

    userId: user @_(get:"id") {
      id
    }
    socialNetworksValues: socialNetworks @_(get:"edges") {
      edges @_( each: {assign:"node"} ) {
        node  {
          id
        }
      }
    }
    phonesValues: phones @_(get:"edges") {
      edges @_( each: {assign:"node"} ) {
        node  {
          id
        }
      }
    }
    emailsValues: emails @_(get:"edges") {
      edges @_( each: {assign:"node"} ) {
        node  {
          id
        }
      }
    }
    asStudentsIds: asStudents @_(get:"edges") {
      edges @_( map:"node" ) {
        node @_(get:"id")  {
          id
        }
      }
    }
    asCuratorId: asCurator @_(get:"id") {
      id
    }
  }`,
  fullFragment: gql`fragment PersonFull on Person {
    id
    spiritualName
    fullName
    dateOfBirth
    ages
    specialNotes
    user {
      id
    }
    socialNetworks {
      edges {
        node {
          id
        }
      }
    }
    phones {
      edges {
        node {
          id
        }
      }
    }
    emails {
      edges {
        node {
          id
        }
      }
    }
    asStudents {
      edges {
        node {
          id
        }
      }
    }
    asCurator {
      id
    }
  }`,
}

export const queries = {
  // getList
  getListResult: ({ resultFragment }) => gql`query getListOfPersonResult {
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...PersonResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getList: ({ fullFragment }) => gql`query getListOfPerson($skip: Int, $limit: Int, $orderBy: [PersonSortOrder], $filter: PersonComplexFilter) {
    items: people(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
      pageInfo {
        count
      }
      edges {
        node {
          ...PersonFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //getOne
  getOneResult: ({ resultFragment }) => gql`{
    item {
      ...PersonResult
    }
  }
  ${resultFragment}
  `,
  getOne: ({ fullFragment }) => gql`query Person($id: ID) {
    item: person(id: $id) {
      ...PersonFull
    }
  }
  ${fullFragment}
  `,
  // getMany
  getManyResult: ({ resultFragment }) => gql`{
    items @_(get:"edges") {
      edges @_(map: "node")  {
        node {
          ...PersonResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getMany: ({ fullFragment }) => gql`query People($filter: PersonComplexFilter) {
    items: people(filter: $filter) {
      edges {
        node {
          ...PersonFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //delete
  deleteResult: ({ resultFragment }) => gql`{
    item @_(get:"node") {
      node {
        ...PersonResult
      }
    }
  }
  ${resultFragment}
  `,
  delete: ({ fullFragment }) => gql`mutation deletePerson ($input : deletePersonInput!) {
    item: deletePerson (input: $input) {
      node: person {
        ...PersonFull
      }
    }
  }
  ${fullFragment}
  `,
  //create
  createResult: ({ resultFragment }) => gql`{
    item @_(get: "edge.node") {
      edge {
        node {
          ...PersonResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  create: ({ fullFragment }) => gql`mutation createPerson($input: createPersonInput!) {
    item : createPerson (input : $input) {
      edge: person {
        node {
          ...PersonFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //update
  updateResult: ({ resultFragment }) => gql`{
    item @_(get:"node") {
      node {
        ...PersonResult
      }
    }
  }
  ${resultFragment}
  `,
  update: ({ fullFragment }) => gql`mutation updatePerson($input: updatePersonInput!) {
        item : updatePerson (input : $input) {
          node: person {
            ...PersonFull
          }
        }
      }
    ${fullFragment}
  `,
  //getManyReference
  getManyReference: ({ fullFragment }) => ({
  
    user: gql`query User_Id($skip: Int, $limit: Int, $orderBy: [PersonSortOrder], $filter: PersonComplexFilter) {
      items: people(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...PersonFull
          }
        }
      }
    }
    ${fullFragment}
  `,
  
    socialNetworks: gql`query SocialNetworks_Person($skip: Int, $limit: Int, $orderBy: [PersonSortOrder], $filter: PersonComplexFilter) {
      items: people(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...PersonFull
          }
        }
      }
    }
    ${fullFragment}
  `,
  
    phones: gql`query Phones_Person($skip: Int, $limit: Int, $orderBy: [PersonSortOrder], $filter: PersonComplexFilter) {
      items: people(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...PersonFull
          }
        }
      }
    }
    ${fullFragment}
  `,
  
    emails: gql`query Emails_Person($skip: Int, $limit: Int, $orderBy: [PersonSortOrder], $filter: PersonComplexFilter) {
      items: people(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...PersonFull
          }
        }
      }
    }
    ${fullFragment}
  `,
  
    asStudents: gql`query AsStudents_Person($skip: Int, $limit: Int, $orderBy: [PersonSortOrder], $filter: PersonComplexFilter) {
      items: people(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...PersonFull
          }
        }
      }
    }
    ${fullFragment}
  `,
  
    asCurator: gql`query AsCurator_Person($skip: Int, $limit: Int, $orderBy: [PersonSortOrder], $filter: PersonComplexFilter) {
      items: people(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...PersonFull
          }
        }
      }
    }
    ${fullFragment}
  `,
    }),
  getManyReferenceResultOpposite: ({ resultFragment }) => gql`{
    items: opposite @_(get:"items") {
      items {
        total: pageInfo @_(get:"count") {
          count
        }
        data: edges @_(each: {assign:"node"}) {
          node {
            ...PersonResult
          }
        }
      }
    }
  }
    ${resultFragment}
  `,
  getManyReferenceResultRegular: ({ resultFragment }) => gql`{
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...PersonResult
        }
      }
    }
  }
    ${resultFragment}
  `,
  getManyReferenceResult: ({ resultFragment }, { getManyReferenceResultOpposite, getManyReferenceResultRegular }) => ({
    user: getManyReferenceResultRegular({ resultFragment }),
    socialNetworks: getManyReferenceResultRegular({ resultFragment }),
    phones: getManyReferenceResultRegular({ resultFragment }),
    emails: getManyReferenceResultRegular({ resultFragment }),
    asStudents: getManyReferenceResultRegular({ resultFragment }),
    asCurator: getManyReferenceResultRegular({ resultFragment }),
  }),
}
