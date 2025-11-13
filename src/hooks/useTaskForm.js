// hooks/useTaskForm.js
import { useRef } from 'react';

// Form reset,set,get and validate task-related Forms
export const useTaskForm = (initialTask = {}) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const statusRef = useRef(null);

  const resetForm = () => {
    if (titleRef.current) titleRef.current.value = '';
    if (descriptionRef.current) descriptionRef.current.value = '';
    if (statusRef.current) statusRef.current.value = '';
  };

  const setFormData = (taskData) => {
    setTimeout(() => {
      if (titleRef.current && taskData.title) titleRef.current.value = taskData.title;
      if (descriptionRef.current && taskData.description) descriptionRef.current.value = taskData.description;
      if (statusRef.current && taskData.status) statusRef.current.value = taskData.status;
    }, 0);
  };

  const getFormData = () => ({
    title: titleRef.current?.value?.trim() || '',
    description: descriptionRef.current?.value?.trim() || '',
    status: statusRef.current?.value || '',
  });

  const validateForm = () => {
    const formData = getFormData();
    const errors = [];

    if (!formData.title) {
      errors.push('Title is required');
    }

    if (!formData.description) {
      errors.push('Description is required');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  return {
    titleRef,
    descriptionRef,
    statusRef,
    resetForm,
    setFormData,
    getFormData,
    validateForm,
  };
};