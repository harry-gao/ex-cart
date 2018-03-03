import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router'
import styles from './Order.css'
import {OrderQuery} from '../queries'
import CreatedOrder from './CreatedOrder'



const OrderComponent = ({ data: {loading, error, order } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  if(order.state == "created")
    return <CreatedOrder order={order} />
};

const Order = compose(
  withRouter,
  graphql(OrderQuery, {
    options: (props) => ({ 
      variables: { orderId: parseInt(props.match.params.id) } }),
  })
) (OrderComponent);

export default Order;