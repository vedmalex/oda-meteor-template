import gql from 'graphql-tag';
// fragments

export const fragments = {
  resultFragment: gql`fragment CourseResult on Course {
    id
    name

    subjectsIds: subjects @_(get:"edges") {
      edges @_( map:"node" ) {
        node @_(get:"id")  {
          id
        }
      }
    }
    groupsIds: groups @_(get:"edges") {
      edges @_( map:"node" ) {
        node @_(get:"id")  {
          id
        }
      }
    }
  }`,
  fullFragment: gql`fragment CourseFull on Course {
    id
    name
    subjects {
      edges {
        node {
          id
        }
      }
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
  getListResult: ({ resultFragment }) => gql`query getListOfCourseResult {
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...CourseResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getList: ({ fullFragment }) => gql`query getListOfCourse($skip: Int, $limit: Int, $orderBy: [CourseSortOrder], $filter: CourseComplexFilter) {
    items: courses(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
      pageInfo {
        count
      }
      edges {
        node {
          ...CourseFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //getOne
  getOneResult: ({ resultFragment }) => gql`{
    item {
      ...CourseResult
    }
  }
  ${resultFragment}
  `,
  getOne: ({ fullFragment }) => gql`query Course($id: ID) {
    item: course(id: $id) {
      ...CourseFull
    }
  }
  ${fullFragment}
  `,
  // getMany
  getManyResult: ({ resultFragment }) => gql`{
    items @_(get:"edges") {
      edges @_(map: "node")  {
        node {
          ...CourseResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getMany: ({ fullFragment }) => gql`query Courses($filter: CourseComplexFilter) {
    items: courses(filter: $filter) {
      edges {
        node {
          ...CourseFull
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
        ...CourseResult
      }
    }
  }
  ${resultFragment}
  `,
  delete: ({ fullFragment }) => gql`mutation deleteCourse ($input : deleteCourseInput!) {
    item: deleteCourse (input: $input) {
      node: course {
        ...CourseFull
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
          ...CourseResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  create: ({ fullFragment }) => gql`mutation createCourse($input: createCourseInput!) {
    item : createCourse (input : $input) {
      edge: course {
        node {
          ...CourseFull
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
        ...CourseResult
      }
    }
  }
  ${resultFragment}
  `,
  update: ({ fullFragment }) => gql`mutation updateCourse($input: updateCourseInput!) {
        item : updateCourse (input : $input) {
          node: course {
            ...CourseFull
          }
        }
      }
    ${fullFragment}
  `,
  //getManyReference
  getManyReference: ({ fullFragment }) => ({
      subjects: gql`query Subjects_Id($id: ID, $skip: Int, $limit: Int, $orderBy: [CourseSortOrder], $filter: CourseComplexFilter) {
      opposite: subject(id:$id) {
        id
        items: course(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
          pageInfo {
            count
          }
          edges {
            node {
              ...CourseFull
            }
          }
        }
      }
    }
    ${fullFragment}
  `,
  
    groups: gql`query Groups_Course($skip: Int, $limit: Int, $orderBy: [CourseSortOrder], $filter: CourseComplexFilter) {
      items: courses(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...CourseFull
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
            ...CourseResult
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
          ...CourseResult
        }
      }
    }
  }
    ${resultFragment}
  `,
  getManyReferenceResult: ({ resultFragment }, { getManyReferenceResultOpposite, getManyReferenceResultRegular }) => ({
    subjects: getManyReferenceResultOpposite({ resultFragment }),
    groups: getManyReferenceResultRegular({ resultFragment }),
  }),
}
