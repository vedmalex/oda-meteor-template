import gql from 'graphql-tag';
// fragments

export const fragments = {
  resultFragment: gql`fragment SubjectCourseResult on SubjectCourse {
    id
    description
    subject
    course
    hours
    level

    subjectLinkId: subjectLink @_(get:"id") {
      id
    }
    courseLinkId: courseLink @_(get:"id") {
      id
    }
  }`,
  fullFragment: gql`fragment SubjectCourseFull on SubjectCourse {
    id
    description
    subject
    course
    hours
    level
    subjectLink {
      id
    }
    courseLink {
      id
    }
  }`,
}

export const queries = {
  // getList
  getListResult: ({ resultFragment }) => gql`query getListOfSubjectCourseResult {
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...SubjectCourseResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getList: ({ fullFragment }) => gql`query getListOfSubjectCourse($skip: Int, $limit: Int, $orderBy: [SubjectCourseSortOrder], $filter: SubjectCourseComplexFilter) {
    items: subjectCourses(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
      pageInfo {
        count
      }
      edges {
        node {
          ...SubjectCourseFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //getOne
  getOneResult: ({ resultFragment }) => gql`{
    item {
      ...SubjectCourseResult
    }
  }
  ${resultFragment}
  `,
  getOne: ({ fullFragment }) => gql`query SubjectCourse($id: ID) {
    item: subjectCourse(id: $id) {
      ...SubjectCourseFull
    }
  }
  ${fullFragment}
  `,
  // getMany
  getManyResult: ({ resultFragment }) => gql`{
    items @_(get:"edges") {
      edges @_(map: "node")  {
        node {
          ...SubjectCourseResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getMany: ({ fullFragment }) => gql`query SubjectCourses($filter: SubjectCourseComplexFilter) {
    items: subjectCourses(filter: $filter) {
      edges {
        node {
          ...SubjectCourseFull
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
        ...SubjectCourseResult
      }
    }
  }
  ${resultFragment}
  `,
  delete: ({ fullFragment }) => gql`mutation deleteSubjectCourse ($input : deleteSubjectCourseInput!) {
    item: deleteSubjectCourse (input: $input) {
      node: subjectCourse {
        ...SubjectCourseFull
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
          ...SubjectCourseResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  create: ({ fullFragment }) => gql`mutation createSubjectCourse($input: createSubjectCourseInput!) {
    item : createSubjectCourse (input : $input) {
      edge: subjectCourse {
        node {
          ...SubjectCourseFull
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
        ...SubjectCourseResult
      }
    }
  }
  ${resultFragment}
  `,
  update: ({ fullFragment }) => gql`mutation updateSubjectCourse($input: updateSubjectCourseInput!) {
        item : updateSubjectCourse (input : $input) {
          node: subjectCourse {
            ...SubjectCourseFull
          }
        }
      }
    ${fullFragment}
  `,
  //getManyReference
  getManyReference: ({ fullFragment }) => ({
  
    subjectLink: gql`query SubjectLink_Id($skip: Int, $limit: Int, $orderBy: [SubjectCourseSortOrder], $filter: SubjectCourseComplexFilter) {
      items: subjectCourses(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...SubjectCourseFull
          }
        }
      }
    }
    ${fullFragment}
  `,
  
    courseLink: gql`query CourseLink_Id($skip: Int, $limit: Int, $orderBy: [SubjectCourseSortOrder], $filter: SubjectCourseComplexFilter) {
      items: subjectCourses(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...SubjectCourseFull
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
            ...SubjectCourseResult
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
          ...SubjectCourseResult
        }
      }
    }
  }
    ${resultFragment}
  `,
  getManyReferenceResult: ({ resultFragment }, { getManyReferenceResultOpposite, getManyReferenceResultRegular }) => ({
    subjectLink: getManyReferenceResultRegular({ resultFragment }),
    courseLink: getManyReferenceResultRegular({ resultFragment }),
  }),
}
