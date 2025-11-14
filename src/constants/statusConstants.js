// statusConstants.js
export const TASK_STATUS = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

export const STATUS_OPTIONS = ['All', TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE];

export const STATUS_VARIANTS = {
  [TASK_STATUS.TODO]: 'warning',
  [TASK_STATUS.IN_PROGRESS]: 'info',
  [TASK_STATUS.DONE]: 'success',
};

// Note: Form labels and messages have been moved to i18n translations
// to support internationalization. Check src/locales/en/common.json