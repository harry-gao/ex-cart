import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router'
import styles from './OrderAddress.css'
import {AddressesQuery} from '../queries'
import {Link} from 'react-router-dom'

import editIcon from '../../assets/icons/edit.svg'

import NewAddress from '../Address/NewAddress'

const AddressOption = (props) => {
  const {address, selected, onSelect} = props

  return <div className={styles.address}>
        <div className={styles.checkbox}>
            <div className={styles.round}>
              <input type="checkbox" id={'checkbox_' + address.id} 
                defaultChecked={selected}
                onChange={ e => onSelect(e, address.id)} />
              <label htmlFor={'checkbox_' + address.id}></label>
            </div>
          </div>
          <div className={styles.addressDetail}>
            <div> {address.name}  <span className={styles.phone}> {address.phone} </span> </div>
            <div className={styles.addressLine}>地址: {props.address.address_line_1} </div>
          </div>
          <div className={styles.editBtn}>
            <Link to='/me'> <img src={editIcon} className={styles.icon} alt="edit"/> </Link>
          </div>
        </div>
}

class OrderAddressWithData extends Component {
  constructor(props){
    super(props)
    this.state={
      selected: null
    }

    this.onSelect = this.onSelect.bind(this)
  }

  onSelect(e, id){
    if(e.currentTarget.checked)
      this.setState({selected: id})
    else
      this.setState({selected: null})
  }

  render(){
    const {addresses} = this.props
    let nodes = addresses.map( a => (<AddressOption key={a.id} address={a} selected={a.id == this.state.selected} onSelect={this.onSelect} />))
    const actionName="确定"
    return (
      <div className={styles.main}>
        <div className={styles.addresses}>
          {nodes} 
        </div>
        <div className={styles.actions}>
          <div className={styles.addNew}>  <Link to='/addresses/new'> 添加新地址 </Link> </div>
          <div className={styles.actionable}>
            {actionName}
          </div> 
        </div>
      </div>)
  }
}

const OrderAddressComp = ({ data: {loading, error, addresses }}, match) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  if(addresses.length === 0)
    this.props.history.go("/addresses/new")

  return <OrderAddressWithData addresses={addresses}/>
};

const OrderAddress = graphql(AddressesQuery)(OrderAddressComp);

export default OrderAddress;