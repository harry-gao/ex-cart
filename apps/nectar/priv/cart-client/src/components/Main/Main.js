import React, { Component } from 'react';
import styles from './Main.css'
import ProductListWithData from '../ProductList/ProductList'
import Footer from '../Footer/Footer'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import ProductDetail from '../ProductDetail/ProductDetail'
import Cart from '../Cart/Cart'
import Me from '../Me/Me'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const Main = () =>{
  return (
    <div className={styles.site}>
      <div className={styles.header}>
      </div>
      <div className={styles.main}>
      <Switch> 
        <Route exact path="/" render={(props) => ( <ProductListWithData {...props} /> )}  />
        <Route path="/cart" component={Cart} />
        <Route path="/me" component={Me} />
      </Switch>
      </div>
      <div className={styles.footer}>
        <Footer/>
      </div>
    </div>
  );
}

export default Main;