import gql from 'graphql-tag';
// fragments

export const fragments = {
  resultFragment: gql`fragment PhoneResult on Phone {
    id
    phoneNumber

    typeId: type @_(get:"id") {
      id
    }
    personId: person @_(get:"id") {
      id
    }
  }`,
  fullFragment: gql`fragment PhoneFull on Phone {
    id
    phoneNumber
    type {
      id
    }
    person {
      id
    }
  }`,
}

export const queries = {
  // getList
  getListResult: ({ resultFragment }) => gql`query getListOfPhoneResult {
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...PhoneResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getList: ({ fullFragment }) => gql`query getListOfPhone($skip: Int, $limit: Int, $orderBy: [PhoneSortOrder], $filter: PhoneComplexFilter) {
    items: phones(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
      pageInfo {
        count
      }
      edges {
        node {
          ...PhoneFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //getOne
  getOneResult: ({ resultFragment }) => gql`{
    item {
      ...PhoneResult
    }
  }
  ${resultFragment}
  `,
  getOne: ({ fullFragment }) => gql`query Phone($id: ID) {
    item: phone(id: $id) {
      ...PhoneFull
    }
  }
  ${fullFragment}
  `,
  // getMany
  getManyResult: ({ resultFragment }) => gql`{
    items @_(get:"edges") {
      edges @_(map: "node")  {
        node {
          ...PhoneResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getMany: ({ fullFragment }) => gql`query Phones($filter: PhoneComplexFilter) {
    items: phones(filter: $filter) {
      edges {
        node {
          ...PhoneFull
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
        ...PhoneResult
      }
    }
  }
  ${resultFragment}
  `,
  delete: ({ fullFragment }) => gql`mutation deletePhone ($input : deletePhoneInput!) {
    item: deletePhone (input: $input) {
      node: phone {
        ...PhoneFull
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
          ...PhoneResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  create: ({ fullFragment }) => gql`mutation createPhone($input: createPhoneInput!) {
    item : createPhone (input : $input) {
      edge: phone {
        node {
          ...PhoneFull
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
        ...PhoneResult
      }
    }
  }
  ${resultFragment}
  `,
  update: ({ fullFragment }) => gql`mutation updatePhone($input: updatePhoneInput!) {
        item : updatePhone (input : $input) {
          node: phone {
            ...PhoneFull
          }
        }
      }
    ${fullFragment}
  `,
  //getManyReference
  getManyReference: ({ fullFragment }) => ({
  
    type: gql`query Type_Name($skip: Int, $limit: Int, $orderBy: [PhoneSortOrder], $filter: PhoneComplexFilter) {
      items: phones(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...PhoneFull
          }
        }
      }
    }
    ${fullFragment}
  `,
  
    person: gql`query Person_Id($skip: Int, $limit: Int, $orderBy: [PhoneSortOrder], $filter: PhoneComplexFilter) {
      items: phones(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...PhoneFull
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
            ...PhoneResult
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
          ...PhoneResult
        }
      }
    }
  }
    ${resultFragment}
  `,
  getManyReferenceResult: ({ resultFragment }, { getManyReferenceResultOpposite, getManyReferenceResultRegular }) => ({
    type: getManyReferenceResultRegular({ resultFragment }),
    person: getManyReferenceResultRegular({ resultFragment }),
  }),
}
