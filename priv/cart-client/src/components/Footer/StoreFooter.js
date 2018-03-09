import React from 'react';
import {Switch, Route} from 'react-router-dom'

import styles from './Footer.css'
import OrderAddressHeader from './OrderAddressHeader'
import StoreFooter from './StoreFooter'


const Footer= () => {
  return (
    <Switch>
      <Route path='/order/:id/address' component={OrderAddressHeader} />
      <Route component={StoreFooter} />
    </Switch>
  );     
}

export default Footer;
