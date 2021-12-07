import React from 'react';
import ReactDOM from 'react-dom';
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink, 
  split
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
import AuthProvider from './contexts/AuthProvider';

const httpLink = new HttpLink({
  uri: 'http://localhost:8090/graphql'
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8090/graphql',
  options: {
    reconnect: true
  }
});

const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  );
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  credentials: 'include'
  
});

ReactDOM.render(
  <React.StrictMode>
   
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </ApolloProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

