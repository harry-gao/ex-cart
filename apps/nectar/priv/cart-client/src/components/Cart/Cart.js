import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styles from './Cart.css'
import { getCart } from '../../helpers/CartHelper'

const CartItem = ( {item: item}) =>{
  return <div className={styles.item}>
    <div className='fl w-20'>
    <img src={item.image} className={styles.itemImage}></img>
    </div>
    <div className='fl w-80'>
      <div className='pa2 courier f6'>{item.name}</div>
      <div>
        <div className="fl w-50 red pt2">￥{item.price}</div>
        <div className="fl w-50">
          <div className='cf dib'>
            <span className="f6 fl bb bt bl ph3 pv2 dib bg-washed-blue b br2 br--left bl">-</span>
            <span className="f6 fl ba ph3 pv2 dib black">{item.quantity}</span>
            <span className="f6 fl bb bt ph3 pv2 dib bg-washed-blue br2 br--right br">+</span>
          </div>
        </div>
      </div>
    </div>
  </div>
}

const CartContent = ({ data: {loading, error, cart }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <div className={styles.cart}>
    <div className={styles.main}>
      { cart.items.map( item => < CartItem item={item} key={item.variantId}/> ) }
    </div>
    <div className={styles.footer + ' b--black-50 bt'}>
      { cart.totalAmount }
    </div>
    
  </div>;
};

const EmptyCart = () => {
  return <div> 购物车还没有东西哦 </div>
};

const CartWithData = ({cartObj: cartObj}) => {
  const cartQuery = gql`
  query CartQuery{
    cart{
      items{
        name
        price
        quantity
        variantId
        image
      }
    }
  }
  `;
  const Comp = graphql(cartQuery)(CartContent);
  return <Comp />
}

const Cart = () =>{
  const cartObj = getCart();
  if(cartObj == null)
    return <EmptyCart/>
  else
    return <CartWithData cartObj={cartObj}/>
}


export default Cart;