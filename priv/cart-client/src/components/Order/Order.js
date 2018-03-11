import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router'
import styles from './Order.css'
import {OrderQuery} from '../queries'
import CreatedOrder from './CreatedOrder'



const OrderComponent = ({ data: {loading, error, order }, history }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  if(order.state == "created")
    return <CreatedOrder order={order} history={history} />
};

const Order = compose(
  withRouter,
  graphql(OrderQuery, {
    options: (props) => ({ 
      variables: { orderId: parseInt(props.match.params.id, 10) } }),
  })
) (OrderComponent);

export default Order;