import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router'
import styles from './Order.css'
import {OrderQuery} from '../queries'



const CreatedOrder = ({ order }) => {
  return(
    <div>
    <div> {order.id} </div>
    <div> {order.state} </div>
    </div>
  )
};


export default CreatedOrder;