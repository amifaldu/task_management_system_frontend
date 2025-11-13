import React, { useMemo, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { GET_TASKS } from '../graphql/queries';
import { DELETE_TASK } from '../graphql/mutations';
import { Button, Table, Container, Row, Col, Form, Alert } from 'react-bootstrap';
import TaskItem from './TaskItem';
import LoadingSpinner from './LoadingSpinner';
import Pagination from './Pagination';
import { useTranslations } from '../hooks/useTranslations';
import { useTaskActions } from '../hooks/useTaskActions';
import { useSuccessMessage } from '../hooks/useSuccessMessage';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useApolloCache } from '../hooks/useApolloCache';
import { usePagination } from '../hooks/usePagination';
import styles from './TaskList.module.css';

const TaskList = React.memo(() => {
  const [statusFilter, setStatusFilter] = React.useState('');
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useSuccessMessage();
  const { logError } = useErrorHandler();
  const { removeTaskFromCache } = useApolloCache();
  const { navigateToCreate, navigateToEdit } = useTaskActions();
  const {
    messages,
    navigation,
    table,
    formLabels,
    taskStatus,
    t
  } = useTranslations();

  const {
    currentPage,
    paginationInfo,
    paginationText,
    resetPagination,
    updatePaginationState,
    goToNextPage,
    goToFirstPage,
    getInitialPageVariables,
    getNextPageVariables
  } = usePagination();

  // Get query variables based on current page
  const getQueryVariables = useCallback(() => {
    // For now, only support forward pagination from the beginning
    // This is a limitation of the current GraphQL schema
    if (currentPage === 0) {
      return getInitialPageVariables();
    }

    // For subsequent pages, use the next page cursor
    // This won't work for previous navigation without proper cursor history
    return getNextPageVariables();
  }, [currentPage, getInitialPageVariables, getNextPageVariables]);

  const { data, loading, error } = useQuery(GET_TASKS, {
    variables: getQueryVariables(),
    notifyOnNetworkStatusChange: true,
  });

  const [deleteTask] = useMutation(DELETE_TASK);

  // Check for success message from navigation state
  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      // Clear location state
      window.history.replaceState({}, document.title);
    }
  }, [location.state, setSuccessMessage]);

  // Update pagination state when data changes
  useEffect(() => {
    if (data?.tasks) {
      updatePaginationState(data.tasks.pageInfo, data.tasks.totalCount);
    }
  }, [data, updatePaginationState]);

  // Reset pagination when filter changes
  useEffect(() => {
    resetPagination();
  }, [statusFilter, resetPagination]);

  // Handle filter change
  const handleFilterChange = useCallback((newStatus) => {
    setStatusFilter(newStatus);
  }, []);

  // Extract tasks from edges
  const tasks = useMemo(() => {
    if (!data?.tasks?.edges) return [];
    return data.tasks.edges.map(edge => edge.node);
  }, [data]);

  const handleTaskDelete = async (id) => {
    const shouldDelete = window.confirm(messages.deleteConfirmation());
    if (shouldDelete) {
      try {
        await deleteTask({
          variables: { id },
          update: (cache) => {
            removeTaskFromCache(cache, id);
          }
        });
        setSuccessMessage(messages.taskDeletedSuccess());
      } catch (error) {
        logError('Delete failed', error);
      }
    }
  };

  // Pagination handlers
  const handleNextPage = () => {
    goToNextPage();
  };

  const handlePreviousPage = () => {
    // Reset to first page due to API limitations
    goToFirstPage();
  };

  const handleFirstPage = () => {
    goToFirstPage();
  };

  if (loading) {
    return <LoadingSpinner message={messages.loadingTasks()} />;
  }

  if (error) {
    return (
      <Container className={styles.taskListContainer}>
        <Alert variant="danger">
          {messages.errorLoadingTasks()}: {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className={styles.taskListContainer}>
      <Row className={styles.headerSection}>
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1>{t('navigation.home')}</h1>
            <Button variant="dark" onClick={navigateToCreate}>
              {navigation.createTask()}
            </Button>
          </div>
        </Col>
      </Row>

      {/* Success Message */}
      {successMessage && (
        <Row className="mb-3">
          <Col>
            <Alert variant="success" onClose={() => setSuccessMessage('')} dismissible>
              {successMessage}
            </Alert>
          </Col>
        </Row>
      )}

      <Row className={styles.filterSection}>
        <Col md={4}>
          <Form.Group>
            <Form.Label>{formLabels.status()}</Form.Label>
            <Form.Select
              value={statusFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="">{taskStatus.all()}</option>
              <option value={taskStatus.todo()}>{taskStatus.todo()}</option>
              <option value={taskStatus.inProgress()}>{taskStatus.inProgress()}</option>
              <option value={taskStatus.done()}>{taskStatus.done()}</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col className={styles.tableContainer}>
          {tasks.length === 0 ? (
            <Alert variant="info" className={styles.emptyList}>
              {!statusFilter
                ? messages.noTasks()
                : messages.noFilteredTasks(statusFilter)
              }
            </Alert>
          ) : (
            <>
              <Table striped bordered hover responsive className={styles.table}>
                <thead>
                  <tr>
                    <th>{table.headers.title()}</th>
                    <th>{table.headers.description()}</th>
                    <th>{table.headers.status()}</th>
                    <th className={`text-end ${styles.actionsColumn}`}>{table.headers.actions()}</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onEdit={navigateToEdit}
                      onDelete={handleTaskDelete}
                    />
                  ))}
                </tbody>
              </Table>

              {/* Pagination Component */}
              <Pagination
                currentPage={paginationInfo.currentPage}
                totalPages={paginationInfo.totalPages}
                hasNextPage={data?.tasks?.pageInfo?.hasNextPage || false}
                hasPreviousPage={data?.tasks?.pageInfo?.hasPreviousPage || false}
                paginationText={paginationText}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
                onFirstPage={handleFirstPage}
                loading={loading}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
});

TaskList.displayName = 'TaskList';

export default TaskList;
