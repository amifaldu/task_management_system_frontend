import { gql } from '@apollo/client';

// Query to fetch all tasks with pagination
export const GET_TASKS = gql`
  query GetTasks($first: Int, $after: String) {
    tasks(first: $first, after: $after) {
      edges {
        node {
          id
          title
          description
          status
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      totalCount
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