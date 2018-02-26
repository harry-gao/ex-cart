import React from 'react';
import {Link} from 'react-router-dom'
import { graphql } from 'react-apollo';
import { CartCountQuery} from '../queries';

import styles from './Footer.css'
import cartIcon from '../../assets/icons/cart.png'
import homeIcon from '../../assets/icons/home.png'
import userIcon from '../../assets/icons/user.png'


const FooterComponent = ({ data: {loading, error, cart }}) => {
  return (
    <div className={styles.footer}>
      <div className={styles.hoe}>
        <Link to='/'><img src={homeIcon} className={styles.icon} alt="home"/> </Link>
      </div>
      <div className={styles.cart}>
        <Link to='/cart'> <img src={cartIcon} className={styles.icon} alt="cart"/> 
          {cart  && cart.count >0 && cart.count}
        </Link>
      </div>
      <div className={styles.me}>
        <Link to='/me'> <img src={userIcon} className={styles.icon} alt="me"/> </Link>
      </div>
    </div>
  );     
}

 const Footer = graphql(CartCountQuery)(FooterComponent);

export default Footer;
