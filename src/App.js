import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client';
import { routes } from './routes';
import ErrorBoundary from './components/ErrorBoundary';
import './i18n/config'; // Initialize i18n
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter(routes);

function App() {
  return (
    <ApolloProvider client={client}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ApolloProvider>
  );
}

export default App;