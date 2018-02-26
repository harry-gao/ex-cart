import React from 'react';

import { graphql } from 'react-apollo';
import ProductBriefContainer from '../ProductBrief/ProductBrief'
import styles from './ProductList.css'
import {ProductListQuery} from '../queries'

const ProductList = ({ data: {loading, error, products }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <div className={styles.list}>
    { products.map( p => <ProductBriefContainer product={p} key={p.id}/> ) }
  </div>;
};

const ProductListWithData = graphql(ProductListQuery)(ProductList);


export default ProductListWithData;