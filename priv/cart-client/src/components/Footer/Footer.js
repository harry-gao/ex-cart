import React from 'react';
import {withRouter, Link} from 'react-router-dom'
import { graphql, compose} from 'react-apollo';
import { CartCountQuery} from '../queries';

import styles from './Footer.css'
import cartIcon from '../../assets/icons/cart.png'
import homeIcon from '../../assets/icons/home.png'
import userIcon from '../../assets/icons/user.png'


const FooterComponent = ({ data: {loading, error, cart }, history}) => {
  let cartCount = null
  if(cart && cart.count > 0)
    cartCount = <div className={styles.badge}>{cart.count} </div>
  return (
    <div className={styles.footer}>
      <div className={styles.hoe} onClick={()=>history.push('/')}>
        <Link to='/'><img src={homeIcon} className={styles.icon} alt="home"/> </Link>
      </div>
      <div className={styles.cart} onClick={()=>history.push('/cart')}>
        <Link to='/cart'> <img src={cartIcon} className={styles.icon} alt="cart"/> </Link>
        {cartCount}
      </div>
      <div className={styles.me}  onClick={()=>history.push('/me')}>
        <Link to='/me'> <img src={userIcon} className={styles.icon} alt="me"/> </Link>
      </div>
    </div>
  );     
}

 const Footer = compose(graphql(CartCountQuery), withRouter)(FooterComponent);

export default Footer;
