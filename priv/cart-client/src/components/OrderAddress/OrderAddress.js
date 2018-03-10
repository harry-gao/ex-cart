import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router'
import styles from './OrderAddress.css'
import {AddressesQuery} from '../queries'
import {Link} from 'react-router-dom'

import editIcon from '../../assets/icons/edit.svg'

const AddressOption = (props) => {
  const {address, selected, onSelect} = props

  return <div className={styles.address}>
        <div className={styles.checkbox} onClick={(e)=>onSelect(address.id, e)}>
            <div className={styles.round}>
              <input type="checkbox" 
                id={'checkbox_' + address.id}
                checked={selected}/>
              <label htmlFor={'checkbox_' + address.id}></label>
            </div>
          </div>
          <div className={styles.addressDetail}>
            <div> {address.name}  <span className={styles.phone}> {address.phone} </span> </div>
            <div className={styles.addressLine}>地址: {props.address.address_line_1} </div>
          </div>
          <div className={styles.editBtn}>
            <Link to='/address/:id/edit'> <img src={editIcon} className={styles.icon} alt="edit"/> </Link>
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
    this.onConfirm = this.onConfirm.bind(this)
  }

  onSelect(id, e){
    e.preventDefault();
    if(this.state.selected === id){
      this.setState({selected: null})
    } else{
      this.setState({selected: id})
    }  
  }

  onConfirm(){
    if(this.state.selected == null)
      return
    
  }

  render(){
    const {addresses} = this.props
    let nodes = addresses.map( a => (<AddressOption key={a.id} address={a} selected={a.id === this.state.selected} onSelect={this.onSelect} />))
    const actionName= this.state.selected == null ? "请选择" : "确定"
    const actionClass = this.state.selected == null ? styles.disabled : styles.enabled
    return (
      <div className={styles.main}>
        <div className={styles.addresses}>
          {nodes} 
        </div>
        <div className={styles.actions}>
          <div className={styles.addNew}>  <Link to='/addresses/new'> 添加新地址 </Link> </div>
          <div className={actionClass} onClick={this.onConfirm}>
            {actionName}
          </div> 
        </div>
      </div>)
  }
}

const OrderAddressComp = ({ data: {loading, error, addresses }, history}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  if(addresses.length === 0)
    history.push("/addresses/new")

  return <OrderAddressWithData addresses={addresses}/>
};

const OrderAddress = compose(
  graphql(AddressesQuery),
  withRouter)(OrderAddressComp);

export default OrderAddress;