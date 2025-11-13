// hooks/useSuccessMessage.js
import { useState, useCallback, useRef } from 'react';

/**
 * Custom hook for managing success messages with auto-dismiss functionality
 * @param {number} duration - Auto-dismiss duration in milliseconds (default: 5000)
 * @returns {[string, Function]} - [message, setMessage]
 */
export const useSuccessMessage = (duration = 5000) => {
  const [message, setMessage] = useState('');
  const timeoutRef = useRef(null);

  const setSuccessMessage = useCallback((msg) => {
    setMessage(msg);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout if message is not empty
    if (msg) {
      timeoutRef.current = setTimeout(() => {
        setMessage('');
      }, duration);
    }
  }, [duration]);

  // Cleanup timeout on unmount
  const clearSuccessMessage = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setMessage('');
  }, []);

  return [message, setSuccessMessage, clearSuccessMessage];
};