import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useTranslations } from '../hooks/useTranslations';
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
  const { t } = useTranslations();

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
            title={t('pagination.first')}
          >
            &laquo; {t('pagination.first')}
          </Button>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onPreviousPage}
            disabled={!hasPreviousPage || loading}
            title={t('pagination.previous')}
          >
            &lsaquo; {t('pagination.previous')}
          </Button>

          <div className={styles.pageIndicator}>
            <span className="fw-bold">
              {t('pagination.page', { current: currentPage, total: totalPages })}
            </span>
          </div>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onNextPage}
            disabled={!hasNextPage || loading}
            title={t('pagination.next')}
          >
            {t('pagination.next')} &rsaquo;
          </Button>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => {/* Last page functionality would need cursor implementation */}}
            disabled={!hasNextPage || loading}
            title={t('pagination.last')}
          >
            {t('pagination.last')} &raquo;
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default React.memo(Pagination);