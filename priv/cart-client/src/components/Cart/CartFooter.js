import React from 'react';
import styles from './Cart.css'

const CartFooter = ({items}) =>{
  const total = items.reduce( (sum, item) => item.selected ? sum + item.quantity * item.price : sum, 0);
  const submitClass = items.some( item => item.selected) ? styles.submit : styles.submit + ' ' + styles.disabled
  return(
    <div className={styles.footer}>
      <div className={styles.total}>总价: <span className='red'> ￥{total} </span></div>
      <div className={submitClass}>
        <div className={styles.active}>去结算</div>
      </div>
    </div>
  )
}

export default CartFooter;