import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Badge, Form, Spinner } from 'react-bootstrap';
import { getStatusStyle } from '../utils/statusUtils';
import { useMutation } from '@apollo/client';
import { UPDATE_TASK } from '../graphql/mutations';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { GET_TASKS } from '../graphql/queries';
import styles from './TaskItem.module.css';

const TaskItem = React.memo(({ task, onEdit, onDelete }) => {
  const [editingDescription, setEditingDescription] = useState(false);
  const [description, setDescription] = useState(task.description || '');

  const { logError } = useErrorHandler();

  // Sync local state with task prop changes
  useEffect(() => {
    setDescription(task.description || '');
  }, [task.description]);

  const [updateTask, { loading: updating }] = useMutation(UPDATE_TASK, {
    onError: (error) => {
      logError('Failed to update task', error);
      // Revert changes on error using current task values
      setDescription(task.description || '');
      setEditingDescription(false);
    },
    update: (cache, result) => {
      if (result?.data?.updateTask?.task) {
        // Update the cache with the new task data
        const existingTasks = cache.readQuery({ query: GET_TASKS });
        if (existingTasks?.tasks) {
          cache.writeQuery({
            query: GET_TASKS,
            data: {
              tasks: existingTasks.tasks.map(t =>
                t.id === result.data.updateTask.task.id
                  ? result.data.updateTask.task
                  : t
              )
            }
          });
        }
      }
    }
  });

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  
  const handleDescriptionSubmit = () => {
    if (description.trim() !== (task.description || '').trim()) {
      updateTask({
        variables: {
          input: {
            id: task.id,
            description: description.trim()
          }
        },
        optimisticResponse: {
          updateTask: {
            task: {
              ...task,
              description: description.trim(),
              updatedAt: new Date().toISOString()
            },
            errors: null
          }
        }
      }).then(() => {
        setEditingDescription(false);
      }).catch(() => {
        // Error is handled in the onError callback
      });
    } else {
      setEditingDescription(false);
    }
  };

  
  const handleDescriptionKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleDescriptionSubmit();
    } else if (e.key === 'Escape') {
      setDescription(task.description || '');
      setEditingDescription(false);
    }
  };

  
  const handleDescriptionBlur = () => {
    handleDescriptionSubmit();
  };

  
  return (
    <tr>
      <td className={styles.taskTitle}>{task.title}</td>
      <td
        className={`${styles.editableCell} ${editingDescription ? styles.editing : ''}`}
        title="Click to edit description"
      >
        {editingDescription ? (
          <div className={styles.inlineEditContainer}>
            <Form.Control
              as="textarea"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleDescriptionKeyDown}
              onBlur={handleDescriptionBlur}
              className={styles.inlineTextarea}
              autoFocus
              disabled={updating}
            />
            {updating && (
              <div className={styles.updateSpinner}>
                <Spinner animation="border" size="sm" />
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => setEditingDescription(true)}
            style={{ cursor: 'pointer', padding: '8px' }}
          >
            {task.description ? (
              truncateText(task.description, 80)
            ) : (
              <span className={styles.noDescription}>Click to add description...</span>
            )}
          </div>
        )}
      </td>
      <td className="align-middle">
        <Badge
          style={getStatusStyle(task.status)}
          className={styles.statusBadge}
        >
          {task.status}
        </Badge>
      </td>
      <td className={styles.actionsCell}>
        <div className="btn-group" role="group">
          <Button
            variant="outline-secondary"
            size="sm"
            className={`${styles.actionButton} ${styles.editButton}`}
            onClick={() => onEdit(task.id)}
            title="Edit task"
          >
            ✏️
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            className={`${styles.actionButton} ${styles.deleteButton}`}
            onClick={() => onDelete(task.id)}
            title="Delete task"
          >
            🗑️
          </Button>
        </div>
      </td>
    </tr>
  );
});

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

TaskItem.displayName = 'TaskItem';

export default TaskItem;