import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router'
import styles from './Order.css'
import {OrdersQuery} from '../queries'
import Loading from '../Loading/Loading';

const OrderSummary = ({order}) =>{
  return <div> {order.id} </div>
}

const OrderList = ({ data: {loading, error, orders }, history }) => {
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  let nodes = orders.map( o => <OrderSummary order={o} key={o.id} />
  )
  return (
    <div>
      {nodes}
    </div>
  )
};

const ordersQuery = graphql(OrdersQuery, {
  options: (props) => ({ 
    variables: { state: props.match.params.state} }),
})

const OrderListHOC = compose(
  withRouter,
  ordersQuery,
) (OrderList);

export default OrderListHOC;