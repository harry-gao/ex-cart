import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ProductBrief from '../ProductBrief/ProductBrief'
import styles from './ProductList.css'


const ProductList = ({ data: {loading, error, products }, cartAdded}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <div className={styles.list}>
    { products.map( p => < ProductBrief product={p} key={p.id} addedCallback={cartAdded}/> ) }
  </div>;
};

const ProductListQuery = gql`
   query ProductListQuery {
    products{
      id
      name
      images{
        thumb
      }
      masterVariant{
        id
        costPrice
      }
    }
   }
 `;

const ProductListWithData = graphql(ProductListQuery)(ProductList);


export default ProductListWithData;