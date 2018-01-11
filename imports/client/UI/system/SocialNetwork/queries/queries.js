import gql from 'graphql-tag';
// fragments

export const fragments = {
  resultFragment: gql`fragment SocialNetworkResult on SocialNetwork {
    id
    account
    url

    typeId: type @_(get:"id") {
      id
    }
    personId: person @_(get:"id") {
      id
    }
  }`,
  fullFragment: gql`fragment SocialNetworkFull on SocialNetwork {
    id
    account
    url
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
  getListResult: ({ resultFragment }) => gql`query getListOfSocialNetworkResult {
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...SocialNetworkResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getList: ({ fullFragment }) => gql`query getListOfSocialNetwork($skip: Int, $limit: Int, $orderBy: [SocialNetworkSortOrder], $filter: SocialNetworkComplexFilter) {
    items: socialNetworks(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
      pageInfo {
        count
      }
      edges {
        node {
          ...SocialNetworkFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //getOne
  getOneResult: ({ resultFragment }) => gql`{
    item {
      ...SocialNetworkResult
    }
  }
  ${resultFragment}
  `,
  getOne: ({ fullFragment }) => gql`query SocialNetwork($id: ID) {
    item: socialNetwork(id: $id) {
      ...SocialNetworkFull
    }
  }
  ${fullFragment}
  `,
  // getMany
  getManyResult: ({ resultFragment }) => gql`{
    items @_(get:"edges") {
      edges @_(map: "node")  {
        node {
          ...SocialNetworkResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getMany: ({ fullFragment }) => gql`query SocialNetworks($filter: SocialNetworkComplexFilter) {
    items: socialNetworks(filter: $filter) {
      edges {
        node {
          ...SocialNetworkFull
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
        ...SocialNetworkResult
      }
    }
  }
  ${resultFragment}
  `,
  delete: ({ fullFragment }) => gql`mutation deleteSocialNetwork ($input : deleteSocialNetworkInput!) {
    item: deleteSocialNetwork (input: $input) {
      node: socialNetwork {
        ...SocialNetworkFull
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
          ...SocialNetworkResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  create: ({ fullFragment }) => gql`mutation createSocialNetwork($input: createSocialNetworkInput!) {
    item : createSocialNetwork (input : $input) {
      edge: socialNetwork {
        node {
          ...SocialNetworkFull
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
        ...SocialNetworkResult
      }
    }
  }
  ${resultFragment}
  `,
  update: ({ fullFragment }) => gql`mutation updateSocialNetwork($input: updateSocialNetworkInput!) {
        item : updateSocialNetwork (input : $input) {
          node: socialNetwork {
            ...SocialNetworkFull
          }
        }
      }
    ${fullFragment}
  `,
  //getManyReference
  getManyReference: ({ fullFragment }) => ({
  
    type: gql`query Type_Name($skip: Int, $limit: Int, $orderBy: [SocialNetworkSortOrder], $filter: SocialNetworkComplexFilter) {
      items: socialNetworks(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...SocialNetworkFull
          }
        }
      }
    }
    ${fullFragment}
  `,
  
    person: gql`query Person_Id($skip: Int, $limit: Int, $orderBy: [SocialNetworkSortOrder], $filter: SocialNetworkComplexFilter) {
      items: socialNetworks(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...SocialNetworkFull
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
            ...SocialNetworkResult
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
          ...SocialNetworkResult
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
