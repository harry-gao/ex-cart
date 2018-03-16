import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router'
import styles from './Order.css'
import {OrderQuery, UpdateOrderMutation} from '../queries'
import CreatedOrder from './CreatedOrder'
import PayOrder from './PayOrder'



const OrderComponent = ({ data: {loading, error, order }, history, updateOrder }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  if(order.state === "created")
    return <CreatedOrder order={order} history={history} updateOrder={updateOrder} />
  if(order.state === "confirmed")
    return <PayOrder order={order} history={history} updateOrder={updateOrder} />
};

const updateOrderMutation = graphql(UpdateOrderMutation, {
  props: ({ ownProps, mutate }) => ({
    updateOrder: (order) => mutate({ variables: { order } }),
  }),
})

const orderQuery = graphql(OrderQuery, {
  options: (props) => ({ 
    variables: { orderId: parseInt(props.match.params.id, 10) } }),
})

const Order = compose(
  withRouter,
  orderQuery,
  updateOrderMutation,
) (OrderComponent);

export default Order;