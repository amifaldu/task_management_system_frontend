// ErrorBoundary.js
import React from 'react';
import { Alert, Button, Container } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // State to track error status, the error itself, and additional info
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // Lifecycle method to update state when an error is thrown
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Catching the error and storing error details
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', {
      error: error.toString(),
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString()
    });
  }

  // Retry button handler to reset error state
  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // If an error occurs, show an alert with error details and a retry button
      return (
        <Container className="mt-4">
          <Alert variant="danger">
            <Alert.Heading>Oops! Something went wrong</Alert.Heading>
            <p>
              We're sorry, but something unexpected happened. Please try again or contact support if the problem persists.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-3">
                <summary>Error Details</summary>
                <pre className="mt-2 p-3 bg-light">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <div className="mt-3">
              <Button variant="primary" onClick={this.handleRetry}>
                Try Again
              </Button>
            </div>
          </Alert>
        </Container>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;