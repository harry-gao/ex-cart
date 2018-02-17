import React from 'react';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const cartQuery = gql `
  query cartQuery($cartItems: [CartItem]!) {
    cart(items: $cartItems) {
      items {
        name
        unit_price
        number
      }
      total_amount
    }
  }
`;
const Cart = () => {
  return  <div className="site">
            this is cart
          </div>  ;
};

export default Cart;