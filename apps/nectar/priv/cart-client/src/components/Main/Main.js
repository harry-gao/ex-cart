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


class MainComponent extends Component {
  constructor(props){
    super(props);
    //this.state = { cartCount: props.data.cart.count }
  }

  render() {
    if(this.props.data.loading)
      return <p> loading </p>
    if(this.props.data.error)
      return <p> {this.props.data.error} </p>
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
          <Footer cartCount={this.props.data.cart.count}/>
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

const CartCountQuery = gql`
   query CartCountQuery {
    cart{
      count
    }
   }
 `;
 const Main = graphql(CartCountQuery)(MainComponent);


export default Main;