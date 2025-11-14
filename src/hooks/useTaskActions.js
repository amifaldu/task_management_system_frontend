// hooks/useTaskActions.js
import { useNavigate } from 'react-router-dom';

// Custom hook to manage task-related navigation actions
export const useTaskActions = () => {
  const navigate = useNavigate();

  const navigateToCreate = () => {
    navigate('/create');
  };

  const navigateToEdit = (taskId) => {
    navigate(`/edit/${taskId}`);
  };

  const navigateToHome = (options = {}) => {
    navigate('/', options);
  };

  const navigateToHomeWithSuccess = (successMessage) => {
    navigate('/', { state: { successMessage } });
  };

  // Return an object with all the navigation functions
  return {
    navigateToCreate,
    navigateToEdit,
    navigateToHome,
    navigateToHomeWithSuccess,
  };
};