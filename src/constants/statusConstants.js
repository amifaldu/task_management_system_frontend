// statusConstants.js
export const TASK_STATUS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

export const STATUS_OPTIONS = ['All', TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE];

export const STATUS_VARIANTS = {
  [TASK_STATUS.TODO]: 'secondary',
  [TASK_STATUS.IN_PROGRESS]: 'dark',
  [TASK_STATUS.DONE]: 'success',
};

export const FORM_LABELS = {
  TITLE: 'Title',
  DESCRIPTION: 'Description',
  STATUS: 'Status',
  SUBMIT_CREATE: 'Create Task',
  SUBMIT_EDIT: 'Update Task',
  CANCEL: 'Cancel',
};

export const PLACEHOLDERS = {
  TITLE: 'Enter task title',
  DESCRIPTION: 'Enter task description',
  STATUS_SELECT: 'Select status',
};

export const MESSAGES = {
  LOADING_TASKS: 'Loading tasks...',
  LOADING_TASK: 'Loading task...',
  ERROR_LOADING_TASKS: 'Error loading tasks',
  TASK_NOT_FOUND: 'Task not found',
  PROCESSING: 'Processing...',
  NO_TASKS: 'No tasks found. Create your first task!',
  NO_FILTERED_TASKS: (status) => `No tasks found with status "${status}".`,
  DELETE_CONFIRMATION: 'Are you sure you want to delete this task?',
  TASK_DELETED_SUCCESS: 'Task deleted successfully!',
  TASK_UPDATED_SUCCESS: 'Task updated successfully!',
  VALIDATION_TITLE_REQUIRED: 'Title is required',
  VALIDATION_DESCRIPTION_REQUIRED: 'Description is required',
};