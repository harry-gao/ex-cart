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


class Main extends Component {
  constructor(props){
    super(props);
    this.state = { cartCount: 1 }
  }

  render() {
    return (
      <div className={styles.site}>
        <div className={styles.header}>
        </div>
        <div className={styles.main}>
        <Switch> 
          <Route exact path="/" render={(props) => ( <ProductListWithData {...props} cartAdded={this.cartUpdated.bind(this)}/> )}  />
          <Route path="/cart" component={Cart} />
          <Route path="/me" component={Me} />
        </Switch>
        </div>
        <div className={styles.footer}>
          <Footer cartCount={this.state.cartCount}/>
        </div>
      </div>
    );
  }

  // getCartCount(){
  //   const cartObj = getCart() || {};
  //   return Object.values(cartObj).reduce((a, b) => a + b, 0)
  // }

  cartUpdated() {
    this.setState( {cartCount: this.getCartCount()} )
  }
}



export default Main;