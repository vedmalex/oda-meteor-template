import gql from 'graphql-tag';
// fragments

export const fragments = {
  resultFragment: gql`fragment GroupResult on Group {
    id
    name

    studentsIds: students @_(get:"edges") {
      edges @_(map:"node") {
        node @_(get:"id")  {
          id
        }
      }
    }
    curatorId: curator @_(get:"id") {
      id
    }
  }`,
  fullFragment: gql`fragment GroupFull on Group {
    id
    name
    students {
      edges {
        node {
          id
        }
      }
    }
    curator {
      id
    }
  }`,
}

export const queries = {
  // getList
  getListResult: ({ resultFragment }) => gql`query getListOfGroupResult {
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...GroupResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getList: ({ fullFragment }) => gql`query getListOfGroup($skip: Int, $limit: Int, $orderBy: [GroupSortOrder], $filter: GroupComplexFilter) {
    items: groups(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
      pageInfo {
        count
      }
      edges {
        node {
          ...GroupFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //getOne
  getOneResult: ({ resultFragment }) => gql`{
    item {
      ...GroupResult
    }
  }
  ${resultFragment}
  `,
  getOne: ({fullFragment}) => gql`query Group($id: ID) {
    item: group(id: $id) {
      ...GroupFull
    }
  }
  ${fullFragment}
  `,
  // getMany
  getManyResult: ({ resultFragment }) => gql`{
    items @_(get:"edges") {
      edges @_(map: "node")  {
        node {
          ...GroupResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getMany: ({ fullFragment }) => gql`query Groups($filter: GroupComplexFilter) {
    items: groups(filter: $filter) {
      edges {
        node {
          ...GroupFull
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
        ...GroupResult
      }
    }
  }
  ${resultFragment}
  `,
  delete: ({ fullFragment }) => gql`mutation deleteGroup ($input : deleteGroupInput!) {
    item: deleteGroup (input: $input) {
      node: group {
        ...GroupFull
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
          ...GroupResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  create: ({ fullFragment }) => gql`mutation createGroup($input: createGroupInput!) {
    item : createGroup (input : $input) {
      edge: group {
        node {
          ...GroupFull
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
        ...GroupResult
      }
    }
  }
  ${resultFragment}
  `,
  update: ({ fullFragment }) => gql`mutation updateGroup($input: updateGroupInput!) {
        item : updateGroup (input : $input) {
          node: group {
            ...GroupFull
          }
        }
      }
    ${fullFragment}
  `,
  //getManyReference
  getManyReference: ({ fullFragment }) => ({
  
    students: gql`query Students_Group($skip: Int, $limit: Int, $orderBy: [GroupSortOrder], $filter: GroupComplexFilter) {
      items: groups(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...GroupFull
          }
        }
      }
    }
    ${fullFragment}
  `,
  
    curator: gql`query Curator_Id($skip: Int, $limit: Int, $orderBy: [GroupSortOrder], $filter: GroupComplexFilter) {
      items: groups(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...GroupFull
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
            ...GroupResult
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
          ...GroupResult
        }
      }
    }
  }
    ${resultFragment}
  `,
  getManyReferenceResult: ({ resultFragment }, { getManyReferenceResultOpposite , getManyReferenceResultRegular }) => ({
  
    students: getManyReferenceResultRegular({ resultFragment }),
  
    curator: getManyReferenceResultRegular({ resultFragment }),
  }),
}
