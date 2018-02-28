import React, {Component} from 'react';
import { graphql, withApollo, compose } from 'react-apollo';
import styles from './Cart.css';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import CartFooter from './CartFooter';
import ReactModal from 'react-modal';
import {UpdateCartMutation, CartCountQuery, SubmitOrderMutation} from '../queries'

const _ = require('lodash');

ReactModal.setAppElement('#root');

class CartWithData extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: this.props.items.map(item => {return {...item, selected: true }}),
      dirty: false,
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal (itemId) {
    this.setState({ showModal: true, itemToBeRemoved: itemId });
  }
  
  handleCloseModal (confirmDelete) {
    this.setState({ showModal: false });
    if(confirmDelete){
      let items = _.map(this.state.items, item => 
        item.id == this.state.itemToBeRemoved ? {id: item.id, quantity: 0} : {id: item.id, quantity: item.quantity}
     );
      this.props.updateLineItems(items);
    }
  }

  handleChangeChk(itemId){
    let newItems = this.state.items.map( item => {
      return item.id === itemId ?  { ...item, selected: !item.selected } : item
    })
    this.setState({items: newItems});
  }

  componentWillUnmount(){
    if(this.state.dirty)
    {
      const items = this.state.items.map( item => { return {id: item.id, quantity: item.quantity} })
      this.props.updateLineItems(items);
    }
  }

  componentWillReceiveProps({items}){
    this.setState({items});
  }

  render(){
    if(this.state.items.length <= 0)
      return <div> 购物车还没有东西哦 </div>
    
    return <div className={styles.cart}>
      <div className={styles.main}>
        { this.state.items.map( item => < CartItem item={item} key={item.variantId} quantityChanged={this.quantityChanged.bind(this)} checkChanged={this.handleChangeChk.bind(this)}/> ) }
      </div>
      <CartFooter items={this.state.items} onSubmit={this.onSubmit.bind(this)} />
      <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="移除商品"
           onRequestClose={this.handleCloseModal}
           shouldCloseOnOverlayClick={false}
        >
          <p>确定要从购物车移除该商品吗？</p>
          <button onClick={()=>this.handleCloseModal(true)}>确定</button>
          <button onClick={()=>this.handleCloseModal(false)}>取消</button>
        </ReactModal>
    </div>;
  }

  onSubmit(){
    const selectedItemIds = this.state.items.filter( item => item.selected ).map( item => item.id )
    if (selectedItemIds.length > 0){
      this.props.submitOrder(selectedItemIds);
    }
  }

  quantityChanged(itemId, newQuantity){
    if(newQuantity == 0){
      return this.handleOpenModal(itemId);
    }
    let newItems = _.map(this.state.items, item =>
      item.id == itemId ? Object.assign({}, item, {quantity: newQuantity}) : item
    );
    this.setState({items: newItems, dirty: true});
    
    this.updateCountInCache(newItems.reduce( (accu, item) => accu + item.quantity, 0));
  }

  updateCountInCache(newCount){
    //update the count in cache. ugly....
    const data = this.props.client.readQuery({ query: CartCountQuery });
    
    this.props.client.writeQuery({
      query: CartCountQuery,
      data: {
        cart: {count: newCount, __typename: "Cart"},
      },
    });
  }
}


const updateCartMutation = graphql(UpdateCartMutation, {
  props: ({ ownProps, mutate }) => ({
    updateLineItems: (lineItems) => mutate({ variables: { items: lineItems } }),
  }),
  options: {
    refetchQueries: [
      'CartCountQuery',
    ],
  },
})

const submitMutation = graphql(SubmitOrderMutation, {
  props: ({ ownProps, mutate }) => ({
    submitOrder: (itemIds) => mutate({ variables: { itemIds } }),
  }),
  options: {
    refetchQueries: [
      'CartCountQuery',
    ],
  },
})

export default compose(
  withApollo,
  updateCartMutation,
  submitMutation
)(CartWithData)
