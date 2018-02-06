import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const ProductsList = ({ data: {loading, error, products }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <ul>
    { products.map( p => <li key={p.id}>{p.name}</li> ) }
  </ul>;
};

const productsListQuery = gql`
   query ProductsListQuery {
    products{
      id
      name
      images{
        url
      }
    }
   }
 `;

const ProductsListWithData = graphql(productsListQuery)(ProductsList);


export default ProductsListWithData;