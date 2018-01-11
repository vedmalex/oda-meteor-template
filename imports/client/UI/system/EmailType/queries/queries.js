import gql from 'graphql-tag';
// fragments

export const fragments = {
  resultFragment: gql`fragment EmailTypeResult on EmailType {
    id
    name

  }`,
  fullFragment: gql`fragment EmailTypeFull on EmailType {
    id
    name
  }`,
}

export const queries = {
  // getList
  getListResult: ({ resultFragment }) => gql`query getListOfEmailTypeResult {
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...EmailTypeResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getList: ({ fullFragment }) => gql`query getListOfEmailType($skip: Int, $limit: Int, $orderBy: [EmailTypeSortOrder], $filter: EmailTypeComplexFilter) {
    items: emailTypes(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
      pageInfo {
        count
      }
      edges {
        node {
          ...EmailTypeFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //getOne
  getOneResult: ({ resultFragment }) => gql`{
    item {
      ...EmailTypeResult
    }
  }
  ${resultFragment}
  `,
  getOne: ({ fullFragment }) => gql`query EmailType($id: ID) {
    item: emailType(id: $id) {
      ...EmailTypeFull
    }
  }
  ${fullFragment}
  `,
  // getMany
  getManyResult: ({ resultFragment }) => gql`{
    items @_(get:"edges") {
      edges @_(map: "node")  {
        node {
          ...EmailTypeResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getMany: ({ fullFragment }) => gql`query EmailTypes($filter: EmailTypeComplexFilter) {
    items: emailTypes(filter: $filter) {
      edges {
        node {
          ...EmailTypeFull
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
        ...EmailTypeResult
      }
    }
  }
  ${resultFragment}
  `,
  delete: ({ fullFragment }) => gql`mutation deleteEmailType ($input : deleteEmailTypeInput!) {
    item: deleteEmailType (input: $input) {
      node: emailType {
        ...EmailTypeFull
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
          ...EmailTypeResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  create: ({ fullFragment }) => gql`mutation createEmailType($input: createEmailTypeInput!) {
    item : createEmailType (input : $input) {
      edge: emailType {
        node {
          ...EmailTypeFull
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
        ...EmailTypeResult
      }
    }
  }
  ${resultFragment}
  `,
  update: ({ fullFragment }) => gql`mutation updateEmailType($input: updateEmailTypeInput!) {
        item : updateEmailType (input : $input) {
          node: emailType {
            ...EmailTypeFull
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
            ...EmailTypeResult
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
          ...EmailTypeResult
        }
      }
    }
  }
    ${resultFragment}
  `,
  getManyReferenceResult: ({ resultFragment }, { getManyReferenceResultOpposite, getManyReferenceResultRegular }) => ({
  }),
}
