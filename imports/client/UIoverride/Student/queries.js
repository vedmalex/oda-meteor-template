import { data } from 'oda-aor-rest';
import gql from 'graphql-tag';

// fragments

console.log(__filename)

export default {
  fragments: {
    resultFragment: gql`fragment StudentResult on Student {
      id
      personFullName: person @_(get:fullName) {
        fullName
      }
      personSpiritualName: person @_(get:spiritualName) {
        spiritualName
      }
      groupName: group @_(get:name) {
        name
      }
      personId: person @_(get:"id") {
        id
      }
      groupId: group @_(get:"id") {
        id
      }
    }`,
    fullFragment: gql`fragment StudentFull on Student {
    id
    person {
      id
      fullName
      spiritualName
    }
    group {
      id
      name
    }
  }`,
  }
}