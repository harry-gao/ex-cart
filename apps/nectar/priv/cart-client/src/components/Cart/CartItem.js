import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import styles from './Cart.css'

const CartItem = ( {item, quantityChanged} ) =>{
  return <div className={styles.item}>
    <div className='fl w-20'>
    <img src={item.image} className={styles.itemImage} alt=""></img>
    </div>
    <div className='fl w-80'>
      <div className='pa2 courier f6'>{item.name}</div>
      <div>
        <div className="fl w-50 red pt2">￥{item.price}</div>
        <div className="fl w-50">
          <div className='cf dib'>
            <span className="f6 fl bb bt bl ph3 pv2 dib bg-washed-blue b br2 br--left bl"
              onClick={() => {quantityChanged(item.id, item.quantity - 1)}}>-</span>
            <span className="f6 fl ba ph3 pv2 dib black">{item.quantity}</span>
            <span className="f6 fl bb bt ph3 pv2 dib bg-washed-blue br2 br--right br"
              onClick={() => {quantityChanged(item.id, item.quantity + 1)}}>+</span>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default CartItem;