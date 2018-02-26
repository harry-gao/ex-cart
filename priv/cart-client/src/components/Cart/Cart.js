import React from 'react';
import { graphql } from 'react-apollo';
import styles from './Cart.css'
import {CartQuery} from '../queries'
import CartWithData from './CartWithData'



const CartContent = ({ data: {loading, error, cart }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return <CartWithData items={cart.items}/>
};

const Cart = graphql(CartQuery)(CartContent);

export default Cart;