import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import App from './components/App';

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache()
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
