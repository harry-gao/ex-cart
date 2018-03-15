import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { graphql } from 'react-apollo';
import { AddToCartMutation } from '../queries';

import styles from './ProductBrief.css'
import addIcon from '../../assets/icons/add.png'

import ReactModal from 'react-modal';
import { PacmanLoader } from 'react-spinners';

class ProductBrief extends Component{
  constructor(props){
    super(props)
    this.state = { addingToCart: false }
    
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd(){
    this.props.loadingStart()
    this.props.onAdd(this.props.product.masterVariant.id)
      .then(()=> this.props.loadingEnd())
  }

  render(){
    const {product} = this.props;
    return (
    <div className={styles.product}>
      <img src={product.images[0].thumb} className={styles.image} alt=""/>
      <div className={styles.info}>
        <div className={styles.title}>
          <Link to={ '/products/' + product.id }> { product.name } </Link>
        </div>
        <div className={styles.price}> 
          ￥{product.masterVariant.costPrice}
          <img src={addIcon} className={styles.add} onClick={this.handleAdd} alt="add"/>
        </div>
      </div>
      <div className={styles.loader}>
        <div>
        <PacmanLoader
          color={'#36d7b7'} 
          loading={this.state.addingToCart} 
        />
        </div>
      </div>
    </div>
    )
  }
}


const ProductBriefHOC = graphql(AddToCartMutation, {
  props: ({ ownProps, mutate }) => ({
    onAdd: (variantId) => mutate({ variables: { variantId } }),
    ...ownProps
  }),
  options: {
    refetchQueries: [
      'CartCountQuery',
    ],
  },
})(ProductBrief);


export default ProductBriefHOC;