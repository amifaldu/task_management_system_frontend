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
  const { t } = useTranslations();

  const resetPagination = useCallback(() => {
    setCurrentPage(0);
    setHasNextPage(false);
    setHasPreviousPage(false);
    setStartCursor(null);
    setEndCursor(null);
    setTotalCount(0);
  }, []);

  const updatePaginationState = useCallback((pageInfo, totalCountValue) => {
    setHasNextPage(pageInfo.hasNextPage);
    setHasPreviousPage(pageInfo.hasPreviousPage);
    setStartCursor(pageInfo.startCursor);
    setEndCursor(pageInfo.endCursor);
    setTotalCount(totalCountValue);
  }, []);

  const getNextPageVariables = useCallback(() => {
    if (!hasNextPage) return null;

    return {
      first: TASKS_PER_PAGE,
      after: endCursor
    };
  }, [hasNextPage, endCursor]);

  
  const getInitialPageVariables = useCallback(() => {
    return {
      first: TASKS_PER_PAGE,
      after: null
    };
  }, []);

  const goToNextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasNextPage]);

  
  const goToFirstPage = useCallback(() => {
    setCurrentPage(0);
  }, []);

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

    // Actions
    resetPagination,
    updatePaginationState,
    goToNextPage,
    goToFirstPage,

    // Query variable helpers
    getNextPageVariables,
    getInitialPageVariables,

    // Constants
    TASKS_PER_PAGE
  };
};