import gql from 'graphql-tag';
// fragments

export const fragments = {
  resultFragment: gql`fragment PhoneTypeResult on PhoneType {
    id
    name

  }`,
  fullFragment: gql`fragment PhoneTypeFull on PhoneType {
    id
    name
  }`,
}

export const queries = {
  // getList
  getListResult: ({ resultFragment }) => gql`query getListOfPhoneTypeResult {
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...PhoneTypeResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getList: ({ fullFragment }) => gql`query getListOfPhoneType($skip: Int, $limit: Int, $orderBy: [PhoneTypeSortOrder], $filter: PhoneTypeComplexFilter) {
    items: phoneTypes(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
      pageInfo {
        count
      }
      edges {
        node {
          ...PhoneTypeFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //getOne
  getOneResult: ({ resultFragment }) => gql`{
    item {
      ...PhoneTypeResult
    }
  }
  ${resultFragment}
  `,
  getOne: ({ fullFragment }) => gql`query PhoneType($id: ID) {
    item: phoneType(id: $id) {
      ...PhoneTypeFull
    }
  }
  ${fullFragment}
  `,
  // getMany
  getManyResult: ({ resultFragment }) => gql`{
    items @_(get:"edges") {
      edges @_(map: "node")  {
        node {
          ...PhoneTypeResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getMany: ({ fullFragment }) => gql`query PhoneTypes($filter: PhoneTypeComplexFilter) {
    items: phoneTypes(filter: $filter) {
      edges {
        node {
          ...PhoneTypeFull
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
        ...PhoneTypeResult
      }
    }
  }
  ${resultFragment}
  `,
  delete: ({ fullFragment }) => gql`mutation deletePhoneType ($input : deletePhoneTypeInput!) {
    item: deletePhoneType (input: $input) {
      node: phoneType {
        ...PhoneTypeFull
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
          ...PhoneTypeResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  create: ({ fullFragment }) => gql`mutation createPhoneType($input: createPhoneTypeInput!) {
    item : createPhoneType (input : $input) {
      edge: phoneType {
        node {
          ...PhoneTypeFull
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
        ...PhoneTypeResult
      }
    }
  }
  ${resultFragment}
  `,
  update: ({ fullFragment }) => gql`mutation updatePhoneType($input: updatePhoneTypeInput!) {
        item : updatePhoneType (input : $input) {
          node: phoneType {
            ...PhoneTypeFull
          }
        }
      }
    ${fullFragment}
  `,
  //getManyReference
  getManyReference: ({ fullFragment }) => ({
    }),
  getManyReferenceResultOpposite: ({ resultFragment }) => gql`{
    items: opposite @_(get:"items") {
      items {
        total: pageInfo @_(get:"count") {
          count
        }
        data: edges @_(each: {assign:"node"}) {
          node {
            ...PhoneTypeResult
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
          ...PhoneTypeResult
        }
      }
    }
  }
    ${resultFragment}
  `,
  getManyReferenceResult: ({ resultFragment }, { getManyReferenceResultOpposite, getManyReferenceResultRegular }) => ({
  }),
}
