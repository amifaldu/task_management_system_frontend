import { gql } from '@apollo/client';

// Query to fetch all tasks
export const GET_TASKS = gql`
  query {
    tasks {
      id
      title
      description
      status
    }
  }
`;
// Query to fetch all tasks
export const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      status
    }
  }
`;