import gql from 'graphql-tag';
// fragments

export const fragments = {
  resultFragment: gql`fragment MeetingResult on Meeting {
    id
    date

    curatorId: curator @_(get:"id") {
      id
    }
    groupId: group @_(get:"id") {
      id
    }
    studentsValues: students @_(get:"edges") {
      edges @_( each: {assign:"node"} ) {
        present
        specialNotes
        node  {
          id
        }
      }
    }
  }`,
  fullFragment: gql`fragment MeetingFull on Meeting {
    id
    date
    curator {
      id
    }
    group {
      id
    }
    students {
      edges {
        present
        specialNotes
        node {
          id
        }
      }
    }
  }`,
}

export const queries = {
  // getList
  getListResult: ({ resultFragment }) => gql`query getListOfMeetingResult {
    items {
      total: pageInfo @_(get:"count") {
        count
      }
      data: edges @_(each: {assign:"node"}) {
        node {
          ...MeetingResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getList: ({ fullFragment }) => gql`query getListOfMeeting($skip: Int, $limit: Int, $orderBy: [MeetingSortOrder], $filter: MeetingComplexFilter) {
    items: meetings(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
      pageInfo {
        count
      }
      edges {
        node {
          ...MeetingFull
        }
      }
    }
  }
  ${fullFragment}
  `,
  //getOne
  getOneResult: ({ resultFragment }) => gql`{
    item {
      ...MeetingResult
    }
  }
  ${resultFragment}
  `,
  getOne: ({ fullFragment }) => gql`query Meeting($id: ID) {
    item: meeting(id: $id) {
      ...MeetingFull
    }
  }
  ${fullFragment}
  `,
  // getMany
  getManyResult: ({ resultFragment }) => gql`{
    items @_(get:"edges") {
      edges @_(map: "node")  {
        node {
          ...MeetingResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  getMany: ({ fullFragment }) => gql`query Meetings($filter: MeetingComplexFilter) {
    items: meetings(filter: $filter) {
      edges {
        node {
          ...MeetingFull
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
        ...MeetingResult
      }
    }
  }
  ${resultFragment}
  `,
  delete: ({ fullFragment }) => gql`mutation deleteMeeting ($input : deleteMeetingInput!) {
    item: deleteMeeting (input: $input) {
      node: meeting {
        ...MeetingFull
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
          ...MeetingResult
        }
      }
    }
  }
  ${resultFragment}
  `,
  create: ({ fullFragment }) => gql`mutation createMeeting($input: createMeetingInput!) {
    item : createMeeting (input : $input) {
      edge: meeting {
        node {
          ...MeetingFull
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
        ...MeetingResult
      }
    }
  }
  ${resultFragment}
  `,
  update: ({ fullFragment }) => gql`mutation updateMeeting($input: updateMeetingInput!) {
        item : updateMeeting (input : $input) {
          node: meeting {
            ...MeetingFull
          }
        }
      }
    ${fullFragment}
  `,
  //getManyReference
  getManyReference: ({ fullFragment }) => ({
  
    curator: gql`query Curator_Id($skip: Int, $limit: Int, $orderBy: [MeetingSortOrder], $filter: MeetingComplexFilter) {
      items: meetings(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...MeetingFull
          }
        }
      }
    }
    ${fullFragment}
  `,
  
    group: gql`query Group_Id($skip: Int, $limit: Int, $orderBy: [MeetingSortOrder], $filter: MeetingComplexFilter) {
      items: meetings(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
        pageInfo {
          count
        }
        edges {
          node {
            ...MeetingFull
          }
        }
      }
    }
    ${fullFragment}
  `,
      students: gql`query Students_Id($id: ID, $skip: Int, $limit: Int, $orderBy: [MeetingSortOrder], $filter: MeetingComplexFilter) {
      opposite: student(id:$id) {
        id
        items: meetings(skip:$skip, limit: $limit, orderBy: $orderBy, filter: $filter) {
          pageInfo {
            count
          }
          edges {
            node {
              ...MeetingFull
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
            ...MeetingResult
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
          ...MeetingResult
        }
      }
    }
  }
    ${resultFragment}
  `,
  getManyReferenceResult: ({ resultFragment }, { getManyReferenceResultOpposite, getManyReferenceResultRegular }) => ({
    curator: getManyReferenceResultRegular({ resultFragment }),
    group: getManyReferenceResultRegular({ resultFragment }),
    students: getManyReferenceResultOpposite({ resultFragment }),
  }),
}
