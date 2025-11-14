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

/**
 * Map status string to enum value for GraphQL
 * @param {string} status - The status string from UI (display format)
 * @returns {string} - The enum value for GraphQL
 */
export const getEnumStatus = (status) => {
  const statusMap = {
    [TASK_STATUS.TODO]: 'TO_DO',
    [TASK_STATUS.IN_PROGRESS]: 'IN_PROGRESS',
    [TASK_STATUS.DONE]: 'DONE',
    'All': null
  };
  return statusMap[status] || status;
};

// Note: Form labels and messages have been moved to i18n translations
// to support internationalization. Check src/locales/en/common.json