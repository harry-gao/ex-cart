import React from 'react';
import { graphql } from 'react-apollo';
import styles from './Cart.css'
import {CartQuery} from '../queries'
import CartWithData from './CartWithData'
import Loading from '../Loading/Loading';



const CartContent = ({ data: {loading, error, cart }}) => {
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return <CartWithData items={cart.items}/>
};

const Cart = graphql(CartQuery)(CartContent);

export default Cart;