import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
// import { useTranslations } from '../hooks/useTranslations'; // Not used in this component
import styles from './Pagination.module.css';

const Pagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  paginationText,
  onNextPage,
  onPreviousPage,
  onFirstPage,
  loading = false
}) => {
  
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Row className={`${styles.paginationContainer} mt-4`}>
      <Col className="d-flex justify-content-between align-items-center">
        <div className={styles.paginationInfo}>
          <span className="text-muted">{paginationText}</span>
        </div>

        <div className={`${styles.paginationControls} d-flex align-items-center gap-2`}>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onFirstPage}
            disabled={currentPage === 1 || loading}
            title="First page"
          >
            &laquo; First
          </Button>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onPreviousPage}
            disabled={!hasPreviousPage || loading}
            title="Previous page"
          >
            &lsaquo; Previous
          </Button>

          <div className={styles.pageIndicator}>
            <span className="fw-bold">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onNextPage}
            disabled={!hasNextPage || loading}
            title="Next page"
          >
            Next &rsaquo;
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default React.memo(Pagination);