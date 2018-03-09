import React from 'react';
import styles from './Order.css'

const OrderItem = ( {item} ) =>{
  return <div className={styles.item}>    
    <div className={styles.image}>
      <img src={item.image} className={styles.itemImage} alt=""></img>
    </div>
    <div className={styles.content}>
      <div className='ma2 courier'>{item.name}</div>
    </div>

    <div className={styles.itemPrice}>
      <div> ￥{item.price} </div>
      <br/>
      <div> x {item.quantity} </div>
    </div>
      
  </div>
}

export default OrderItem;