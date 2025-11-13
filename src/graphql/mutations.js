import { gql } from '@apollo/client';

// Mutation to create a new task
export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      task {
        id
        title
        description
        status
        createdAt
        updatedAt
      }
      errors {
        field
        message
      }
    }
  }
`
// Mutation to update an existing task
export const UPDATE_TASK = gql`
  mutation($input: UpdateTaskInput!) {
        updateTask(input: $input) {
          task {
            id
            title
            description
            status
            updatedAt
          }
          errors {
            field
            message
          }
        }
      }
`;
// Mutation to delete a task
export const DELETE_TASK = gql`
  mutation($id: ID!) {
        deleteTask(id: $id) {
          success
          errors {
            field
            message
          }
        }
      }`;