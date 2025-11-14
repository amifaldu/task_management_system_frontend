import React, { useMemo, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { GET_TASKS } from '../graphql/queries';
import { DELETE_TASK } from '../graphql/mutations';
import { Button, Table, Container, Row, Col, Alert, Form } from 'react-bootstrap';
import TaskItem from './TaskItem';
import LoadingSpinner from './LoadingSpinner';
import Pagination from './Pagination';
import { useTranslations } from '../hooks/useTranslations';
import { useTaskActions } from '../hooks/useTaskActions';
import { useSuccessMessage } from '../hooks/useSuccessMessage';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useApolloCache } from '../hooks/useApolloCache';
import { usePagination } from '../hooks/usePagination';
import { STATUS_OPTIONS } from '../constants/statusConstants';
import { mapStatusToEnum } from '../utils/statusUtils';
import styles from './TaskList.module.css';


const TaskList = React.memo(() => {
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useSuccessMessage();
  const { logError } = useErrorHandler();
  const { removeTaskFromCache } = useApolloCache();
  const { navigateToCreate, navigateToEdit } = useTaskActions();
  const {
    messages,
    navigation,
    table,
    t
  } = useTranslations();
  const [statusFilter, setStatusFilter] = useState('All');

  const {
    paginationInfo,
    paginationText,
    updatePaginationState,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    getQueryVariables
  } = usePagination();

  const queryVariables = useMemo(() => ({
    ...getQueryVariables(),
    ...(statusFilter !== 'All' && { status: mapStatusToEnum(statusFilter) })
  }), [getQueryVariables, statusFilter]);

  const { data, loading, error, refetch } = useQuery(GET_TASKS, {
    variables: queryVariables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const [deleteTask] = useMutation(DELETE_TASK);

  // Check for success message from navigation state
  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      // Refetch tasks if requested
      if (location.state?.refetchTasks) {
        refetch();
      }
      // Clear location state
      window.history.replaceState({}, document.title);
    }
  }, [location.state, setSuccessMessage, refetch]);

  // Update pagination state when data changes
  useEffect(() => {
    if (data?.tasks) {
      updatePaginationState(data.tasks.pageInfo, data.tasks.totalCount);
    }
  }, [data, updatePaginationState]);

  
  
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
        // Refetch data to ensure UI is updated properly
        await refetch();
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
    goToPreviousPage();
  };

  const handleFirstPage = () => {
    goToFirstPage();
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    // Reset pagination to first page when filter changes
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

      {/* Status Filter */}
      <Row className={styles.filterSection}>
        <Col md={4}>
          <Form.Group>
            <Form.Label>{table.headers.status()}</Form.Label>
            <Form.Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      
      <Row>
        <Col className={styles.tableContainer}>
          {tasks.length === 0 ? (
            <Alert variant="info" className={styles.emptyList}>
              {statusFilter === 'All'
                ? messages.noTasks()
                : messages.noFilteredTasks(statusFilter)}
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
