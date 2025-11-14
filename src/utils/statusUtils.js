import { STATUS_VARIANTS, getEnumStatus } from '../constants/statusConstants';

/**
 * Get styling object for status badges
 * @param {string} status - The task status (display or enum format)
 * @returns {Object} - Style object for the status badge
 */
export const getStatusStyle = (status) => {
  const variant = STATUS_VARIANTS[status] || 'secondary';

  // Bootstrap color mapping for badges
  const colorMap = {
    primary: '#0d6efd',
    secondary: '#6c757d',
    success: '#198754',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#0dcaf0',
    light: '#f8f9fa',
    dark: '#212529'
  };

  const color = colorMap[variant] || colorMap.secondary;

  return {
    backgroundColor: color,
    color: '#ffffff', // White text for better contrast
    border: 'none',
    fontSize: '0.8rem',
    fontWeight: '600',
    padding: '0.375rem 0.625rem',
    borderRadius: '0.375rem',
    textTransform: 'uppercase',
    letterSpacing: '0.025em',
    minWidth: '85px',
    textAlign: 'center',
    whiteSpace: 'nowrap'
  };
};

/**
 * Map status string to enum value for GraphQL
 * @param {string} status - The status string from UI (display format)
 * @returns {string} - The enum value for GraphQL
 */
export const mapStatusToEnum = (status) => {
  return getEnumStatus(status);
};