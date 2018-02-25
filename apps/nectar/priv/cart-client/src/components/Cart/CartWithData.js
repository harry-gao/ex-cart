import React, {Component} from 'react';
import gql from 'graphql-tag';
import { graphql, withApollo, compose } from 'react-apollo';
import styles from './Cart.css';
import CartItem from './CartItem';
const _ = require('lodash');


class CartWithData extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: this.props.items,
      dirty: false
    }
  }

  componentWillUnmount(){
    if(this.state.dirty)
    {
      const items = this.state.items.map( item => { return {id: item.id, quantity: item.quantity} })
      this.props.updateLineItems(items)
    }
  }

  render(){
    return <div className={styles.cart}>
      <div className={styles.main}>
        { this.state.items.map( item => < CartItem item={item} key={item.variantId} quantityChanged={this.quantityChanged.bind(this)}/> ) }
      </div>
    </div>;
  }

  quantityChanged(itemId, newQuantity){
    let newItems = _.map(this.state.items, item =>
      item.id == itemId ? Object.assign({}, item, {quantity: newQuantity}) : item
    );
    this.setState({items: newItems, dirty: true});
    
    this.updateCountInCache(newItems.reduce( (accu, item) => accu + item.quantity, 0));
  }

  updateCountInCache(newCount){
    //update the count in cache. ugly....
    const CartCountQuery = gql`
      query CartCountQuery {
        cart{
          count
        }
      }
    `;

    const data = this.props.client.readQuery({ query: CartCountQuery });
    
    this.props.client.writeQuery({
      query: CartCountQuery,
      data: {
        cart: {count: newCount, __typename: "Cart"},
      },
    });
  }
}

const updateCart = gql`
  mutation UpdateCart($items: [LineItemInput]){
    updateCart(items: $items){
      items{
        name
        id
        image
        variantId
        quantity
        price
      }
    }
  }
`;

const mutation = graphql(updateCart, {
  props: ({ ownProps, mutate }) => ({
    updateLineItems: (lineItems) => mutate({ variables: { items: lineItems } }),
  }),
  options: {
    refetchQueries: [
      'CartCountQuery',
    ],
  },
})

export default compose(
  withApollo,
  mutation
)(CartWithData)
