import React, {Component} from 'react';
import styles from './Main.css'
import ProductListWithData from '../ProductList/ProductList'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { Switch, Route } from 'react-router-dom'
import Cart from '../Cart/Cart'
import Me from '../Me/Me'
import Order from '../Order/Order'
import OrderAddress from '../OrderAddress/OrderAddress'
import Address from '../Address/Address'
import EditAddress from '../Address/EditAddress'
import ProductDetail from '../ProductDetail/ProductDetail'

const MainLayout =  ({component: Component, ...rest}) =>{
  return (
    <Route {...rest} render={matchProps => (
      <div className={styles.site}>
        <Header />
        <div className={styles.main}>
          <Component {...matchProps} />
        </div>
        <div className={styles.footer}>
          <Footer/>
        </div>
      </div>
    )}/>
  )
}

const EmptyLayout =  ({component: Component, ...rest}) =>{
  return (
    <Route {...rest} render={matchProps => (
      <div className={styles.site}>
        <Component {...matchProps} />
      </div>
    )}/>
  )
}

const Main = () =>{
  return (
    <div>
      <Switch>
        <MainLayout exact path="/" component={ProductListWithData} />
        <MainLayout path="/cart" component={Cart} />
        <MainLayout path="/me" component={Me} />
        <MainLayout path="/products/:id" component={ProductDetail} />
        <EmptyLayout path="/order/:id/address" component={OrderAddress} />
        <EmptyLayout path="/address/:id/edit" component={EditAddress} />
        <EmptyLayout path="/addresses/new" component={Address} />
        <MainLayout path="/order/:id" component={Order} />
      </Switch>
    </div>
  );
}

export default Main;