import React from 'react';
import { Form } from 'react-bootstrap';
import { TASK_STATUS } from '../constants/statusConstants';
import PropTypes from 'prop-types';

/**
 * Reusable status selector component
 * @param {Object} props - Component props
 * @param {string} props.value - Current selected status
 * @param {Function} props.onChange - Change handler
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether the select is disabled
 * @param {Object} props.props - Additional props to pass to Form.Select
 */
const StatusSelector = React.memo(({
  value,
  onChange,
  className = '',
  disabled = false,
  ...props
}) => {
  return (
    <Form.Select
      value={value}
      onChange={onChange}
      className={className}
      disabled={disabled}
      {...props}
    >
      {Object.values(TASK_STATUS).map(status => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </Form.Select>
  );
});

StatusSelector.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

StatusSelector.displayName = 'StatusSelector';

export default StatusSelector;