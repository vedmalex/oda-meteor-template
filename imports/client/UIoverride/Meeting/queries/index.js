import gql from 'graphql-tag';
import { data } from 'oda-aor-rest';
import set from 'lodash/set';

export default {
  fragments: {
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
        edges @_(each: {assign:"node"}) {
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
  },
};
