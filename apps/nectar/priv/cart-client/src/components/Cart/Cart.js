import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styles from './Cart.css'

import CartWithData from './CartWithData'



const EmptyCart = () => {
  return <div> 购物车还没有东西哦 </div>
};


const CartContent = ({ data: {loading, error, cart }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if(cart.items.size === 0)
    return <EmptyCart/>
  else

  return <CartWithData items={cart.items}/>
};



const Cart = () => {
  const cartQuery = gql`
  query CartQuery{
    cart{
      items{
        id
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

export default Cart;