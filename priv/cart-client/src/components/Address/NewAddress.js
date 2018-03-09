import React, {Component} from 'react';
import { graphql, withApollo, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom'
import styles from './Address.css';
import {CreateAddressMutation,} from '../queries'
import classnames from 'classnames/bind'


const cx = classnames.bind(styles)


const filter = /^[0-9\- +]+$/

class NewAddress extends Component {
  constructor(props){
    super(props)
    this.handleSave = this.handleSave.bind(this);
    this.state={
      error: ""
    }

    this.valueChanged = this.valueChanged.bind(this)
  };

  valueChanged(){
    this.setState({
      name: this.name.value,
      address_line_1: this.address_line_1.value,
      phone: this.phone.value,
      error: ""
    })
  }
    

  handleSave (itemId) {
    const valid = this.validate()
    if(!valid){
      this.setState({error: "请输入正确信息"})
    }
    else{
      this.setState({error: ""})
      this.props.createAddress(this.name.value, this.phone.value, this.address_line_1.value)
    }
  }

  validate(){
   return this.name != null && this.name.value.length > 2 &&
    this.phone != null && filter.test(this.phone.value) &&
    this.address_line_1 != null && this.address_line_1.value.length > 5
  }

  render(){
    return(
      <div className={styles.article}>
        <div className={styles.content}>
          <div className={styles.formGroupLine}>
            <div className={styles.label}>收货人</div>
            <div className={styles.input}>
              <input type="text" placeholder="姓名" ref={(input)=> this.name=input} onBlur={this.valueChanged}/>
            </div>
          </div>
          <div className={styles.formGroupLine}>
            <div className={styles.label}>联系电话</div>
            <div className={styles.input}>
              <input type="tel" placeholder="手机或固定电话"  ref={(input)=> this.phone=input}  onBlur={this.valueChanged}/>
            </div>
          </div>
          <div className={styles.formGroupLine}>
            <div className={styles.label}>详细地址</div>
            <div className={styles.input}>
              <input type="tel" placeholder="省 市 区 街道 门牌号"  ref={(input)=> this.address_line_1=input}  onBlur={this.valueChanged}/>
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


const createAddressMutation = graphql(CreateAddressMutation, {
  props: ({ ownProps, mutate }) => ({
    createAddress: (name, phone, address_line_1) => mutate({ variables: { address_line_1, name, phone } }),
  }),
  options: {
    refetchQueries: [
      'AddressesQuery',
    ],
  },
})

export default compose(
  withApollo,
  createAddressMutation,
  withRouter
)(NewAddress)
