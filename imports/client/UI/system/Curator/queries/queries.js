import gql from 'graphql-tag';
// fragments

export const fragments = {
  resultFragment: gql`fragment CuratorResult on Curator {
    id
    spiritualName
    fullName

    personId: person @_(get:"id") {
      id
    }
    groupsIds: groups @_(get:"edges") {
      edges @_( map:"node" ) {
        node @_(get:"id")  {
          id
        }
      }
    }
  }`,
  fullFragment: gql`fragment CuratorFull on Curator {
    id
    spiritualName
    fullName
    person {
      id
    }
    groups {
      edges {
        node {
          id
        }
      }
    }
  }`,
}

export const queries = {
  // getList
  getListResult: ({ resultFragment }) => gql`query getListOfCuratorResult {
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...CuratorResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getList: ({ fullFragment }) => gql`query getListOfCurator($skip: Int, $limit: Int, $orderBy: [CuratorSortOrder], $filter: CuratorComplexFilter) {
    items: curators(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
      pageInfo {
        count
      }
      edges {
        node {
          ...CuratorFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //getOne
  getOneResult: ({ resultFragment }) => gql`{
    item {
      ...CuratorResult
    }
  }
  ${resultFragment}
  `,
  getOne: ({ fullFragment }) => gql`query Curator($id: ID) {
    item: curator(id: $id) {
      ...CuratorFull
    }
  }
  ${fullFragment}
  `,
  // getMany
  getManyResult: ({ resultFragment }) => gql`{
    items @_(get:"edges") {
      edges @_(map: "node")  {
        node {
          ...CuratorResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getMany: ({ fullFragment }) => gql`query Curators($filter: CuratorComplexFilter) {
    items: curators(filter: $filter) {
      edges {
        node {
          ...CuratorFull
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
        ...CuratorResult
      }
    }
  }
  ${resultFragment}
  `,
  delete: ({ fullFragment }) => gql`mutation deleteCurator ($input : deleteCuratorInput!) {
    item: deleteCurator (input: $input) {
      node: curator {
        ...CuratorFull
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
          ...CuratorResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  create: ({ fullFragment }) => gql`mutation createCurator($input: createCuratorInput!) {
    item : createCurator (input : $input) {
      edge: curator {
        node {
          ...CuratorFull
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
        ...CuratorResult
      }
    }
  }
  ${resultFragment}
  `,
  update: ({ fullFragment }) => gql`mutation updateCurator($input: updateCuratorInput!) {
        item : updateCurator (input : $input) {
          node: curator {
            ...CuratorFull
          }
        }
      }
    ${fullFragment}
  `,
  //getManyReference
  getManyReference: ({ fullFragment }) => ({
  
    person: gql`query Person_Id($skip: Int, $limit: Int, $orderBy: [CuratorSortOrder], $filter: CuratorComplexFilter) {
      items: curators(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...CuratorFull
          }
        }
      }
    }
    ${fullFragment}
  `,
  
    groups: gql`query Groups_Curator($skip: Int, $limit: Int, $orderBy: [CuratorSortOrder], $filter: CuratorComplexFilter) {
      items: curators(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...CuratorFull
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
            ...CuratorResult
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
          ...CuratorResult
        }
      }
    }
  }
    ${resultFragment}
  `,
  getManyReferenceResult: ({ resultFragment }, { getManyReferenceResultOpposite, getManyReferenceResultRegular }) => ({
    person: getManyReferenceResultRegular({ resultFragment }),
    groups: getManyReferenceResultRegular({ resultFragment }),
  }),
}
