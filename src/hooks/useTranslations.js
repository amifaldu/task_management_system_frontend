import { useTranslation } from 'react-i18next';

/**
 * Custom hook for accessing translations with type safety and convenience
 * @returns {Object} Translation functions and current language
 */
export const useTranslations = () => {
  const { t, i18n } = useTranslation('common');

  return {
    // Basic translation function
    t,

    // Current language
    currentLanguage: i18n.language,

    // Language change function
    changeLanguage: i18n.changeLanguage,

    // Available languages
    availableLanguages: [
      { code: 'en', name: 'English' }
    ],

    // Convenience functions for common translation keys
    common: {
      title: () => t('common.title'),
      description: () => t('common.description'),
      status: () => t('common.status'),
      submit: () => t('common.submit'),
      cancel: () => t('common.cancel'),
      edit: () => t('common.edit'),
      delete: () => t('common.delete'),
      create: () => t('common.create'),
      update: () => t('common.update'),
      loading: () => t('common.loading'),
      error: () => t('common.error'),
      success: () => t('common.success'),
    },

    taskStatus: {
      todo: () => t('taskStatus.todo'),
      inProgress: () => t('taskStatus.inProgress'),
      done: () => t('taskStatus.done'),
      all: () => t('taskStatus.all'),
    },

    placeholders: {
      title: () => t('placeholders.title'),
      description: () => t('placeholders.description'),
      statusSelect: () => t('placeholders.statusSelect'),
    },

    formLabels: {
      title: () => t('formLabels.title'),
      description: () => t('formLabels.description'),
      status: () => t('formLabels.status'),
      submitCreate: () => t('formLabels.submitCreate'),
      submitEdit: () => t('formLabels.submitEdit'),
      cancel: () => t('formLabels.cancel'),
    },

    messages: {
      loadingTasks: () => t('messages.loadingTasks'),
      loadingTask: () => t('messages.loadingTask'),
      errorLoadingTasks: () => t('messages.errorLoadingTasks'),
      taskNotFound: () => t('messages.taskNotFound'),
      processing: () => t('messages.processing'),
      noTasks: () => t('messages.noTasks'),
      noFilteredTasks: (status) => t('messages.noFilteredTasks', { status }),
      deleteConfirmation: () => t('messages.deleteConfirmation'),
      taskDeletedSuccess: () => t('messages.taskDeletedSuccess'),
      taskUpdatedSuccess: () => t('messages.taskUpdatedSuccess'),
      taskCreatedSuccess: (title) => t('messages.taskCreatedSuccess', { title }),
      validationTitleRequired: () => t('messages.validationTitleRequired'),
      validationDescriptionRequired: () => t('messages.validationDescriptionRequired'),
    },

    navigation: {
      home: () => t('navigation.home'),
      createTask: () => t('navigation.createTask'),
      editTask: () => t('navigation.editTask'),
    },

    table: {
      headers: {
        title: () => t('table.headers.title'),
        description: () => t('table.headers.description'),
        status: () => t('table.headers.status'),
        actions: () => t('table.headers.actions'),
      },
      noData: () => t('table.noData'),
    },

    alerts: {
      success: () => t('alerts.success'),
      error: () => t('alerts.error'),
      warning: () => t('alerts.warning'),
      info: () => t('alerts.info'),
    },
  };
};