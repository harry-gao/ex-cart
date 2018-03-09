import React from 'react';
import {Switch, Route} from 'react-router-dom'

import styles from './Header.css'
import OrderAddressHeader from './OrderAddressHeader'
import StoreHeader from './StoreHeader'


const Header= () => {
  return (
    <Switch>
      <Route path='/order/:id/address' component={OrderAddressHeader} />
      <Route component={StoreHeader} />
    </Switch>
  );     
}

export default Header;
