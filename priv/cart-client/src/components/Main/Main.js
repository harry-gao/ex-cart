import React from 'react';
import styles from './Main.css'
import ProductListWithData from '../ProductList/ProductList'
import Footer from '../Footer/Footer'
import { Switch, Route } from 'react-router-dom'
import Cart from '../Cart/Cart'
import Me from '../Me/Me'
import Order from '../Order/Order'

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
        <Route path="/order/:id" component={Order} />
      </Switch>
      </div>
      <div className={styles.footer}>
        <Footer/>
      </div>
    </div>
  );
}

export default Main;