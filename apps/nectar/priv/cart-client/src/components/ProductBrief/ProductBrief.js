import React from 'react';
import {Link} from 'react-router-dom'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './ProductBrief.css'
import addIcon from '../../assets/icons/add.png'

const addToCart = gql`
  mutation($variantId: Int!){
    addToCart(variantId: $variantId){
      items{
        id
        name
        price
        quantity
        variantId
        image
      }
    }
  }
`;

const ProductBrief = ({product, onAdd}) => {
  return <div className={styles.product}>
    <img src={product.images[0].thumb} className={styles.image} alt=""/>
    <div className={styles.info}>
      <div className={styles.title}>
        <Link to={ '/products/' + product.id }> { product.name } </Link>
      </div>
      <div className={styles.price}> 
        ￥{product.masterVariant.costPrice}
        <img src={addIcon} className={styles.add} onClick={()=> onAdd(product.masterVariant.id)} alt="add"/>
      </div>
    </div>
     
  </div>;
};


const ProductBriefContainer = graphql(addToCart, {
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


export default ProductBriefContainer;