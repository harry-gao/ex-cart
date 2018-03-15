import React from 'react';
import { Link } from 'react-router-dom'
import styles from './Me.css'
import classnames from 'classnames/bind'
import nextIcon from '../../assets/icons/next.svg'
import { Switch, Route } from 'react-router-dom'

import OrderList from '../Order/OrderList'


const cx = classnames.bind(styles)

const MeContent = ({history}) => {
  return (
    <div className={styles.me}>
      <div className={styles.group}>
        <div className={cx('item', 'bb')} onClick={()=> history.push("/me/orders/list/created")}>
          <div className={styles.title}> 未完成订单 </div>
          <div className={styles.next}><img src={nextIcon} className={styles.icon} alt="next"/> </div>
        </div>
        <div className={cx('item', 'bb')} onClick={()=> history.push("/me/orders/list/confirmed")}>
          <div className={styles.title}> 待付款订单 </div>
          <div className={styles.next}><img src={nextIcon} className={styles.icon} alt="next"/> </div>
        </div>
        <div className={cx('item', 'bb')}onClick={()=> history.push("/me/orders/list/paid")}>
          <div className={styles.title}> 待发货订单 </div>
          <div className={styles.next}><img src={nextIcon} className={styles.icon} alt="next"/> </div>
        </div>
        <div className={cx('item')} onClick={()=> history.push("/me/orders/list/delivered")}>
          <div className={styles.title}> 已发货订单 </div>
          <div className={styles.next}><img src={nextIcon} className={styles.icon} alt="next"/> </div>
        </div>
      </div>
      <div className={styles.group}>
        <div className={styles.item} onClick={()=> history.push("/me/addresses")}>
          <div className={styles.title}> 地址管理 </div>
          <div className={styles.next}><img src={nextIcon} className={styles.icon} alt="next"/> </div>
        </div>
      </div>
    </div>
  )
}

const AddressList = ({match}) => {
  return (
    <div> addresses </div>
  )
}

const Me =  ({match, history }) => (
  <div className={styles.me}>
  <Switch>
      <Route
        path={`${match.url}/orders/list/:state`}
        component={OrderList}
      />
      <Route
        path={`${match.url}/addresses`}
        component={AddressList}
      />
      <Route component={MeContent} />
    </Switch>
  </div>
)



export default Me;