import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router'
import styles from './Order.css'
import {AddressesQuery} from '../queries'

import NewAddress from '../Address/NewAddress'

const OrderAddressWithData = ({addresses}) => {
  let nodes = addresses.map( a => (<div key={a.id}> {a.address_line_1 }</div>))
  return <div> {nodes} </div>
} 

const OrderAddressComp = ({ data: {loading, error, addresses }}, match) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  if(addresses.length === 0)
    return <NewAddress return={`/order/#{match.params.id}/address`}/>

  return <OrderAddressWithData addresses={addresses}/>
};

const OrderAddress = graphql(AddressesQuery)(OrderAddressComp);

export default OrderAddress;