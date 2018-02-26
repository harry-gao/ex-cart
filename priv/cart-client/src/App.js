import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

import { BrowserRouter } from 'react-router-dom'

import Main from './components/Main/Main'

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer: ${token}` : "",
    }
  }
});

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URL || "http://localhost:4000/q/graphql" });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    dataIdFromObject: object => {
      switch (object.__typename) {
        case 'Cart': return 'Cart'; // use `key` as the primary key
        default: return defaultDataIdFromObject(object); // fall back to default handling
      }
    }
  }),
});



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Main/>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
