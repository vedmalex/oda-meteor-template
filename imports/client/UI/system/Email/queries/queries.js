import gql from 'graphql-tag';
// fragments

export const fragments = {
  resultFragment: gql`fragment EmailResult on Email {
    id
    email

    typeId: type @_(get:"id") {
      id
    }
    personId: person @_(get:"id") {
      id
    }
  }`,
  fullFragment: gql`fragment EmailFull on Email {
    id
    email
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
  getListResult: ({ resultFragment }) => gql`query getListOfEmailResult {
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...EmailResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getList: ({ fullFragment }) => gql`query getListOfEmail($skip: Int, $limit: Int, $orderBy: [EmailSortOrder], $filter: EmailComplexFilter) {
    items: emails(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
      pageInfo {
        count
      }
      edges {
        node {
          ...EmailFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //getOne
  getOneResult: ({ resultFragment }) => gql`{
    item {
      ...EmailResult
    }
  }
  ${resultFragment}
  `,
  getOne: ({ fullFragment }) => gql`query Email($id: ID) {
    item: email(id: $id) {
      ...EmailFull
    }
  }
  ${fullFragment}
  `,
  // getMany
  getManyResult: ({ resultFragment }) => gql`{
    items @_(get:"edges") {
      edges @_(map: "node")  {
        node {
          ...EmailResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getMany: ({ fullFragment }) => gql`query Emails($filter: EmailComplexFilter) {
    items: emails(filter: $filter) {
      edges {
        node {
          ...EmailFull
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
        ...EmailResult
      }
    }
  }
  ${resultFragment}
  `,
  delete: ({ fullFragment }) => gql`mutation deleteEmail ($input : deleteEmailInput!) {
    item: deleteEmail (input: $input) {
      node: email {
        ...EmailFull
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
          ...EmailResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  create: ({ fullFragment }) => gql`mutation createEmail($input: createEmailInput!) {
    item : createEmail (input : $input) {
      edge: email {
        node {
          ...EmailFull
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
        ...EmailResult
      }
    }
  }
  ${resultFragment}
  `,
  update: ({ fullFragment }) => gql`mutation updateEmail($input: updateEmailInput!) {
        item : updateEmail (input : $input) {
          node: email {
            ...EmailFull
          }
        }
      }
    ${fullFragment}
  `,
  //getManyReference
  getManyReference: ({ fullFragment }) => ({
  
    type: gql`query Type_Name($skip: Int, $limit: Int, $orderBy: [EmailSortOrder], $filter: EmailComplexFilter) {
      items: emails(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...EmailFull
          }
        }
      }
    }
    ${fullFragment}
  `,
  
    person: gql`query Person_Id($skip: Int, $limit: Int, $orderBy: [EmailSortOrder], $filter: EmailComplexFilter) {
      items: emails(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...EmailFull
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
            ...EmailResult
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
          ...EmailResult
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
