import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Alert } from 'react-bootstrap';
import { useTaskActions } from '../hooks/useTaskActions';
import { useErrorHandler } from '../hooks/useErrorHandler';
import { useTranslations } from '../hooks/useTranslations';
import styles from './TaskForm.module.css';

// TaskForm component: A form for creating or editing tasks with title, description, and status fields.
const TaskForm = React.memo(({
  formTitle,
  titleRef,
  descriptionRef,
  statusRef,
  onSubmit,
  submitButtonText,
  loading,
  error,
  successMessage,
  isTitleDisabled = false
}) => {
  const { navigateToHome } = useTaskActions();
  const { getErrorMessage } = useErrorHandler();
  const { formLabels, placeholders, taskStatus, messages } = useTranslations();
// Handle form submission: prevents default and triggers the passed onSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className={styles.formContainer}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className={`card ${styles.formCard}`}>
            <div className={`card-header ${styles.formHeader}`}>
              <h5>{formTitle}</h5>
            </div>
            <div className={`card-body ${styles.formBody}`}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className={styles.formGroup}>
                  <Form.Label htmlFor="task-title" className={styles.formLabel}>
                    {formLabels.title()}
                  </Form.Label>
                  <Form.Control
                    id="task-title"
                    type="text"
                    ref={titleRef}
                    required
                    placeholder={placeholders.title()}
                    size="sm"
                    disabled={isTitleDisabled}
                    readOnly={isTitleDisabled}
                    style={isTitleDisabled ? {
                    backgroundColor: '#e9ecef',
                    cursor: 'not-allowed',
                    opacity: 0.8,
                    border: '1px solid #ced4da'
                  } : {}}
                  />
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label htmlFor="task-description" className={styles.formLabel}>
                    {formLabels.description()}
                  </Form.Label>
                  <Form.Control
                    id="task-description"
                    as="textarea"
                    rows={2}
                    ref={descriptionRef}
                    required
                    placeholder={placeholders.description()}
                    size="sm"
                    className={styles.textareaControl}
                  />
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                  <Form.Label htmlFor="task-status" className={styles.formLabel}>
                    {formLabels.status()}
                  </Form.Label>
                  <Form.Select
                    id="task-status"
                    ref={statusRef}
                    size="sm"
                  >
                    <option value={taskStatus.todo()}>{taskStatus.todo()}</option>
                    <option value={taskStatus.inProgress()}>{taskStatus.inProgress()}</option>
                    <option value={taskStatus.done()}>{taskStatus.done()}</option>
                  </Form.Select>
                </Form.Group>

                <div className={styles.buttonGroup}>
                  <Button
                    variant="dark"
                    type="submit"
                    disabled={loading}
                    className={styles.submitButton}
                    size="sm"
                  >
                    {loading ? (
                      <>
                        <span className={`spinner-border spinner-border-sm me-2 ${styles.loadingSpinner}`} role="status" aria-hidden="true"></span>
                        {messages.processing()}
                      </>
                    ) : (
                      submitButtonText
                    )}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={navigateToHome}
                    size="sm"
                  >
                    {formLabels.cancel()}
                  </Button>
                </div>

                {error && (
                  <Alert variant="danger" className={styles.alertCompact}>
                    <span className={styles.alertText}>{getErrorMessage(error)}</span>
                  </Alert>
                )}

                {successMessage && (
                  <Alert variant="success" className={styles.alertCompact}>
                    <span className={styles.alertText}>{successMessage}</span>
                  </Alert>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
// Prop validation and default values

TaskForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  titleRef: PropTypes.object.isRequired,
  descriptionRef: PropTypes.object.isRequired,
  statusRef: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  successMessage: PropTypes.string,
  isTitleDisabled: PropTypes.bool,
};

TaskForm.defaultProps = {
  loading: false,
  error: null,
  successMessage: null,
};

TaskForm.displayName = 'TaskForm';

export default TaskForm;