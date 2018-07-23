import React from 'react';
import styles from './Header.css'

import logo from '../../assets/icons/logo.png'

const StoreHeader = () =>
  (<div className={styles.storeHeader}>
    <div className={styles.logo} style={{backgroundImage: 'url(' + logo + ')'}} />
    <div className={styles.title}> 澳新商城 </div>
  </div>)

export default StoreHeader