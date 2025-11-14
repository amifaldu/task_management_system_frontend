import React from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TASK } from '../graphql/mutations';
import TaskForm from './TaskForm';
import ErrorBoundary from './ErrorBoundary';
import { useTaskForm } from '../hooks/useTaskForm';
import { useTaskActions } from '../hooks/useTaskActions';
import { useErrorHandler } from '../hooks/useErrorHandler';
// import { useApolloCache } from '../hooks/useApolloCache'; // Not used in create task
import { useTranslations } from '../hooks/useTranslations';  

// CreateTask component to manage the task creation process
const CreateTask = React.memo(() => {
  const {
    titleRef,            // Reference to the task title input
    descriptionRef,      // Reference to the task description input
    statusRef,           // Reference to the task status input
    resetForm,           // Function to reset the form fields
    getFormData,         // Function to collect data from the form fields
    validateForm,        // Function to validate the form before submission
  } = useTaskForm();

  //custom hook
  const { navigateToHome } = useTaskActions();
  const { t } = useTranslations();
  const { showValidationErrors } = useErrorHandler();
  // const { addTaskToCache } = useApolloCache(); // Not used in create task

  // useMutation hook to perform the create task mutation and manage loading and error states
  const [createTask, { data, loading, error }] = useMutation(CREATE_TASK, {
    onCompleted: (data) => {
      try {
        // On successful task creation, reset the form and navigate to the home page
        if (data?.createTask?.task) {
          resetForm();  // Reset the form fields to initial values
          navigateToHome({
            state: {
              successMessage: `✅ Task created: ${data.createTask.task.title}`,
              refetchTasks: true  // Signal that tasks need to be refetched
            }
          });
        } else if (data?.createTask?.errors?.length > 0) {
          // Handle validation errors from the server
          console.error('Server validation errors:', data.createTask.errors);
        }
      } catch (err) {
        console.error('Error in onCompleted handler:', err);
      }
    },
    onError: (error) => {
      console.error('GraphQL mutation error:', error);
      // Error will be handled by the component's error prop
    }
  });

  // Function to handle the form submission
  const handleSubmit = async () => {
    try {
      // Validate the form before submitting
      const { isValid, errors } = validateForm();

      if (!isValid) {
        showValidationErrors(errors);
        return;
      }

      // If form is valid, proceed with task creation by calling the mutation
      await createTask({
        variables: {
          input: getFormData(),  // Get form data and pass it as variables to the mutation
        },
      });
    } catch (error) {
      console.error('Error during form submission:', error);
      // Error is already handled by the mutation's onError callback
    }
  };

  // Function to get any errors from the mutation response
  const getErrors = () => {
    if (data?.createTask?.errors?.length > 0) {
      // Format and return error messages if there are any
      return data.createTask.errors.map((err) => `${err.field}: ${err.message}`).join(', ');
    }
    return null;
  };

  return (
    <ErrorBoundary>
      <TaskForm
        formTitle="Create Task"  // Form title
        titleRef={titleRef}      // Reference for the task title input
        descriptionRef={descriptionRef}  // Reference for the task description input
        statusRef={statusRef}    // Reference for the task status input
        onSubmit={handleSubmit}  // Submit handler for the form
        submitButtonText={t('formLabels.submitCreate')}  // Text for the submit button
        loading={loading}        // Loading state, passed to the form component
        error={error || getErrors()}  // Error state or formatted error messages
      />
    </ErrorBoundary>
  );
});

// Memoize the component to prevent unnecessary re-renders
CreateTask.displayName = 'CreateTask';

export default CreateTask;