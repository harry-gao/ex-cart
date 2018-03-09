import React from 'react';
import styles from './Header.css'

const OrderAddressHeader = ({ history }) =>
  (<div className={styles.header} onClick={() => history.goBack()}>
    返回订单
  </div>)

export default OrderAddressHeader