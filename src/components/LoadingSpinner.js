// components/LoadingSpinner.js
import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

const LoadingSpinner = ({ message = 'Loading...', size = 'border' }) => {
  return (
    <Container className="text-center py-5">
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <div className="text-center">
          <Spinner animation={size} role="status">
            <span className="visually-hidden">{message}</span>
          </Spinner>
          <div className="mt-3 text-muted">{message}</div>
        </div>
      </div>
    </Container>
  );
};

export default LoadingSpinner;