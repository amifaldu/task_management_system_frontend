import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:30001/graphql', // adjust to your backend
  cache: new InMemoryCache(),
});

export default client;