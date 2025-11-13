// hooks/useErrorHandler.js

/**
 * Custom hook for standardized error handling and logging
 * @returns {Object} - Error handling utilities
 */
export const useErrorHandler = () => {
  /**
   * Extract error message from various error formats
   * @param {Error|string|Object} error - The error to process
   * @returns {string} - Formatted error message
   */
  const getErrorMessage = (error) => {
    if (typeof error === 'string') return error;
    if (error?.message) return error.message;
    if (error?.graphQLErrors?.[0]?.message) return error.graphQLErrors[0].message;
    if (error?.networkError?.message) return error.networkError.message;
    return 'An unexpected error occurred';
  };

  /**
   * Log error with consistent formatting and context
   * @param {string} context - Description of where the error occurred
   * @param {Error|string|Object} error - The error to log
   */
  const logError = (context, error) => {
    const errorMessage = getErrorMessage(error);
    console.error(`${context}:`, errorMessage, error);
    // You could also add logging service integration here
  };

  /**
   * Handle validation errors array
   * @param {string[]} errors - Array of validation error messages
   * @returns {void}
   */
  const showValidationErrors = (errors) => {
    if (errors && errors.length > 0) {
      alert(errors.join('\n'));
    }
  };

  return {
    getErrorMessage,
    logError,
    showValidationErrors
  };
};