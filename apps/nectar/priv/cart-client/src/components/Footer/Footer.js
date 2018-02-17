import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import styles from './Footer.css'
import cartIcon from '../../assets/icons/cart.png'
import homeIcon from '../../assets/icons/home.png'
import userIcon from '../../assets/icons/user.png'



const Footer = ({cartCount: cartCount}) => {
  return (
    <div className={styles.footer}>
      <div className={styles.hoe}>
        <Link to='/'><img src={homeIcon} className={styles.icon}/> </Link>
      </div>
      <div className={styles.cart}>
        <Link to='/cart'> <img src={cartIcon} className={styles.icon}/> {cartCount}  </Link>
      </div>
      <div className={styles.me}>
        <Link to='/me'> <img src={userIcon} className={styles.icon}/> </Link>
      </div>
    </div>
  );
      
}

export default Footer;
