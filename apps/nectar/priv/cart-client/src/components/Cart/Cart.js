import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import styles from './Cart.css'
import { getCart } from '../../helpers/CartHelper'

const CartContent = ({ data: {loading, error, cart }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <div className={styles.list}>
    { cart.totalAmount }
  </div>;
};

const EmptyCart = () => {
  return <div> 购物车还没有东西哦 </div>
};

const CartWithData = ({cartObj: cartObj}) => {
  const cartQuery = gql`
  query CartQuery($input: [CartInput]!){
    cart(input: $input){
      items{
        name
        unitPrice
        count
        variantId
      }
      totalAmount
    }
  }
  `;

  const cartInput = Object.entries(cartObj).map(entry => ({variantId: parseInt(entry[0]), count: entry[1]}))

  const Comp = graphql(cartQuery, {
      options: { variables: { input: cartInput } },
    })(CartContent);
  return <Comp />
}

const Cart = () =>{
  const cartObj = getCart();
  if(cartObj == null)
    return <EmptyCart/>
  else
    return <CartWithData cartObj={cartObj}/>
}




// const cartQuery = gql`
//   query CartQuery($input: [CartInput]!){
//     cart(input: $input){
//       items{
//         name
//         unitPrice
//         count
//         variantId
//       }
//       totalAmount
//     }
//   }
// `;

// const cartObj = getCart();
// const cartInput = Object.entries(cartObj).map(entry => ({variantId: parseInt(entry[0]), count: entry[1]}))

// const CartWithData = 


export default Cart;