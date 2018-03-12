import React, {Component} from 'react';
import { graphql, withApollo, compose } from 'react-apollo';
import { withRouter, Route } from 'react-router-dom'
import styles from './Address.css';
import {UpsertAddressMutation, AddressesQuery} from '../queries'
import classnames from 'classnames/bind'


const cx = classnames.bind(styles)


const filter = /^[0-9\- +]+$/

class Address extends Component {
  constructor(props){
    super(props)
    this.state={
      error: "",
      address: this.props.address
    }
    this.handleSave = this.handleSave.bind(this);
    this.valueChanged = this.valueChanged.bind(this)
  };

  valueChanged(key, e){
    this.setState({
      error: "",
      address:{
        ...this.state.address,
        [key]: e.target.value,
      }
    })
  }

  handleSave (itemId) {
    const valid = this.validate()
    if(!valid){
      this.setState({error: "请输入正确信息"})
    }
    else{
      this.setState({error: ""})
      const {__typename, ...addressInput} = this.state.address
      this.props.upsertAddress(addressInput)
        .then( ()=> this.props.history.goBack())
    }
  }

  validate(){
    const address = this.state.address
    return address.name != null && address.name.length > 1 &&
    address.phone != null && filter.test(address.phone) &&
    address.address_line_1 != null && address.address_line_1.length > 5
  }

  render(){
    const address = this.state.address || {}
    return(
      <div className={styles.article}>
        <div className={styles.content}>
          <div className={styles.formGroupLine}>
            <div className={styles.label}>收货人</div>
            <div className={styles.input}>
              <input type="text" placeholder="姓名" onChange={(e) => this.valueChanged('name', e)} value={address.name} />
            </div>
          </div>
          <div className={styles.formGroupLine}>
            <div className={styles.label}>联系电话</div>
            <div className={styles.input}>
              <input type="tel" placeholder="手机或固定电话" onChange={(e) => this.valueChanged('phone', e)} value=
                {address.phone}/>
            </div>
          </div>
          <div className={styles.formGroupLine}>
            <div className={styles.label}>详细地址</div>
            <div className={styles.input}>
              <input type="text" placeholder="省 市 区 街道 门牌号"  onChange={(e) => this.valueChanged('address_line_1', e)}
                value={address.address_line_1} />
            </div>
          </div>

          <div className={styles.error}>{this.state.error}</div>
        </div>
        <div className={styles.footer}>
          <div className={cx('btn', 'cancel')} onClick={() => this.props.history.goBack()}>取消</div>
          <div className={cx('btn', 'save')} onClick={this.handleSave}>保存</div>
        </div>
      </div>
    )
  }
}

const upsertAddressMutation = graphql(UpsertAddressMutation, {
  props: ({ ownProps, mutate }) => ({
    upsertAddress: (addressInput) => mutate({ variables: { addressInput } }),
  }),
  options: {
    update: (proxy, { data: { upsertAddress } }) => {
      // Read the data from our cache for this query.
      const data = proxy.readQuery({ query: AddressesQuery });
      if(data.addresses.find( a => a.id == upsertAddress.id))
        data.addresses = data.addresses.map(a => a.id == upsertAddress.id ? upsertAddress : a);
      else
        data.addresses.push(upsertAddress)

      // Write our data back to the cache.
      proxy.writeQuery({ query: AddressesQuery, data });
    },
  }
})

const AddressHOC = upsertAddressMutation(Address)

export default AddressHOC;