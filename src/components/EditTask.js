import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASK } from '../graphql/queries';
import { UPDATE_TASK } from '../graphql/mutations';
import TaskForm from './TaskForm';
import LoadingSpinner from './LoadingSpinner';
import { useTaskForm } from '../hooks/useTaskForm';
import { useTaskActions } from '../hooks/useTaskActions';
import { useTranslations } from '../hooks/useTranslations';

// EditTask component: Handles the task editing process.
const EditTask = React.memo(() => {
  const { id } = useParams();  // Extract task ID from URL params
  const [task, setTask] = useState(null);  // Local state to store the task data

  // Fetch the task data using the 'GET_TASK' GraphQL query
  const { loading, error } = useQuery(GET_TASK, {
    variables: { id },
    fetchPolicy: 'cache-first',  // Use cached data first to avoid unnecessary network request
    onCompleted: (fetchedData) => {
      setTask(fetchedData?.task || null);  // Set the fetched task data into local state
    }
  });

  // Mutation hook to update the task with 'UPDATE_TASK' mutation
  const [updateTask] = useMutation(UPDATE_TASK);
  const { navigateToHomeWithSuccess } = useTaskActions();  // Custom hook for task actions
  const { navigation, messages, formLabels } = useTranslations();  // Custom hook for translations

  // Form hook to manage task form inputs (title, description, status)
  const {
    titleRef,  // Ref for task title input
    descriptionRef,  // Ref for task description input
    statusRef,  // Ref for task status input
    setFormData,  // Function to populate form fields with task data
    getFormData,  // Function to get data from the form fields
    validateForm,  // Function to validate the form
  } = useTaskForm(task || {});  // Pass task data to the form hook if available

  // Populate form fields with task data when the task is fetched or updated
  useEffect(() => {
    if (task) {
      setFormData(task);  // Set the form data with the fetched task
    }
  }, [task, setFormData]);  // Run the effect when task changes

  // Handle form submission: Validate, collect data, and update task
  const handleSubmit = async () => {
    const { isValid, errors } = validateForm();

    if (!isValid) {
      alert(errors.join('\n'));  // Show validation errors if the form is invalid
      return;
    }

    try {
      const formData = getFormData();  // Get the data from the form
      await updateTask({
        variables: {
          input: {
            id,
            ...formData,  // Include the task ID and form data
          },
        },
      });
      navigateToHomeWithSuccess(messages.taskUpdatedSuccess());  // Navigate to home with success message
    } catch (err) {
      console.error('Error updating task:', err);  // Log any errors that occur during mutation
    }
  };

  // Loading or error handling states
  if (loading || !task) {
    return <LoadingSpinner message={messages.loadingTask()} />;  // Show loading spinner while fetching data
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          {messages.errorLoadingTasks()}: {error.message}{/* Show error message if data fetch fails */}
        </div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          {messages.taskNotFound()}{/* Show warning message if the task is not found */}
        </div>
      </div>
    );
  }

  // Render the task form for editing
  return (
    <TaskForm
      key={task?.id || 'edit-form'}  // Unique key for the form (based on task ID)
      formTitle={navigation.editTask()}  // Title for the form (from translations)
      titleRef={titleRef}
      descriptionRef={descriptionRef}
      statusRef={statusRef}
      onSubmit={handleSubmit}  // Submit handler
      submitButtonText={formLabels.submitEdit()}  // Submit button text (from translations)
      loading={loading}
      error={error}
      successMessage={null}  // No success message directly on the form
      isTitleDisabled={true}  // Disable the title field as it’s not editable
    />
  );
});

EditTask.displayName = 'EditTask';  // Assign display name for debugging

export default EditTask;