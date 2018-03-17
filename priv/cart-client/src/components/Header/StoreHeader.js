import React from 'react';
import styles from './Header.css'

import logo from '../../assets/icons/logo2.png'

const StoreHeader = () =>
  (<div className={styles.header}>
    <div className={styles.logo} style={{backgroundImage: 'url(' + logo + ')'}} />
    <div className={styles.title}> 植蔬宝新农人商城 </div>
  </div>)

export default StoreHeader