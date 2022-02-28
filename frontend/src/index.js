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
// import { ThemeProvider } from 'styled-components';

const httpLink = new HttpLink({
  uri: 'http://10.0.0.78:8090/graphql',
  credentials: 'include'
});

const wsLink = new WebSocketLink({
  uri: 'ws://10.0.0.78:8090/graphql',
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
  
});


ReactDOM.render(
  <React.StrictMode>
   
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider client={client}>
          <App />
        </AuthProvider>
      </Router>
    </ApolloProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

