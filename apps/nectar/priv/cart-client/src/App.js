import React, { Component } from 'react';
import logo from './logo.svg';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Main from './components/Main/Main'


const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URL || "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
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
