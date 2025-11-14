import React from 'react';
import PropTypes from 'prop-types';
import { Button, Badge } from 'react-bootstrap';
import { getStatusStyle } from '../utils/statusUtils';
import styles from './TaskItem.module.css';

const TaskItem = React.memo(({ task, onEdit, onDelete }) => {

return (
    <tr>
      <td className={styles.taskTitle}>{task.title}</td>
      <td className={styles.taskDescription}>{task.description}</td>
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