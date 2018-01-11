import gql from 'graphql-tag';

export const fragments = {
  resultFragment: gql`fragment CuratorResult on Curator {
    id
    fullName: person @_(get:fullName)
    spiritualName: person @_(get:spiritualName)
    personId: person @_(get:"id") {
      id
    }
    groupsIds: groups @_(get:"edges") {
      edges @_(map:"node") {
        node @_(get:"id") {
          id
        }
      }
    }
  }`,
  fullFragment: gql`fragment CuratorFull on Curator {
    id
    person {
      id
      spiritualName
      fullName
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
