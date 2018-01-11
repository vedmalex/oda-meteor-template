import gql from 'graphql-tag';
// fragments

export const fragments = {
  resultFragment: gql`fragment SubjectResult on Subject {
    id
    name

    courseIds: course @_(get:"edges") {
      edges @_( map:"node" ) {
        node @_(get:"id")  {
          id
        }
      }
    }
  }`,
  fullFragment: gql`fragment SubjectFull on Subject {
    id
    name
    course {
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
  getListResult: ({ resultFragment }) => gql`query getListOfSubjectResult {
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...SubjectResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getList: ({ fullFragment }) => gql`query getListOfSubject($skip: Int, $limit: Int, $orderBy: [SubjectSortOrder], $filter: SubjectComplexFilter) {
    items: subjects(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
      pageInfo {
        count
      }
      edges {
        node {
          ...SubjectFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //getOne
  getOneResult: ({ resultFragment }) => gql`{
    item {
      ...SubjectResult
    }
  }
  ${resultFragment}
  `,
  getOne: ({ fullFragment }) => gql`query Subject($id: ID) {
    item: subject(id: $id) {
      ...SubjectFull
    }
  }
  ${fullFragment}
  `,
  // getMany
  getManyResult: ({ resultFragment }) => gql`{
    items @_(get:"edges") {
      edges @_(map: "node")  {
        node {
          ...SubjectResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getMany: ({ fullFragment }) => gql`query Subjects($filter: SubjectComplexFilter) {
    items: subjects(filter: $filter) {
      edges {
        node {
          ...SubjectFull
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
        ...SubjectResult
      }
    }
  }
  ${resultFragment}
  `,
  delete: ({ fullFragment }) => gql`mutation deleteSubject ($input : deleteSubjectInput!) {
    item: deleteSubject (input: $input) {
      node: subject {
        ...SubjectFull
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
          ...SubjectResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  create: ({ fullFragment }) => gql`mutation createSubject($input: createSubjectInput!) {
    item : createSubject (input : $input) {
      edge: subject {
        node {
          ...SubjectFull
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
        ...SubjectResult
      }
    }
  }
  ${resultFragment}
  `,
  update: ({ fullFragment }) => gql`mutation updateSubject($input: updateSubjectInput!) {
        item : updateSubject (input : $input) {
          node: subject {
            ...SubjectFull
          }
        }
      }
    ${fullFragment}
  `,
  //getManyReference
  getManyReference: ({ fullFragment }) => ({
      course: gql`query Courses_Id($id: ID, $skip: Int, $limit: Int, $orderBy: [SubjectSortOrder], $filter: SubjectComplexFilter) {
      opposite: course(id:$id) {
        id
        items: subjects(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
          pageInfo {
            count
          }
          edges {
            node {
              ...SubjectFull
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
            ...SubjectResult
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
          ...SubjectResult
        }
      }
    }
  }
    ${resultFragment}
  `,
  getManyReferenceResult: ({ resultFragment }, { getManyReferenceResultOpposite, getManyReferenceResultRegular }) => ({
    course: getManyReferenceResultOpposite({ resultFragment }),
  }),
}
