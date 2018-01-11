import gql from 'graphql-tag';
// fragments

export const fragments = {
  resultFragment: gql`fragment SocialNetworkTypeResult on SocialNetworkType {
    id
    name

  }`,
  fullFragment: gql`fragment SocialNetworkTypeFull on SocialNetworkType {
    id
    name
  }`,
}

export const queries = {
  // getList
  getListResult: ({ resultFragment }) => gql`query getListOfSocialNetworkTypeResult {
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...SocialNetworkTypeResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getList: ({ fullFragment }) => gql`query getListOfSocialNetworkType($skip: Int, $limit: Int, $orderBy: [SocialNetworkTypeSortOrder], $filter: SocialNetworkTypeComplexFilter) {
    items: socialNetworkTypes(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
      pageInfo {
        count
      }
      edges {
        node {
          ...SocialNetworkTypeFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //getOne
  getOneResult: ({ resultFragment }) => gql`{
    item {
      ...SocialNetworkTypeResult
    }
  }
  ${resultFragment}
  `,
  getOne: ({ fullFragment }) => gql`query SocialNetworkType($id: ID) {
    item: socialNetworkType(id: $id) {
      ...SocialNetworkTypeFull
    }
  }
  ${fullFragment}
  `,
  // getMany
  getManyResult: ({ resultFragment }) => gql`{
    items @_(get:"edges") {
      edges @_(map: "node")  {
        node {
          ...SocialNetworkTypeResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getMany: ({ fullFragment }) => gql`query SocialNetworkTypes($filter: SocialNetworkTypeComplexFilter) {
    items: socialNetworkTypes(filter: $filter) {
      edges {
        node {
          ...SocialNetworkTypeFull
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
        ...SocialNetworkTypeResult
      }
    }
  }
  ${resultFragment}
  `,
  delete: ({ fullFragment }) => gql`mutation deleteSocialNetworkType ($input : deleteSocialNetworkTypeInput!) {
    item: deleteSocialNetworkType (input: $input) {
      node: socialNetworkType {
        ...SocialNetworkTypeFull
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
          ...SocialNetworkTypeResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  create: ({ fullFragment }) => gql`mutation createSocialNetworkType($input: createSocialNetworkTypeInput!) {
    item : createSocialNetworkType (input : $input) {
      edge: socialNetworkType {
        node {
          ...SocialNetworkTypeFull
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
        ...SocialNetworkTypeResult
      }
    }
  }
  ${resultFragment}
  `,
  update: ({ fullFragment }) => gql`mutation updateSocialNetworkType($input: updateSocialNetworkTypeInput!) {
        item : updateSocialNetworkType (input : $input) {
          node: socialNetworkType {
            ...SocialNetworkTypeFull
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
            ...SocialNetworkTypeResult
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
          ...SocialNetworkTypeResult
        }
      }
    }
  }
    ${resultFragment}
  `,
  getManyReferenceResult: ({ resultFragment }, { getManyReferenceResultOpposite, getManyReferenceResultRegular }) => ({
  }),
}
