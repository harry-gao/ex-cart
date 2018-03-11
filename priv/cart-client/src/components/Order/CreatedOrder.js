import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router'
import classnames from 'classnames/bind'
import styles from './Order.css'
import {OrderQuery} from '../queries'
import OrderItem from './OrderItem'
import {Link} from 'react-router-dom'

import editIcon from '../../assets/icons/edit.svg'

const cx = classnames.bind(styles)


const CreatedOrder = ({ order, history }) => {
  const orderItems = order.items.map( item => 
    <OrderItem item={item} key={item.id}/>
  )

  let addressNode
  const address = order.address
  if(address === null)
    addressNode = <div className={cx('groupContent', 'actionable')} onClick={()=>{history.push(`/order/${order.id}/address`)}}>请指定 > </div>
  else
    addressNode = (<div className={styles.orderAddress}>          
      <div className={styles.addressDetail}>
        <div> {address.name}  <span className={styles.phone}> {address.phone} </span> </div>
        <div className={styles.addressLine}>地址: {address.address_line_1} </div>
      </div>
      <div className={styles.editBtn}>
        <Link to={`/order/${order.id}/address`}> <img src={editIcon} className={styles.icon} alt="edit"/> </Link>
      </div> 
    </div>)

  return(
    <div>
      <article className="mw6-ns br3 ba b--black-10">
        <h1 className={styles.groupTitle}>订单详情</h1>
        <div className="bt b--black-10">
          {orderItems}
        </div>
        <div className="b--dashed bb mt2 b--dark-blue"/>
        <div className={styles.orderGroup}>
          <h1 className={styles.groupTitle}>配送方式</h1>
          <div className={styles.groupContent}>免运费</div>
        </div>
        <div className={styles.orderGroup}>
          <h1 className={styles.groupTitle}>送货地址</h1>
          {addressNode}
        </div>
        <div className={styles.orderGroup}>
          <h1 className={styles.groupTitle}>留言</h1>
        </div>
        <div className={styles.orderGroup}>
          <h1 className={styles.groupTitle}>合计</h1>
        </div>
      </article>

    </div>
  )
};


export default CreatedOrder;