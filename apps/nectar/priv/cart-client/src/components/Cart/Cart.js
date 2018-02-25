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

  return <CartWithData items={cart.items}/>
};


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

const Cart = graphql(cartQuery)(CartContent);

export default Cart;