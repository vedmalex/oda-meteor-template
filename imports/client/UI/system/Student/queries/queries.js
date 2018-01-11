import gql from 'graphql-tag';
// fragments

export const fragments = {
  resultFragment: gql`fragment StudentResult on Student {
    id

    personId: person @_(get:"id") {
      id
    }
    groupId: group @_(get:"id") {
      id
    }
    meetingsIds: meetings @_(get:"edges") {
      edges @_( map:"node" ) {
        node @_(get:"id")  {
          id
        }
      }
    }
  }`,
  fullFragment: gql`fragment StudentFull on Student {
    id
    person {
      id
    }
    group {
      id
    }
    meetings {
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
  getListResult: ({ resultFragment }) => gql`query getListOfStudentResult {
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...StudentResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getList: ({ fullFragment }) => gql`query getListOfStudent($skip: Int, $limit: Int, $orderBy: [StudentSortOrder], $filter: StudentComplexFilter) {
    items: students(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
      pageInfo {
        count
      }
      edges {
        node {
          ...StudentFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //getOne
  getOneResult: ({ resultFragment }) => gql`{
    item {
      ...StudentResult
    }
  }
  ${resultFragment}
  `,
  getOne: ({ fullFragment }) => gql`query Student($id: ID) {
    item: student(id: $id) {
      ...StudentFull
    }
  }
  ${fullFragment}
  `,
  // getMany
  getManyResult: ({ resultFragment }) => gql`{
    items @_(get:"edges") {
      edges @_(map: "node")  {
        node {
          ...StudentResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getMany: ({ fullFragment }) => gql`query Students($filter: StudentComplexFilter) {
    items: students(filter: $filter) {
      edges {
        node {
          ...StudentFull
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
        ...StudentResult
      }
    }
  }
  ${resultFragment}
  `,
  delete: ({ fullFragment }) => gql`mutation deleteStudent ($input : deleteStudentInput!) {
    item: deleteStudent (input: $input) {
      node: student {
        ...StudentFull
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
          ...StudentResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  create: ({ fullFragment }) => gql`mutation createStudent($input: createStudentInput!) {
    item : createStudent (input : $input) {
      edge: student {
        node {
          ...StudentFull
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
        ...StudentResult
      }
    }
  }
  ${resultFragment}
  `,
  update: ({ fullFragment }) => gql`mutation updateStudent($input: updateStudentInput!) {
        item : updateStudent (input : $input) {
          node: student {
            ...StudentFull
          }
        }
      }
    ${fullFragment}
  `,
  //getManyReference
  getManyReference: ({ fullFragment }) => ({
  
    person: gql`query Person_Id($skip: Int, $limit: Int, $orderBy: [StudentSortOrder], $filter: StudentComplexFilter) {
      items: students(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...StudentFull
          }
        }
      }
    }
    ${fullFragment}
  `,
  
    group: gql`query Group_Id($skip: Int, $limit: Int, $orderBy: [StudentSortOrder], $filter: StudentComplexFilter) {
      items: students(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...StudentFull
          }
        }
      }
    }
    ${fullFragment}
  `,
      meetings: gql`query Meetings_Id($id: ID, $skip: Int, $limit: Int, $orderBy: [StudentSortOrder], $filter: StudentComplexFilter) {
      opposite: meeting(id:$id) {
        id
        items: students(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
          pageInfo {
            count
          }
          edges {
            node {
              ...StudentFull
            }
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
            ...StudentResult
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
          ...StudentResult
        }
      }
    }
  }
    ${resultFragment}
  `,
  getManyReferenceResult: ({ resultFragment }, { getManyReferenceResultOpposite, getManyReferenceResultRegular }) => ({
    person: getManyReferenceResultRegular({ resultFragment }),
    group: getManyReferenceResultRegular({ resultFragment }),
    meetings: getManyReferenceResultOpposite({ resultFragment }),
  }),
}
