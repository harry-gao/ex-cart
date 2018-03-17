import React from 'react';
import styles from './Cart.css'
import cartIcon from '../../assets/icons/cart.png'

const EmptyCart = ( ) =>
  <div className={styles.emptyCart}>
    <img src={cartIcon} alt=''/>
    <p> 购物车还没有东西哦 </p>
  </div>

export default EmptyCart;