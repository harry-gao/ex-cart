import React from 'react';
import {Switch, Route} from 'react-router-dom'

import styles from './Header.css'
import OrderAddressHeader from './OrderAddressHeader'
import StoreHeader from './StoreHeader'
import classnames from 'classnames/bind'
import backIcon from '../../assets/icons/back.svg'


const cx = classnames.bind(styles)

const titles = {
  '/cart': '我的购物车',
  '/me': '我的账户',
  '/order/:id': '订单详情',
  '/order/:id/address': '指定订单地址',
  '/address/:id/edit': '编辑地址',
  '/addresses/new': '添加地址'
}
const HeaderWithTitle = ({match}) =>{
  return <div className={styles.storeHeader}>
    <div className={cx('title', 'center')}>{titles[match.path]} </div>
   </div>
}

const HeaderWithTitleAndReturn = ({match, history}) =>{
  return(
  <div className={styles.storeHeader}>
    <div className={cx('return')} onClick={()=> history.goBack()}>
      <img src={backIcon} alt=''/>
    </div>
    <div className={cx('title', 'center')}>{titles[match.path]} </div>
  </div>
  )

}

const Header= () => {
  return (
    <Switch>
      <Route path="/cart" component={HeaderWithTitle} />
      <Route path='/me' component={HeaderWithTitle} />
      <Route path='/addresses/new' component={HeaderWithTitleAndReturn} />
      <Route path='/order/:id/address' component={HeaderWithTitleAndReturn} />
      <Route path='/address/:id/edit' component={HeaderWithTitleAndReturn} />
      <Route path='/order/:id' component={HeaderWithTitle} />
      <Route component={StoreHeader} />
    </Switch>
  );     
}

export default Header;
