import React from 'react';
import styles from './Cart.css'
import { Checkbox } from 'react-bootstrap';

const CartItem = ( {item, quantityChanged, checkChanged} ) =>{
  return <div className={styles.item}>
    <div className={styles.checkbox} onClick={(e)=>checkChanged(item.id, e)}>
      <div className={styles.round}>
        <input type="checkbox" 
          id={'checkbox_' + item.id}
          checked={item.selected}/>
        <label htmlFor={'checkbox_' + item.id}></label>
      </div>
    </div>
    <div className={styles.image}>
      <img src={item.image} className={styles.itemImage} alt=""></img>
    </div>
    <div className={styles.content}>
      <div className='pa2 courier f6'>{item.name}</div>
      <div>
        <div className="fl w-50 red pt2">￥{item.price}</div>
        <div className="fl w-50">
          <div className='cf dib'>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.adjustor}>
      <div className={styles.adjustorbtn}
        onClick={() => {quantityChanged(item.id, item.quantity + 1)}}>+</div>
      <div className={styles.adjustortext}>
        <span>{item.quantity}</span>
      </div>
      <div className={styles.adjustorbtn}
        onClick={() => {quantityChanged(item.id, item.quantity - 1)}}>-</div>
    </div>
  </div>
}

export default CartItem;