import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Home from './components/Home/Home'
import ProductDetail from './components/ProductDetail/ProductDetail'

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URL || "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
});



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/products/:id" component={ProductDetail} />
          </Switch>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

export default App;
