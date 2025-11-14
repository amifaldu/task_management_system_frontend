import { useState, useCallback } from 'react';
import { useTranslations } from './useTranslations';

const TASKS_PER_PAGE = 2;

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [startCursor, setStartCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [cursorHistory, setCursorHistory] = useState([null]); // Store cursor for each page
  const { t } = useTranslations();

  const resetPagination = useCallback(() => {
    setCurrentPage(0);
    setHasNextPage(false);
    setHasPreviousPage(false);
    setStartCursor(null);
    setEndCursor(null);
    setTotalCount(0);
    setCursorHistory([null]);
  }, []);

  const updatePaginationState = useCallback((pageInfo, totalCountValue) => {
    setHasNextPage(pageInfo.hasNextPage);
    setHasPreviousPage(pageInfo.hasPreviousPage);
    setStartCursor(pageInfo.startCursor);
    setEndCursor(pageInfo.endCursor);
    setTotalCount(totalCountValue);

    // Update cursor history when we have a new endCursor
    if (pageInfo.endCursor && currentPage >= 0) {
      setCursorHistory(prev => {
        const newHistory = [...prev];
        // Ensure the array is long enough
        while (newHistory.length <= currentPage) {
          newHistory.push(null);
        }
        newHistory[currentPage] = pageInfo.endCursor;
        return newHistory;
      });
    }
  }, [currentPage]);

  const getQueryVariables = useCallback(() => {
    if (currentPage === 0) {
      // First page - only send first
      return {
        first: TASKS_PER_PAGE
      };
    } else {
      // Subsequent pages - use cursor from history
      const cursorForPage = cursorHistory[currentPage - 1]; // Use cursor from previous page
      return {
        first: TASKS_PER_PAGE,
        after: cursorForPage
      };
    }
  }, [currentPage, cursorHistory]);

  const goToNextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasNextPage]);

  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  }, [hasPreviousPage, currentPage]);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(0);
    setEndCursor(null); // Reset cursor for first page
    setCursorHistory([null]); // Reset cursor history
  }, []);

  const goToLastPage = useCallback(() => {
    const lastPage = Math.max(0, Math.ceil(totalCount / TASKS_PER_PAGE) - 1);
    setCurrentPage(lastPage);
  }, [totalCount]);

  const paginationInfo = {
    currentPage: currentPage + 1, // Convert to 1-based index for display
    totalPages: Math.ceil(totalCount / TASKS_PER_PAGE),
    startItem: currentPage * TASKS_PER_PAGE + 1,
    endItem: Math.min((currentPage + 1) * TASKS_PER_PAGE, totalCount),
    totalItems: totalCount,
    itemsPerPage: TASKS_PER_PAGE
  };

  const paginationText = totalCount > 0
    ? t('pagination.showing', {
        start: paginationInfo.startItem,
        end: paginationInfo.endItem,
        total: paginationInfo.totalItems
      })
    : '';

  return {
    // State
    currentPage,
    hasNextPage,
    hasPreviousPage,
    startCursor,
    endCursor,
    totalCount,
    paginationInfo,
    paginationText,
    cursorHistory,

    // Actions
    resetPagination,
    updatePaginationState,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,

    // Query variable helper
    getQueryVariables,

    // Constants
    TASKS_PER_PAGE
  };
};